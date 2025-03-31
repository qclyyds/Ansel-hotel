# ANSEL安泽酒店小程序数据库安装说明

## 概述

本文档提供了ANSEL安泽酒店小程序数据库的安装指南，包括如何创建数据库、表结构以及初始化数据。数据库采用MySQL 5.7设计，能够满足酒店小程序的各项功能需求。

## 系统要求

- MySQL 5.7或更高版本
- MySQL客户端（如MySQL Workbench、HeidiSQL或命令行工具）
- 至少100MB的可用磁盘空间

## 安装步骤

### 方法一：使用自动安装脚本

1. 确保MySQL服务已启动，并且具有创建数据库的权限
2. 打开MySQL命令行或其他MySQL客户端工具
3. 将当前目录切换到SQL脚本所在的目录
4. 执行以下命令运行安装脚本：

```bash
mysql -u username -p < sql/install.sql
```

替换`username`为你的MySQL用户名

### 方法二：手动执行SQL脚本

如果自动安装脚本不起作用，您可以按照以下步骤手动执行SQL脚本：

1. 创建数据库和设置字符集：

```bash
mysql -u username -p < sql/create_database.sql
```

2. 依次执行以下脚本创建表结构：

```bash
mysql -u username -p ansel_hotel < sql/user_tables.sql
mysql -u username -p ansel_hotel < sql/room_tables.sql
mysql -u username -p ansel_hotel < sql/order_payment_tables.sql
mysql -u username -p ansel_hotel < sql/coupon_point_tables.sql
mysql -u username -p ansel_hotel < sql/hotel_service_tables.sql
mysql -u username -p ansel_hotel < sql/system_tables.sql
```

3. 导入初始化数据：

```bash
mysql -u username -p ansel_hotel < sql/init_data.sql
```

## 数据库结构

安装完成后，数据库中将创建以下主要表：

- 用户相关：`users`, `members`, `member_levels`, `member_privileges`
- 房间相关：`room_types`, `rooms`, `room_type_images`, `room_amenities`, `room_type_amenities`
- 订单相关：`orders`, `payments`
- 优惠券和积分：`coupons`, `user_coupons`, `point_history`
- 酒店服务：`hotel_services`, `dining`, `dining_images`, `feedback`
- 系统相关：`system_config`, `banners`, `chat_records`

## 初始化数据

安装过程中会自动初始化以下数据：

- 会员等级（5个级别）
- 会员特权（18项特权）
- 酒店服务（8种服务）
- 系统配置（8项配置）
- 房型设施（12种设施）
- 示例房型（5种房型）
- 示例房间（13间房间）
- 示例轮播图（3张轮播图）

## 故障排除

如果安装过程中遇到问题，请检查：

1. MySQL版本是否为5.7或更高版本
2. 用户是否具有创建数据库和表的权限
3. SQL脚本中的语法是否与您的MySQL版本兼容
4. 字符集设置是否正确

如需技术支持，请联系开发团队。

## 数据库维护

安装后，建议定期对数据库进行备份：

```bash
mysqldump -u username -p ansel_hotel > ansel_hotel_backup_$(date +%Y%m%d).sql
```

## 安全注意事项

- 更改默认的MySQL密码
- 限制数据库远程访问
- 为应用程序创建具有最小权限的专用数据库用户
- 定期备份数据库
- 定期更新MySQL到最新的安全版本 