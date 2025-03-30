// pages/member/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: '/images/default-avatar.png',
      nickName: '张先生',
      phone: '138****5678',
      memberId: 'HM2023568',
      level: '金卡会员',
      points: 12560
    },
    memberPrivileges: [
      { icon: '/images/member/breakfast.png', name: '免费早餐' },
      { icon: '/images/member/upgrade.png', name: '优先升级' },
      { icon: '/images/member/checkin.png', name: '优先入住' },
      { icon: '/images/member/gift.png', name: '生日礼遇' },
      { icon: '/images/member/discount.png', name: '会员折扣' },
      { icon: '/images/member/lounge.png', name: '行政酒廊' }
    ],
    coupons: [
      { id: 1, name: '生日特惠券', value: 500, expire: '2023-12-31' },
      { id: 2, name: '周末优惠券', value: 200, expire: '2023-09-30' }
    ],
    menuList: [
      { id: 'orders', icon: '/images/member/order.png', name: '我的订单' },
      { id: 'coupon', icon: '/images/member/coupon.png', name: '我的优惠券' },
      { id: 'points', icon: '/images/member/points.png', name: '积分明细' },
      { id: 'favorite', icon: '/images/member/favorite.png', name: '我的收藏' },
      { id: 'setting', icon: '/images/member/setting.png', name: '设置' },
      { id: 'service', icon: '/images/member/service.png', name: '联系客服' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.checkUserInfo();
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

  // 检查用户信息
  checkUserInfo() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        'userInfo.avatarUrl': userInfo.avatarUrl,
        'userInfo.nickName': userInfo.nickName
      });
    }
  },

  // 获取用户信息
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        const userInfo = res.userInfo;
        this.setData({
          'userInfo.avatarUrl': userInfo.avatarUrl,
          'userInfo.nickName': userInfo.nickName
        });
        
        // 保存用户信息
        wx.setStorageSync('userInfo', userInfo);
      }
    });
  },

  // 跳转到优惠券页面
  navigateToCoupons() {
    wx.showToast({
      title: '优惠券功能开发中',
      icon: 'none'
    });
  },

  // 跳转到会员权益页面
  navigateToPrivileges() {
    wx.showToast({
      title: '会员权益页面开发中',
      icon: 'none'
    });
  },

  // 跳转到积分明细页面
  navigateToPoints() {
    wx.showToast({
      title: '积分明细页面开发中',
      icon: 'none'
    });
  },

  // 菜单项点击事件
  handleMenuClick(e) {
    const menuId = e.currentTarget.dataset.id;
    
    switch(menuId) {
      case 'orders':
        wx.switchTab({
          url: '/pages/myOrders/myOrders'
        });
        break;
      case 'coupon':
        this.navigateToCoupons();
        break;
      case 'points':
        this.navigateToPoints();
        break;
      case 'favorite':
        wx.showToast({
          title: '收藏功能开发中',
          icon: 'none'
        });
        break;
      case 'setting':
        wx.showToast({
          title: '设置功能开发中',
          icon: 'none'
        });
        break;
      case 'service':
        wx.navigateTo({
          url: '/pages/aiChat/aiChat'
        });
        break;
      default:
        break;
    }
  },

  // 复制会员ID
  copyMemberId() {
    wx.setClipboardData({
      data: this.data.userInfo.memberId,
      success: () => {
        wx.showToast({
          title: '会员ID已复制',
          icon: 'success'
        });
      }
    });
  }
})