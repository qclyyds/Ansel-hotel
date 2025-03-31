-- 创建系统配置表
CREATE TABLE IF NOT EXISTS system_config (
    config_key VARCHAR(50) PRIMARY KEY COMMENT '配置键',
    config_value TEXT COMMENT '配置值',
    description VARCHAR(255) COMMENT '描述',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统配置表';

-- 创建轮播图表
CREATE TABLE IF NOT EXISTS banners (
    banner_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '轮播图ID',
    image_url VARCHAR(255) NOT NULL COMMENT '图片URL',
    title VARCHAR(100) COMMENT '标题',
    subtitle VARCHAR(100) COMMENT '副标题',
    link_type VARCHAR(20) DEFAULT 'page' COMMENT '链接类型：page, url',
    link_url VARCHAR(255) COMMENT '链接地址',
    sort_order INT NOT NULL DEFAULT 0 COMMENT '排序顺序',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0禁用，1启用',
    INDEX idx_sort_order (sort_order),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='轮播图表';

-- 创建聊天记录表
CREATE TABLE IF NOT EXISTS chat_records (
    chat_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '聊天记录ID',
    user_id VARCHAR(32) NOT NULL COMMENT '用户ID',
    message_id VARCHAR(32) NOT NULL COMMENT '消息ID',
    content TEXT NOT NULL COMMENT '消息内容',
    type VARCHAR(20) NOT NULL DEFAULT 'text' COMMENT '消息类型：text, image',
    direction TINYINT NOT NULL COMMENT '方向：0用户发送，1系统回复',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    INDEX idx_user_id (user_id),
    INDEX idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='聊天记录表'; 