// pages/myOrders/myOrders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'all', // all, pending, completed, cancelled
    orders: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadOrders();
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
    // 页面显示时刷新数据
    this.loadOrders();
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
    this.loadOrders();
    wx.stopPullDownRefresh();
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

  // 加载订单数据
  loadOrders() {
    // 模拟数据加载延迟
    this.setData({ loading: true });
    
    setTimeout(() => {
      // 模拟订单数据
      const ordersData = [
        {
          id: 'ORD1680123456',
          roomId: 1,
          roomName: '行政豪华客房',
          roomImage: '/images/room-detail1.jpg',
          checkInDate: '3月30日',
          checkOutDate: '4月1日',
          nights: 2,
          totalPrice: 2560,
          status: 'pending', // pending, completed, cancelled
          orderTime: '2023-03-29 13:24:56',
          paymentStatus: 'unpaid', // unpaid, paid
          isPaid: false
        },
        {
          id: 'ORD1680012345',
          roomId: 2,
          roomName: '豪华套房',
          roomImage: '/images/room-detail2.jpg',
          checkInDate: '4月5日',
          checkOutDate: '4月7日',
          nights: 2,
          totalPrice: 3360,
          status: 'completed',
          orderTime: '2023-03-28 10:12:34',
          paymentStatus: 'paid',
          isPaid: true
        },
        {
          id: 'ORD1679901234',
          roomId: 3,
          roomName: '家庭套房',
          roomImage: '/images/room-detail3.jpg',
          checkInDate: '3月20日',
          checkOutDate: '3月22日',
          nights: 2,
          totalPrice: 4360,
          status: 'cancelled',
          orderTime: '2023-03-15 15:45:23',
          paymentStatus: 'unpaid',
          isPaid: false
        }
      ];
      
      this.setData({
        orders: ordersData,
        loading: false
      });
    }, 1000);
  },

  // 切换标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
  },

  // 跳转到订单详情
  navigateToOrderDetail(e) {
    const id = e.currentTarget.dataset.id;
    const roomId = e.currentTarget.dataset.roomid;
    const order = this.data.orders.find(item => item.id === id);
    
    if (!order) return;
    
    wx.navigateTo({
      url: `/pages/orderInfo/orderInfo?id=${roomId}&price=${order.totalPrice}`
    });
  },

  // 继续支付
  continuePay(e) {
    e.stopPropagation(); // 阻止事件冒泡
    const id = e.currentTarget.dataset.id;
    const roomId = e.currentTarget.dataset.roomid;
    const price = e.currentTarget.dataset.price;
    
    wx.navigateTo({
      url: `/pages/orderInfo/orderInfo?id=${roomId}&price=${price}`
    });
  },

  // 取消订单
  cancelOrder(e) {
    e.stopPropagation(); // 阻止事件冒泡
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '取消预订',
      content: '确定要取消此订单吗？',
      success: (res) => {
        if (res.confirm) {
          // 模拟取消订单操作
          const orders = this.data.orders.map(item => {
            if (item.id === id) {
              return { ...item, status: 'cancelled' };
            }
            return item;
          });
          
          this.setData({ orders });
          
          wx.showToast({
            title: '订单已取消',
            icon: 'success'
          });
        }
      }
    });
  },

  // 删除订单
  deleteOrder(e) {
    e.stopPropagation(); // 阻止事件冒泡
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '删除订单',
      content: '确定要删除此订单记录吗？',
      success: (res) => {
        if (res.confirm) {
          // 模拟删除订单操作
          const orders = this.data.orders.filter(item => item.id !== id);
          
          this.setData({ orders });
          
          wx.showToast({
            title: '订单已删除',
            icon: 'success'
          });
        }
      }
    });
  }
})