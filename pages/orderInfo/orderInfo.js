// pages/orderInfo/orderInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId: null,
    orderId: "ORD" + new Date().getTime(),
    orderStatus: 'success', // success, failed
    orderTime: '',
    orderPrice: 0,
    room: null,
    countdown: 900, // 15分钟倒计时，单位秒
    countdownFormatted: '15:00',
    paymentQRVisible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const roomId = parseInt(options.id);
    const price = parseFloat(options.price) || 0;
    const now = new Date();
    
    this.setData({
      roomId,
      orderPrice: price,
      orderTime: this.formatDate(now)
    });
    
    this.loadRoomData(roomId);
    this.startCountdown();
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

  // 加载房间数据
  loadRoomData(id) {
    // 模拟数据，实际项目中应从后端获取
    const roomData = {
      id: id,
      name: '行政豪华客房',
      image: '/images/room-detail1.jpg',
      size: '65平方米',
      bedType: '1张特大床',
      view: '城市景观',
      checkInDate: '3月30日',
      checkOutDate: '4月1日',
      nights: 2,
      guestName: '张先生',
      guestPhone: '1385****456',
      guestCount: '2位成人、1间房'
    };

    this.setData({
      room: roomData
    });
  },

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },

  // 开始倒计时
  startCountdown() {
    const timer = setInterval(() => {
      let countdown = this.data.countdown - 1;
      
      if (countdown <= 0) {
        clearInterval(timer);
        this.setData({
          orderStatus: 'failed',
          countdownFormatted: '00:00'
        });
        return;
      }
      
      const minutes = Math.floor(countdown / 60).toString().padStart(2, '0');
      const seconds = (countdown % 60).toString().padStart(2, '0');
      
      this.setData({
        countdown,
        countdownFormatted: `${minutes}:${seconds}`
      });
    }, 1000);
  },

  // 显示支付二维码
  showPaymentQR() {
    this.setData({
      paymentQRVisible: true
    });
  },

  // 隐藏支付二维码
  hidePaymentQR() {
    this.setData({
      paymentQRVisible: false
    });
  },

  // 查看订单
  viewOrder() {
    wx.navigateTo({
      url: '/pages/myOrders/myOrders'
    });
  },

  // 返回首页
  backToHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  // 取消订单
  cancelOrder() {
    wx.showModal({
      title: '取消预订',
      content: '确定要取消此订单吗？',
      success: (res) => {
        if (res.confirm) {
          // 模拟取消订单操作
          setTimeout(() => {
            wx.showToast({
              title: '订单已取消',
              icon: 'success',
              duration: 2000,
              success: () => {
                setTimeout(() => {
                  wx.navigateBack();
                }, 2000);
              }
            });
          }, 1000);
        }
      }
    });
  },

  // 联系客服
  contactService() {
    wx.navigateTo({
      url: '/pages/aiChat/aiChat'
    });
  },

  // 复制订单号
  copyOrderId() {
    wx.setClipboardData({
      data: this.data.orderId,
      success: () => {
        wx.showToast({
          title: '订单号已复制',
          icon: 'success'
        });
      }
    });
  }
})