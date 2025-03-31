-- 创建房型表
CREATE TABLE IF NOT EXISTS room_types (
    type_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '房型ID',
    name VARCHAR(100) NOT NULL COMMENT '房型名称',
    description TEXT COMMENT '房型描述',
    thumbnail VARCHAR(255) COMMENT '缩略图URL',
    size VARCHAR(50) COMMENT '房间大小',
    bed_type VARCHAR(100) COMMENT '床型',
    view VARCHAR(100) COMMENT '景观类型',
    max_guests INT NOT NULL DEFAULT 2 COMMENT '最大入住人数',
    price DECIMAL(10,2) NOT NULL COMMENT '标准价格',
    original_price DECIMAL(10,2) COMMENT '原价',
    discount DECIMAL(3,2) COMMENT '折扣',
    tag VARCHAR(50) COMMENT '标签',
    rating DECIMAL(2,1) COMMENT '评分',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0下架，1上架',
    INDEX idx_price (price),
    INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='房型表';

-- 创建房型图片表
CREATE TABLE IF NOT EXISTS room_type_images (
    image_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '图片ID',
    type_id INT NOT NULL COMMENT '房型ID',
    image_url VARCHAR(255) NOT NULL COMMENT '图片URL',
    sort_order INT NOT NULL DEFAULT 0 COMMENT '排序顺序',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (type_id) REFERENCES room_types(type_id) ON DELETE CASCADE,
    INDEX idx_type_id (type_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='房型图片表';

-- 创建房间表
CREATE TABLE IF NOT EXISTS rooms (
    room_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '房间ID',
    room_number VARCHAR(20) NOT NULL UNIQUE COMMENT '房间号',
    type_id INT NOT NULL COMMENT '房型ID',
    floor VARCHAR(10) COMMENT '楼层',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：1可预订，2已满房，3维护中，4不可用',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (type_id) REFERENCES room_types(type_id),
    INDEX idx_type_id (type_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='房间表';

-- 创建房型设施表
CREATE TABLE IF NOT EXISTS room_amenities (
    amenity_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '设施ID',
    name VARCHAR(50) NOT NULL COMMENT '设施名称',
    icon VARCHAR(50) COMMENT '图标',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：0禁用，1启用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='房型设施表';

-- 创建房型设施关联表
CREATE TABLE IF NOT EXISTS room_type_amenities (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
    type_id INT NOT NULL COMMENT '房型ID',
    amenity_id INT NOT NULL COMMENT '设施ID',
    FOREIGN KEY (type_id) REFERENCES room_types(type_id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES room_amenities(amenity_id) ON DELETE CASCADE,
    UNIQUE KEY unique_type_amenity (type_id, amenity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='房型设施关联表'; 