// pages/roomDetail/roomDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    room: null,
    bannerCurrent: 0,
    showAllAmenities: false,
    selectDates: '3月30日 - 4月1日',
    guestInfo: '2位成人、1间房',
    totalNights: 2,
    totalPrice: 0,
    discountAmount: 0,
    finalPrice: 0,
    roomImages: [],
    tabs: [
      { id: 'detail', name: '客房详情' },
      { id: 'service', name: '设施与服务' },
      { id: 'policy', name: '预订政策' }
    ],
    activeTab: 'detail',
    amenities: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = parseInt(options.id);
    this.setData({ id });
    this.loadRoomData(id);
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
      description: '行政豪华客房位于酒店高层，提供城市美景和高端设施。房间宽敞明亮，配有特大号床，适合商务和休闲旅客。住客可享用行政酒廊和专属管家服务。',
      size: '65平方米',
      bedType: '1张特大床',
      view: '城市景观',
      maxGuests: 2,
      pricePerNight: 1280,
      discount: 0,
      images: [
        '/images/room-detail1.jpg',
        '/images/room-detail2.jpg',
        '/images/room-detail3.jpg',
        '/images/room-detail4.jpg'
      ],
      amenities: [
        { icon: '/images/amenities/wifi.png', name: '免费WiFi' },
        { icon: '/images/amenities/ac.png', name: '中央空调' },
        { icon: '/images/amenities/tv.png', name: '55寸智能电视' },
        { icon: '/images/amenities/safe.png', name: '电子保险箱' },
        { icon: '/images/amenities/minibar.png', name: '迷你吧' },
        { icon: '/images/amenities/bath.png', name: '独立浴缸' },
        { icon: '/images/amenities/shower.png', name: '雨淋花洒' },
        { icon: '/images/amenities/toiletries.png', name: '高端洗漱用品' },
        { icon: '/images/amenities/bathrobe.png', name: '浴袍和拖鞋' },
        { icon: '/images/amenities/desk.png', name: '工作区域' },
        { icon: '/images/amenities/coffee.png', name: '咖啡机' },
        { icon: '/images/amenities/ironing.png', name: '熨斗与熨衣板' }
      ],
      services: [
        '24小时客房服务',
        '行政酒廊使用权',
        '免费早餐',
        '专属管家服务',
        '免费迎宾饮料',
        '每日换洗床单',
        '擦鞋服务',
        '叫醒服务'
      ],
      policies: [
        '入住时间：下午14:00后',
        '退房时间：上午12:00前',
        '取消政策：预订确认后24小时内可免费取消',
        '提前24小时以上取消，收取一晚房费',
        '24小时内取消，收取全额房费',
        '不可退款预订：付款后不可取消或修改',
        '额外成人收费：每人每晚300元',
        '儿童政策：12岁以下儿童免费入住'
      ]
    };

    // 计算总价和最终价格
    const totalNights = 2; // 默认2晚
    const totalPrice = roomData.pricePerNight * totalNights;
    const discountAmount = roomData.discount > 0 ? (totalPrice * roomData.discount / 100) : 0;
    const finalPrice = totalPrice - discountAmount;

    this.setData({
      room: roomData,
      roomImages: roomData.images,
      amenities: roomData.amenities,
      totalNights: totalNights,
      totalPrice: totalPrice,
      discountAmount: discountAmount,
      finalPrice: finalPrice
    });
  },

  // 轮播图切换
  bannerChange(e) {
    this.setData({
      bannerCurrent: e.detail.current
    });
  },

  // 显示所有设施
  toggleAllAmenities() {
    this.setData({
      showAllAmenities: !this.data.showAllAmenities
    });
  },

  // 切换标签页
  switchTab(e) {
    const tabId = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tabId
    });
  },

  // 跳转到预订页面
  navigateToBooking() {
    wx.navigateTo({
      url: `/pages/booking/booking?id=${this.data.id}`
    });
  },

  // 返回上一页
  navigateBack() {
    wx.navigateBack();
  },

  // 预览图片
  previewImage(e) {
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.roomImages[index],
      urls: this.data.roomImages
    });
  }
})