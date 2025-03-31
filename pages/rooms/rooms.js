// pages/rooms/rooms.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 筛选选项
    filters: {
      all: true,
      deluxe: false,
      suite: false,
      family: false,
      presidential: false
    },
    // 房间列表
    rooms: [
      {
        id: 1,
        name: '高级豪华客房',
        image: '/images/room1.jpg',
        size: '45平方米',
        bedType: '1张特大床',
        view: '城市景观',
        price: '980',
        original: '1,280',
        discount: true,
        services: ['免费WiFi', '空调', '迷你吧']
      },
      {
        id: 2,
        name: '行政豪华客房',
        image: '/images/room2.jpg',
        size: '65平方米',
        bedType: '1张特大床',
        view: '城市景观',
        price: '1,280',
        discount: false,
        services: ['免费WiFi', '行政礼遇', '免费早餐']
      },
      {
        id: 3,
        name: '豪华套房',
        image: '/images/room3.jpg',
        size: '92平方米',
        bedType: '1张特大床',
        view: '花园景观',
        price: '1,680',
        discount: false,
        services: ['免费WiFi', '行政礼遇', '独立起居室']
      },
      {
        id: 4,
        name: '家庭套房',
        image: '/images/room4.jpg',
        size: '110平方米',
        bedType: '2张大床',
        view: '花园景观',
        price: '2,180',
        discount: false,
        services: ['免费WiFi', '起居室', '儿童设施']
      },
      {
        id: 5,
        name: '总统套房',
        image: '/images/room5.jpg',
        size: '180平方米',
        bedType: '1张特大床',
        view: '全景观',
        price: '6,880',
        discount: false,
        services: ['管家服务', '私人厨师', '豪华用品']
      }
    ],
    // 搜索条件
    searchQuery: '',
    dateRange: '3月30日 - 4月1日',
    guestInfo: '2位成人、1间房'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从导航参数中获取搜索条件
    if (options.dateRange) {
      this.setData({
        dateRange: options.dateRange
      });
    }
    if (options.guestInfo) {
      this.setData({
        guestInfo: options.guestInfo
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 初始化自定义tabBar
    const app = getApp();
    if (app.initTabBar) {
      app.initTabBar();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 切换筛选条件
  toggleFilter(e) {
    const filter = e.currentTarget.dataset.filter;
    let filters = { ...this.data.filters };
    
    if (filter === 'all') {
      // 如果选择"全部"，则其他筛选器都设为false
      for (let key in filters) {
        filters[key] = key === 'all';
      }
    } else {
      // 如果选择其他筛选器，则"全部"设为false
      filters.all = false;
      filters[filter] = !filters[filter];
      
      // 如果没有任何筛选器被选中，则"全部"设为true
      let anyFilterSelected = false;
      for (let key in filters) {
        if (key !== 'all' && filters[key]) {
          anyFilterSelected = true;
          break;
        }
      }
      if (!anyFilterSelected) {
        filters.all = true;
      }
    }
    
    this.setData({ filters });
  },

  // 搜索框输入
  onSearchInput(e) {
    this.setData({
      searchQuery: e.detail.value
    });
  },
  
  // 清空搜索
  clearSearch() {
    this.setData({
      searchQuery: ''
    });
  },

  // 查看房间详情
  navigateToRoomDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/packageBooking/roomDetail/roomDetail?id=${id}`
    });
  },
  
  // 修改搜索条件
  modifySearch() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  }
})