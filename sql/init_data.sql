-- 初始化会员等级数据
INSERT INTO member_levels (level_id, level_name, points_required, discount, description) VALUES
(1, '普通会员', 0, 1.00, '注册即可成为普通会员，享受基础服务'),
(2, '银卡会员', 5000, 0.95, '银卡会员享受95折优惠以及更多服务'),
(3, '金卡会员', 10000, 0.90, '金卡会员享受9折优惠以及专属服务'),
(4, '钻石会员', 20000, 0.85, '钻石会员享受85折优惠以及贵宾服务'),
(5, '黑卡会员', 50000, 0.80, '黑卡会员享受8折优惠以及专属管家服务');

-- 初始化会员特权数据
INSERT INTO member_privileges (level_id, name, icon, description, status) VALUES
(3, '免费早餐', 'coffee-o', '享受双人免费早餐', 1),
(3, '优先升级', 'upgrade', '有空房时享受免费升级', 1),
(3, 'VIP通道', 'vip-o', '专属VIP通道快速办理入住', 1),
(3, '延迟退房', 'clock-o', '可免费延迟至14:00退房', 1),
(4, '免费早餐', 'coffee-o', '享受双人免费早餐', 1),
(4, '优先升级', 'upgrade', '有空房时享受免费升级', 1),
(4, 'VIP通道', 'vip-o', '专属VIP通道快速办理入住', 1),
(4, '延迟退房', 'clock-o', '可免费延迟至16:00退房', 1),
(4, '欢迎礼品', 'gift-o', '入住时享受欢迎礼品', 1),
(4, '机场接送', 'car-o', '免费享受一次机场接送', 1),
(5, '免费早餐', 'coffee-o', '享受四人免费早餐', 1),
(5, '优先升级', 'upgrade', '有空房时享受免费套房升级', 1),
(5, 'VIP通道', 'vip-o', '专属VIP通道快速办理入住', 1),
(5, '延迟退房', 'clock-o', '可免费延迟至18:00退房', 1),
(5, '欢迎礼品', 'gift-o', '入住时享受豪华欢迎礼品', 1),
(5, '机场接送', 'car-o', '每次入住享受免费机场接送', 1),
(5, '专属管家', 'manager-o', '24小时专属管家服务', 1),
(5, '免费SPA', 'hot-o', '每次入住享受一次免费SPA', 1);

-- 初始化酒店服务数据
INSERT INTO hotel_services (name, icon, description, price_range, available) VALUES
('24小时客房服务', 'service-o', '提供全天候客房服务，满足您的各种需求', NULL, 1),
('SPA服务', 'hot-o', '专业的SPA服务，让您放松身心', '¥380起', 1),
('商务中心', 'office-o', '提供打印、传真、会议室预订等商务服务', '¥200起/小时', 1),
('健身中心', 'fitness-o', '配备先进的健身设备，让您保持健康的生活方式', '免费', 1),
('游泳池', 'swimming-o', '室内恒温泳池，全年开放', '免费', 1),
('洗衣服务', 'laundry-o', '专业的洗衣服务，当天送还', '按件计费', 1),
('机场接送', 'car-o', '豪华轿车接送服务，提前预约', '¥300起/次', 1),
('儿童乐园', 'child-o', '为孩子们提供安全、有趣的游乐空间', '免费', 1);

-- 初始化系统配置数据
INSERT INTO system_config (config_key, config_value, description) VALUES
('APP_NAME', 'ANSEL安泽酒店', '应用名称'),
('APP_VERSION', '1.0.0', '应用版本'),
('CONTACT_PHONE', '400-888-9999', '联系电话'),
('SERVICE_TIME', '8:00-22:00', '客服时间'),
('HOTEL_ADDRESS', '上海市浦东新区陆家嘴环路1288号', '酒店地址'),
('CHECK_IN_TIME', '14:00', '入住时间'),
('CHECK_OUT_TIME', '12:00', '退房时间'),
('MAINTENANCE_MODE', '0', '维护模式：0关闭，1开启');

-- 初始化房型设施数据
INSERT INTO room_amenities (name, icon, status) VALUES
('空调', 'air-o', 1),
('WiFi', 'wifi-o', 1),
('电视', 'tv-o', 1),
('电热水壶', 'kettle-o', 1),
('迷你吧', 'bar-o', 1),
('保险箱', 'safe-o', 1),
('浴缸', 'bath-o', 1),
('淋浴', 'shower-o', 1),
('吹风机', 'dryer-o', 1),
('书桌', 'desk-o', 1),
('熨斗', 'iron-o', 1),
('浴袍', 'bathrobe-o', 1);

