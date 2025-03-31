-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(32) PRIMARY KEY COMMENT '用户ID',
    open_id VARCHAR(64) NOT NULL UNIQUE COMMENT '微信OpenID',
    nick_name VARCHAR(50) COMMENT '用户昵称',
    avatar_url VARCHAR(255) COMMENT '头像URL',
    gender TINYINT COMMENT '性别：0未知，1男，2女',
    phone VARCHAR(20) COMMENT '手机号码',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    last_login_time DATETIME COMMENT '最后登录时间',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0禁用，1启用',
    INDEX idx_open_id (open_id),
    INDEX idx_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 创建会员表
CREATE TABLE IF NOT EXISTS members (
    member_id VARCHAR(32) PRIMARY KEY COMMENT '会员ID',
    user_id VARCHAR(32) NOT NULL COMMENT '用户ID',
    level_id INT NOT NULL DEFAULT 1 COMMENT '会员等级ID',
    points INT NOT NULL DEFAULT 0 COMMENT '当前积分',
    total_points INT NOT NULL DEFAULT 0 COMMENT '累计积分',
    join_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '加入时间',
    expire_date DATETIME COMMENT '会员过期时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0禁用，1启用',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_level_id (level_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='会员表';

-- 创建会员等级表
CREATE TABLE IF NOT EXISTS member_levels (
    level_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '等级ID',
    level_name VARCHAR(50) NOT NULL COMMENT '等级名称',
    points_required INT NOT NULL COMMENT '所需积分',
    discount DECIMAL(3,2) NOT NULL DEFAULT 1.00 COMMENT '折扣率',
    description TEXT COMMENT '等级描述',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0禁用，1启用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='会员等级表';

-- 创建会员特权表
CREATE TABLE IF NOT EXISTS member_privileges (
    privilege_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '特权ID',
    level_id INT NOT NULL COMMENT '会员等级ID',
    name VARCHAR(50) NOT NULL COMMENT '特权名称',
    icon VARCHAR(50) COMMENT '图标',
    description TEXT COMMENT '特权描述',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0禁用，1启用',
    FOREIGN KEY (level_id) REFERENCES member_levels(level_id),
    INDEX idx_level_id (level_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='会员特权表'; 