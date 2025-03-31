Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeRestaurant: 0, // 当前选中的餐厅索引
    bookingDate: '',
    bookingTime: '',
    guestCount: 2,
    restaurants: [
      {
        id: 1,
        name: '星光西餐厅',
        type: '西餐',
        image: '/images/dining/restaurant1.jpg',
        description: '星光西餐厅位于酒店25层，提供地中海和法式风味料理，配以现代装饰和全景落地窗，可俯瞰城市美景。餐厅以新鲜食材和创意菜品著称，由国际顶级厨师团队精心烹制。',
        openTime: '11:30 - 14:30, 17:30 - 22:00',
        location: '酒店25层',
        phone: '021-88889990',
        specialties: [
          { name: '澳洲和牛牛排', price: '388', image: '/images/dining/dish1-1.jpg', description: '精选澳洲M9+和牛，搭配时令有机蔬菜和松露汁' },
          { name: '地中海烤鲈鱼', price: '268', image: '/images/dining/dish1-2.jpg', description: '新鲜鲈鱼配以橄榄油、迷迭香和柠檬烤制' },
          { name: '法式鹅肝', price: '198', image: '/images/dining/dish1-3.jpg', description: '经典法式鹅肝配无花果酱和香脆面包' },
          { name: '龙虾浓汤', price: '168', image: '/images/dining/dish1-4.jpg', description: '精选加拿大龙虾熬制，配以少量干邑和新鲜奶油' }
        ]
      },
      {
        id: 2,
        name: '江南中餐厅',
        type: '中餐',
        image: '/images/dining/restaurant2.jpg',
        description: '江南中餐厅以正宗江浙菜和粤菜为特色，精选时令食材，结合传统烹饪技艺与现代呈现方式。餐厅环境优雅，设有多间包厢，是商务宴请和家庭聚餐的理想场所。',
        openTime: '11:00 - 14:00, 17:00 - 21:30',
        location: '酒店2层',
        phone: '021-88889991',
        specialties: [
          { name: '蟹粉狮子头', price: '168', image: '/images/dining/dish2-1.jpg', description: '鲜嫩猪肉与大闸蟹蟹粉制作的经典苏菜' },
          { name: '东坡肉', price: '128', image: '/images/dining/dish2-2.jpg', description: '传统杭州名菜，肥而不腻，入口即化' },
          { name: '松鼠桂鱼', price: '198', image: '/images/dining/dish2-3.jpg', description: '外酥里嫩，鱼肉鲜美，造型独特' },
          { name: '龙井虾仁', price: '158', image: '/images/dining/dish2-4.jpg', description: '西湖龙井茶香与鲜嫩虾仁的完美结合' }
        ]
      },
      {
        id: 3,
        name: '悠蓝酒廊',
        type: '酒吧',
        image: '/images/dining/restaurant3.jpg',
        description: '悠蓝酒廊位于酒店顶层，提供精选葡萄酒、鸡尾酒和小食。夜晚可欣赏城市璀璨夜景，周末有现场爵士乐表演，是放松休闲与朋友小聚的绝佳选择。',
        openTime: '16:00 - 01:00',
        location: '酒店顶层',
        phone: '021-88889992',
        specialties: [
          { name: '安泽特调鸡尾酒', price: '98', image: '/images/dining/dish3-1.jpg', description: '酒店招牌鸡尾酒，融合法国干邑与中国白酒元素' },
          { name: '精选奶酪拼盘', price: '168', image: '/images/dining/dish3-2.jpg', description: '五种进口奶酪配无花果、核桃和蜂蜜' },
          { name: '小龙虾塔帕斯', price: '138', image: '/images/dining/dish3-3.jpg', description: '亚洲风味小龙虾配香料和柠檬' },
          { name: '日式和牛寿司', price: '188', image: '/images/dining/dish3-4.jpg', description: '熟成和牛与寿司米的创意结合' }
        ]
      }
    ],
    // 可预订时间段
    timeSlots: [
      '11:30', '12:00', '12:30', '13:00', '13:30', '14:00',
      '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 设置默认预订日期为今天
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    this.setData({
      bookingDate: `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`,
      bookingTime: this.data.timeSlots[5] // 默认选择一个时间
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '美食餐厅 - ANSEL安泽酒店',
      path: '/pages/dining/dining'
    };
  },

  // 切换餐厅
  switchRestaurant(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeRestaurant: index
    });
  },

  // 预览餐厅图片
  previewRestaurantImage(e) {
    const restaurant = this.data.restaurants[this.data.activeRestaurant];
    wx.previewImage({
      current: restaurant.image,
      urls: [restaurant.image]
    });
  },

  // 预览菜品图片
  previewDishImage(e) {
    const { src } = e.currentTarget.dataset;
    const restaurant = this.data.restaurants[this.data.activeRestaurant];
    const dishes = restaurant.specialties.map(item => item.image);
    
    wx.previewImage({
      current: src,
      urls: dishes
    });
  },

  // 拨打餐厅电话
  callRestaurant() {
    const restaurant = this.data.restaurants[this.data.activeRestaurant];
    wx.makePhoneCall({
      phoneNumber: restaurant.phone
    });
  },

  // 选择日期
  bindDateChange(e) {
    this.setData({
      bookingDate: e.detail.value
    });
  },

  // 选择时间
  bindTimeChange(e) {
    this.setData({
      bookingTime: this.data.timeSlots[e.detail.value]
    });
  },

  // 调整用餐人数
  adjustGuestCount(e) {
    const { action } = e.currentTarget.dataset;
    let { guestCount } = this.data;
    
    if (action === 'minus' && guestCount > 1) {
      guestCount--;
    } else if (action === 'plus' && guestCount < 20) {
      guestCount++;
    }
    
    this.setData({ guestCount });
  },

  // 提交预订
  submitBooking() {
    const restaurant = this.data.restaurants[this.data.activeRestaurant];
    const { bookingDate, bookingTime, guestCount } = this.data;
    
    wx.showModal({
      title: '确认预订',
      content: `您即将预订${restaurant.name}，日期：${bookingDate}，时间：${bookingTime}，${guestCount}人用餐，是否确认？`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '提交中...'
          });
          
          // 模拟提交
          setTimeout(() => {
            wx.hideLoading();
            
            wx.showToast({
              title: '预订成功',
              icon: 'success',
              duration: 2000
            });
          }, 1500);
        }
      }
    });
  }
}) 