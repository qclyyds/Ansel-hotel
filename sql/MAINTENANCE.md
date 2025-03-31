# ANSEL安泽酒店小程序数据库维护指南

## 日常备份策略

### 自动备份

推荐设置每日自动备份，可以通过以下方式实现：

#### Windows环境 (使用计划任务)

1. 创建备份脚本 `backup.bat`：

```batch
@echo off
set BACKUP_DIR=D:\backups\ansel_hotel
set MYSQL_USER=your_username
set MYSQL_PASSWORD=your_password
set DATE_FORMAT=%date:~0,4%%date:~5,2%%date:~8,2%

if not exist %BACKUP_DIR% mkdir %BACKUP_DIR%

mysqldump -u%MYSQL_USER% -p%MYSQL_PASSWORD% --single-transaction --routines --triggers --events ansel_hotel > %BACKUP_DIR%\ansel_hotel_%DATE_FORMAT%.sql

echo 备份完成: %BACKUP_DIR%\ansel_hotel_%DATE_FORMAT%.sql
```

2. 在Windows计划任务中设置定时执行该脚本

#### Linux环境 (使用crontab)

1. 创建备份脚本 `backup.sh`：

```bash
#!/bin/bash
BACKUP_DIR=/var/backups/ansel_hotel
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
DATE_FORMAT=$(date +%Y%m%d)

mkdir -p $BACKUP_DIR

mysqldump -u$MYSQL_USER -p$MYSQL_PASSWORD --single-transaction --routines --triggers --events ansel_hotel > $BACKUP_DIR/ansel_hotel_$DATE_FORMAT.sql

# 保留最近30天的备份
find $BACKUP_DIR -name "ansel_hotel_*.sql" -type f -mtime +30 -delete

echo "备份完成: $BACKUP_DIR/ansel_hotel_$DATE_FORMAT.sql"
```

2. 添加执行权限：`chmod +x backup.sh`

3. 添加到crontab：
```
0 2 * * * /path/to/backup.sh
```

### 手动备份

在进行重要更新前，建议进行手动备份：

```bash
mysqldump -u username -p --single-transaction --routines --triggers --events ansel_hotel > ansel_hotel_manual_backup.sql
```

## 数据库优化

定期执行以下优化维护工作：

### 表优化

```sql
OPTIMIZE TABLE users, members, orders, payments, rooms;
```

### 索引分析与优化

```sql
-- 查看索引使用情况
SHOW INDEX FROM orders;
SHOW INDEX FROM users;

-- 分析表结构
ANALYZE TABLE orders, users, members, room_types;
```

### 查询优化建议

1. 对于订单查询，使用合适的索引过滤：
```sql
-- 推荐方式
SELECT * FROM orders WHERE status = 2 AND create_time > '2023-01-01' ORDER BY create_time DESC LIMIT 20;
```

2. 对于用户查询，尽量使用索引列：
```sql
-- 推荐方式
SELECT * FROM users WHERE phone = '13800138000';
```

3. 对于跨表查询，使用合适的JOIN方式：
```sql
-- 推荐方式
SELECT o.*, r.name AS room_name 
FROM orders o 
INNER JOIN room_types r ON o.room_type_id = r.type_id 
WHERE o.user_id = 'USER123' 
ORDER BY o.create_time DESC;
```

## 数据维护操作

### 清理过期数据

定期清理过期数据可以提高数据库性能：

```sql
-- 清理过期优惠券(过期超过1年)
UPDATE user_coupons SET status = 3 
WHERE status = 1 AND coupon_id IN (
    SELECT coupon_id FROM coupons WHERE expire_date < DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
);

-- 清理过期聊天记录(超过6个月)
DELETE FROM chat_records 
WHERE create_time < DATE_SUB(CURDATE(), INTERVAL 6 MONTH);
```

### 数据修复

针对可能出现的数据不一致问题，提供修复脚本：

```sql
-- 检查并修复会员等级
UPDATE members m 
SET level_id = (
    SELECT MAX(level_id) FROM member_levels 
    WHERE points_required <= m.total_points
);

-- 检查并修复订单金额
UPDATE orders o 
SET total_amount = nights * room_price
WHERE total_amount != nights * room_price;
```

## 性能监控

### 监控慢查询

1. 确保MySQL开启了慢查询日志：

```sql
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;  -- 设置为超过1秒的查询
SET GLOBAL slow_query_log_file = '/var/log/mysql/mysql-slow.log';
```

2. 定期分析慢查询日志：

```bash
mysqldumpslow -s t -t 10 /var/log/mysql/mysql-slow.log
```

### 监控连接数

```sql
SHOW STATUS LIKE 'Threads_connected';
```

### 监控表大小

```sql
SELECT 
    table_name AS '表名', 
    table_rows AS '行数', 
    data_length + index_length AS '占用空间(字节)',
    ROUND((data_length + index_length) / 1024 / 1024, 2) AS '占用空间(MB)'
FROM 
    information_schema.tables 
WHERE 
    table_schema = 'ansel_hotel' 
ORDER BY 
    (data_length + index_length) DESC;
```

## 故障恢复

### 从备份恢复

```bash
mysql -u username -p ansel_hotel < backup_file.sql
```

### 恢复特定表

```bash
# 从备份中提取特定表
sed -n -e '/DROP TABLE.*`orders`/,/UNLOCK TABLES/p' backup_file.sql > orders_table.sql

# 恢复特定表
mysql -u username -p ansel_hotel < orders_table.sql
```

## MySQL 5.7 升级建议

未来可能需要升级到更高版本的MySQL，建议遵循以下步骤：

1. 全量备份现有数据库
2. 测试环境验证升级过程
3. 检查SQL兼容性并修复不兼容的查询
4. 规划升级时间窗口(低峰期)
5. 执行升级并验证系统功能

## 安全建议

1. 定期更改数据库密码
2. 限制数据库服务器的网络访问
3. 为应用程序创建权限受限的专用账户
4. 启用MySQL审计日志
5. 定期安装MySQL安全更新 