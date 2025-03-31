-- ANSEL安泽酒店小程序数据库 - 安装脚本
-- MySQL 5.7

-- 创建数据库并设置字符集
SOURCE sql/create_database.sql;

-- 创建用户和会员相关表
SOURCE sql/user_tables.sql;

-- 创建房间相关表
SOURCE sql/room_tables.sql;

-- 创建订单和支付相关表
SOURCE sql/order_payment_tables.sql;

-- 创建优惠券和积分相关表
SOURCE sql/coupon_point_tables.sql;

-- 创建酒店服务相关表
SOURCE sql/hotel_service_tables.sql;

-- 创建系统表
SOURCE sql/system_tables.sql;

-- 导入初始化数据
SOURCE sql/init_data.sql;

-- 数据库安装完成
SELECT 'ANSEL安泽酒店数据库安装完成' as '安装状态'; 