Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'intro', // intro, facilities, location
    hotelInfo: {
      name: 'ANSEL 安泽酒店',
      address: '上海市浦东新区陆家嘴环路1288号',
      phone: '021-88889999',
      description: 'ANSEL 安泽酒店位于上海市中心陆家嘴金融区，毗邻东方明珠电视塔和上海环球金融中心。酒店设计融合现代奢华与东方韵味，提供各类豪华客房和套房，配备高端餐厅、健身中心、水疗中心和会议设施，为商务和休闲旅客提供尊贵舒适的住宿体验。',
      images: [
        '/images/hotel-exterior.jpg',
        '/images/hotel-lobby.jpg',
        '/images/hotel-restaurant.jpg',
        '/images/hotel-spa.jpg'
      ]
    },
    facilities: [
      { name: '24小时前台', icon: '/images/amenities/reception.png' },
      { name: '免费WiFi', icon: '/images/amenities/wifi.png' },
      { name: '豪华餐厅', icon: '/images/amenities/restaurant.png' },
      { name: '健身中心', icon: '/images/amenities/gym.png' },
      { name: '水疗中心', icon: '/images/amenities/spa.png' },
      { name: '商务中心', icon: '/images/amenities/business.png' },
      { name: '会议室', icon: '/images/amenities/meeting.png' },
      { name: '泳池', icon: '/images/amenities/pool.png' },
      { name: '代客泊车', icon: '/images/amenities/parking.png' },
      { name: '行李寄存', icon: '/images/amenities/luggage.png' },
      { name: '叫车服务', icon: '/images/amenities/taxi.png' },
      { name: '货币兑换', icon: '/images/amenities/exchange.png' }
    ],
    location: {
      latitude: 31.235929,
      longitude: 121.501654,
      markers: [{
        id: 1,
        latitude: 31.235929,
        longitude: 121.501654,
        name: 'ANSEL 安泽酒店'
      }],
      transportation: [
        { type: '地铁', info: '地铁2号线陆家嘴站3号出口步行500米' },
        { type: '公交', info: '陆家嘴环路站：981路、983路、大桥六线' },
        { type: '机场', info: '浦东国际机场距离酒店约35公里，出租车约45分钟' },
        { type: '火车站', info: '上海虹桥火车站距离酒店约18公里，出租车约35分钟' }
      ],
      attractions: [
        { name: '东方明珠电视塔', distance: '500米' },
        { name: '上海环球金融中心', distance: '800米' },
        { name: '上海中心', distance: '1公里' },
        { name: '上海海洋水族馆', distance: '1.5公里' },
        { name: '外滩', distance: '3公里' }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.tab) {
      this.setData({
        activeTab: options.tab
      });
    }
  },

  // 切换标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  // 预览酒店图片
  previewImage(e) {
    const current = e.currentTarget.dataset.src;
    const urls = this.data.hotelInfo.images;
    
    wx.previewImage({
      current,
      urls
    });
  },

  // 打电话
  callHotel() {
    wx.makePhoneCall({
      phoneNumber: this.data.hotelInfo.phone
    });
  },

  // 导航到酒店
  navigateToHotel() {
    const { latitude, longitude } = this.data.location;
    wx.openLocation({
      latitude,
      longitude,
      name: this.data.hotelInfo.name,
      address: this.data.hotelInfo.address,
      scale: 18
    });
  },

  // 复制地址
  copyAddress() {
    wx.setClipboardData({
      data: this.data.hotelInfo.address,
      success: () => {
        wx.showToast({
          title: '地址已复制',
          icon: 'success'
        });
      }
    });
  },

  // 导航到餐饮页面
  navigateToDining() {
    wx.navigateTo({
      url: '/pages/dining/dining'
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: this.data.hotelInfo.name,
      path: '/pages/hotelInfo/hotelInfo'
    };
  }
}) 