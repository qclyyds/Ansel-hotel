// pages/booking/booking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId: null,
    room: null,
    dateRange: '3月30日 - 4月1日',
    checkInDate: '3月30日',
    checkOutDate: '4月1日',
    nights: 2,
    guestInfo: '2位成人、1间房',
    guestName: '',
    guestPhone: '',
    specialRequests: '',
    arrivalTime: '14:00之后',
    paymentMethod: 'wechat', // wechat, alipay, creditcard
    usePoints: false,
    availablePoints: 2000,
    pointsExchange: 500, // 积分可抵扣金额
    couponSelected: false,
    coupons: [
      { id: 1, name: '新用户立减¥200', value: 200, available: true, expire: '2023-12-31' },
      { id: 2, name: '周末特惠¥100', value: 100, available: true, expire: '2023-10-31' }
    ],
    activeCoupon: null,
    totalPrice: 0,
    discountAmount: 0,
    finalPrice: 0,
    agreePolicy: false,
    arrivalOptions: ['14:00之后', '15:00-18:00', '18:00-20:00', '20:00之后', '次日凌晨']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = parseInt(options.id);
    this.setData({ roomId: id });
    this.loadRoomData(id);
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
      pricePerNight: 1280,
      discount: 0,
      cancellationPolicy: '预订确认后24小时内可免费取消，之后将收取全额房费。'
    };

    // 计算价格
    const totalPrice = roomData.pricePerNight * this.data.nights;
    const finalPrice = totalPrice; // 初始无折扣

    this.setData({
      room: roomData,
      totalPrice: totalPrice,
      finalPrice: finalPrice
    });
  },

  // 输入姓名
  inputName(e) {
    this.setData({
      guestName: e.detail.value
    });
  },

  // 输入电话
  inputPhone(e) {
    this.setData({
      guestPhone: e.detail.value
    });
  },

  // 输入特殊要求
  inputRequests(e) {
    this.setData({
      specialRequests: e.detail.value
    });
  },

  // 选择到达时间
  selectArrivalTime(e) {
    this.setData({
      arrivalTime: this.data.arrivalOptions[e.detail.value]
    });
  },

  // 选择支付方式
  selectPayment(e) {
    const method = e.currentTarget.dataset.method;
    this.setData({
      paymentMethod: method
    });
  },

  // 切换使用积分
  toggleUsePoints() {
    const usePoints = !this.data.usePoints;
    let finalPrice = this.data.totalPrice;
    
    if (this.data.activeCoupon) {
      finalPrice -= this.data.activeCoupon.value;
    }
    
    if (usePoints) {
      finalPrice -= this.data.pointsExchange;
    }
    
    this.setData({
      usePoints,
      finalPrice: finalPrice > 0 ? finalPrice : 0
    });
  },

  // 打开优惠券列表
  openCouponSelector() {
    this.setData({
      couponSelected: true
    });
  },

  // 关闭优惠券列表
  closeCouponSelector() {
    this.setData({
      couponSelected: false
    });
  },

  // 选择优惠券
  selectCoupon(e) {
    const couponId = e.currentTarget.dataset.id;
    const coupon = this.data.coupons.find(item => item.id === couponId);
    
    let finalPrice = this.data.totalPrice;
    
    if (coupon) {
      finalPrice -= coupon.value;
      
      if (this.data.usePoints) {
        finalPrice -= this.data.pointsExchange;
      }
    }
    
    this.setData({
      activeCoupon: coupon,
      couponSelected: false,
      finalPrice: finalPrice > 0 ? finalPrice : 0
    });
  },

  // 同意政策
  togglePolicy() {
    this.setData({
      agreePolicy: !this.data.agreePolicy
    });
  },

  // 提交订单
  submitOrder() {
    if (!this.data.guestName) {
      wx.showToast({
        title: '请输入入住人姓名',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.guestPhone) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.agreePolicy) {
      wx.showToast({
        title: '请同意预订条款',
        icon: 'none'
      });
      return;
    }
    
    // 构建订单数据
    const orderData = {
      roomId: this.data.roomId,
      roomName: this.data.room.name,
      roomImage: this.data.room.image,
      checkInDate: this.data.checkInDate,
      checkOutDate: this.data.checkOutDate,
      nights: this.data.nights,
      guestName: this.data.guestName,
      guestPhone: this.data.guestPhone,
      specialRequests: this.data.specialRequests,
      arrivalTime: this.data.arrivalTime,
      paymentMethod: this.data.paymentMethod,
      usePoints: this.data.usePoints,
      coupon: this.data.activeCoupon,
      totalPrice: this.data.totalPrice,
      finalPrice: this.data.finalPrice,
      orderTime: new Date().toISOString(),
      orderStatus: 'pending'
    };
    
    // 这里应该调用API提交订单，暂时用模拟数据
    console.log('提交订单', orderData);
    
    // 跳转到订单确认页
    wx.navigateTo({
      url: `/pages/orderInfo/orderInfo?id=${this.data.roomId}&price=${this.data.finalPrice}`
    });
  },

  // 返回上一页
  navigateBack() {
    wx.navigateBack();
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

  }
})