-- 初始化示例房型数据
INSERT INTO room_types (type_id, name, description, thumbnail, size, bed_type, view, max_guests, price, original_price, discount, tag, rating) VALUES
(1, '豪华客房', '舒适宽敞的豪华客房，配备现代化设施，为您提供愉悦的住宿体验。', '/images/rooms/deluxe.jpg', '45平方米', '1张特大床或2张单人床', '城市景观', 2, 1280.00, 1580.00, 0.80, '热门', 4.8),
(2, '行政客房', '位于高层的行政客房，提供额外的空间和隐私，可使用行政酒廊。', '/images/rooms/executive.jpg', '55平方米', '1张特大床', '花园景观', 2, 1680.00, 1980.00, 0.85, '推荐', 4.9),
(3, '豪华套房', '独立的起居室和卧室，为商务和休闲旅客提供更多空间和舒适度。', '/images/rooms/suite.jpg', '80平方米', '1张特大床', '河景', 2, 2280.00, 2680.00, 0.85, '奢华', 4.9),
(4, '家庭套房', '专为家庭设计的宽敞套房，配备额外床位和儿童友好设施。', '/images/rooms/family.jpg', '90平方米', '1张特大床和2张单人床', '城市景观', 4, 2480.00, 2880.00, 0.86, '家庭', 4.7),
(5, '总统套房', '顶级奢华的套房，提供宽敞的生活空间、专属管家服务和顶级设施。', '/images/rooms/presidential.jpg', '150平方米', '1张特大床', '全景', 2, 5880.00, 6880.00, 0.85, '尊享', 5.0);

-- 初始化房型图片数据
INSERT INTO room_type_images (type_id, image_url, sort_order) VALUES
(1, '/images/rooms/deluxe-1.jpg', 1),
(1, '/images/rooms/deluxe-2.jpg', 2),
(1, '/images/rooms/deluxe-3.jpg', 3),
(2, '/images/rooms/executive-1.jpg', 1),
(2, '/images/rooms/executive-2.jpg', 2),
(2, '/images/rooms/executive-3.jpg', 3),
(3, '/images/rooms/suite-1.jpg', 1),
(3, '/images/rooms/suite-2.jpg', 2),
(3, '/images/rooms/suite-3.jpg', 3),
(4, '/images/rooms/family-1.jpg', 1),
(4, '/images/rooms/family-2.jpg', 2),
(4, '/images/rooms/family-3.jpg', 3),
(5, '/images/rooms/presidential-1.jpg', 1),
(5, '/images/rooms/presidential-2.jpg', 2),
(5, '/images/rooms/presidential-3.jpg', 3);

-- 初始化房型设施关联数据
INSERT INTO room_type_amenities (type_id, amenity_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 8), (1, 9), (1, 10),
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12),
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10), (3, 11), (3, 12),
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10), (4, 11),
(5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6), (5, 7), (5, 8), (5, 9), (5, 10), (5, 11), (5, 12);

-- 初始化示例房间数据
INSERT INTO rooms (room_number, type_id, floor, status) VALUES
('1001', 1, '10', 1),
('1002', 1, '10', 1),
('1003', 1, '10', 1),
('1004', 1, '10', 1),
('1005', 1, '10', 1),
('1101', 2, '11', 1),
('1102', 2, '11', 1),
('1103', 2, '11', 1),
('1201', 3, '12', 1),
('1202', 3, '12', 1),
('1301', 4, '13', 1),
('1302', 4, '13', 1),
('1401', 5, '14', 1);

-- 初始化示例轮播图数据
INSERT INTO banners (image_url, title, subtitle, link_type, link_url, sort_order, status) VALUES
('/images/banners/banner1.jpg', '奢享至臻体验', '尽在城市中的隐逸奢所', 'page', '/pages/about/about', 1, 1),
('/images/banners/banner2.jpg', '限时优惠', '豪华客房8折起', 'page', '/pages/rooms/rooms', 2, 1),
('/images/banners/banner3.jpg', '会员专享', '入住即可积分', 'page', '/pages/member/member', 3, 1); 