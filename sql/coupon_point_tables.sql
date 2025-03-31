-- 创建优惠券表
CREATE TABLE IF NOT EXISTS coupons (
    coupon_id VARCHAR(32) PRIMARY KEY COMMENT '优惠券ID',
    name VARCHAR(100) NOT NULL COMMENT '优惠券名称',
    type VARCHAR(20) NOT NULL COMMENT '类型：discount(折扣), reduction(满减)',
    value DECIMAL(10,2) NOT NULL COMMENT '优惠券面值',
    min_consumption DECIMAL(10,2) NOT NULL DEFAULT 0 COMMENT '最低消费',
    start_date DATE NOT NULL COMMENT '生效日期',
    expire_date DATE NOT NULL COMMENT '过期日期',
    description TEXT COMMENT '描述',
    usage_scope VARCHAR(50) DEFAULT '所有房型' COMMENT '使用范围',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0禁用，1启用',
    INDEX idx_type (type),
    INDEX idx_expire_date (expire_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='优惠券表';

-- 创建用户优惠券表
CREATE TABLE IF NOT EXISTS user_coupons (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
    user_id VARCHAR(32) NOT NULL COMMENT '用户ID',
    coupon_id VARCHAR(32) NOT NULL COMMENT '优惠券ID',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：1未使用，2已使用，3已过期',
    order_id VARCHAR(32) COMMENT '使用的订单ID',
    used_time DATETIME COMMENT '使用时间',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '获取时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (coupon_id) REFERENCES coupons(coupon_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    INDEX idx_user_id (user_id),
    INDEX idx_coupon_id (coupon_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户优惠券表';

-- 创建积分历史表
CREATE TABLE IF NOT EXISTS point_history (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
    point_id VARCHAR(32) NOT NULL UNIQUE COMMENT '积分记录ID',
    user_id VARCHAR(32) NOT NULL COMMENT '用户ID',
    type VARCHAR(20) NOT NULL COMMENT '类型：earned(获得), used(使用)',
    amount INT NOT NULL COMMENT '积分数量',
    description VARCHAR(255) COMMENT '描述',
    order_id VARCHAR(32) COMMENT '关联订单ID',
    expire_date DATE COMMENT '过期日期',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='积分历史表'; 