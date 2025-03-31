-- 创建酒店服务表
CREATE TABLE IF NOT EXISTS hotel_services (
    service_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '服务ID',
    name VARCHAR(100) NOT NULL COMMENT '服务名称',
    icon VARCHAR(50) COMMENT '图标',
    description TEXT COMMENT '服务描述',
    price_range VARCHAR(50) COMMENT '价格范围',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    available TINYINT NOT NULL DEFAULT 1 COMMENT '是否可用：0不可用，1可用',
    INDEX idx_available (available)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='酒店服务表';

-- 创建餐厅表
CREATE TABLE IF NOT EXISTS dining (
    dining_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '餐厅ID',
    name VARCHAR(100) NOT NULL COMMENT '餐厅名称',
    type VARCHAR(20) NOT NULL COMMENT '类型：restaurant, bar, cafe',
    location VARCHAR(50) COMMENT '位置',
    open_time VARCHAR(50) COMMENT '营业时间',
    cuisine VARCHAR(50) COMMENT '菜系',
    description TEXT COMMENT '描述',
    recommend TINYINT NOT NULL DEFAULT 0 COMMENT '是否推荐：0否，1是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0关闭，1营业',
    INDEX idx_type (type),
    INDEX idx_recommend (recommend),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='餐厅表';

-- 创建餐厅图片表
CREATE TABLE IF NOT EXISTS dining_images (
    image_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '图片ID',
    dining_id INT NOT NULL COMMENT '餐厅ID',
    image_url VARCHAR(255) NOT NULL COMMENT '图片URL',
    sort_order INT NOT NULL DEFAULT 0 COMMENT '排序顺序',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (dining_id) REFERENCES dining(dining_id) ON DELETE CASCADE,
    INDEX idx_dining_id (dining_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='餐厅图片表';

-- 创建反馈表
CREATE TABLE IF NOT EXISTS feedback (
    feedback_id VARCHAR(32) PRIMARY KEY COMMENT '反馈ID',
    user_id VARCHAR(32) COMMENT '用户ID',
    type VARCHAR(20) NOT NULL COMMENT '类型：suggestion, complaint, praise',
    content TEXT NOT NULL COMMENT '内容',
    contact_name VARCHAR(50) COMMENT '联系人姓名',
    contact_phone VARCHAR(20) COMMENT '联系人电话',
    room_number VARCHAR(20) COMMENT '房间号',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：1未处理，2处理中，3已处理',
    reply TEXT COMMENT '回复内容',
    reply_time DATETIME COMMENT '回复时间',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='反馈表'; 