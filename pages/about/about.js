// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [
      { id: 'hotelInfo', icon: '/images/about/hotel-info.png', name: '酒店介绍', url: '/packageInfo/hotelInfo/hotelInfo' },
      { id: 'dining', icon: '/images/about/dining.png', name: '餐饮美食', url: '/packageService/dining/dining' },
      { id: 'contact', icon: '/images/about/contact.png', name: '联系我们', url: '/packageInfo/contact/contact' },
      { id: 'service', icon: '/images/about/service.png', name: '智能客服', url: '/packageService/aiChat/aiChat' },
      { id: 'feedback', icon: '/images/about/feedback.png', name: '意见反馈', url: '/packageService/feedback/feedback' },
      { id: 'about', icon: '/images/about/about-us.png', name: '关于我们', url: '/packageInfo/aboutUs/aboutUs' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  // 处理菜单点击
  handleMenuClick(e) {
    const menuId = e.currentTarget.dataset.id;
    const menu = this.data.menuList.find(item => item.id === menuId);
    
    if (menu && menu.url) {
      wx.navigateTo({
        url: menu.url
      });
    } else {
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      });
    }
  }
})