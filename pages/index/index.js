// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    // 轮播图数据
    banners: [
      {
        id: 1,
        image: '/images/index/banner-1.jpg',
        title: '奢享至臻体验',
        subtitle: '尽在城市中的隐逸奢所'
      },
      {
        id: 2,
        image: '/images/index/banner-2.jpg',
        title: '精致餐饮美馔',
        subtitle: '探寻舌尖上的味蕾盛宴'
      },
      {
        id: 3,
        image: '/images/index/banner-3.jpg',
        title: '臻品会员专享',
        subtitle: '尊贵礼遇 独家优享'
      }

    ],
    
    // 日期选择
    checkInDate: '3月30日',
    checkOutDate: '4月1日',
    
    // 入住人数选择
    guestOptions: ['2位成人、1间房', '2位成人、2间房', '3位成人、2间房', '4位成人、2间房'],
    guestIndex: 0,
    
    // 促销码
    usePromotion: false,
    
    // 特色房型
    featuredRooms: [
      {
        id: 1,
        name: '行政豪华客房',
        image: '/images/index/room1.jpg',
        size: '65平方米',
        bedType: '1张特大床',
        view: '城市景观',
        price: '1,280',
        rating: '4.9',
        tag: '热门'
      },
      {
        id: 2,
        name: '豪华套房',
        image: '/images/index/room2.jpg',
        size: '92平方米',
        bedType: '1张特大床',
        view: '花园景观',
        price: '1,680',
        rating: '4.8',
        tag: '推荐'
      },
      {
        id: 3,
        name: '家庭套房',
        image: '/images/index/room3.jpg',
        size: '110平方米',
        bedType: '2张大床',
        view: '花园景观',
        price: '2,180',
        rating: '4.7',
        tag: '新上线'
      }
    ],
    
    // 酒店服务
    services: [
      { id: 1, name: '24小时客房服务', icon: 'service-o' },
      { id: 2, name: 'SPA服务', icon: 'hot-o' },
      { id: 3, name: '健身中心', icon: 'brush-o' },
      { id: 4, name: '游泳池', icon: 'underway-o' },
      { id: 5, name: '餐厅', icon: 'shop-o' },
      { id: 6, name: '商务中心', icon: 'desktop-o' },
      { id: 7, name: '会议室', icon: 'friends-o' },
      { id: 8, name: '停车场', icon: 'setting-o' }
    ],
    
    // 会员特权
    memberPrivileges: [
      { id: 1, name: '免费早餐', icon: 'coffee-o' },
      { id: 2, name: '优先升级', icon: 'upgrade' },
      { id: 3, name: '优先入住', icon: 'medal-o' },
      { id: 4, name: '生日礼遇', icon: 'gift-o' },
      { id: 5, name: '会员折扣', icon: 'coupon-o' },
      { id: 6, name: '行政酒廊', icon: 'gem-o' }
    ]
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  onLoad() {
    // 页面加载时执行的操作
  },
  // 入住日期选择
  bindCheckInDateChange(e) {
    // 将日期格式化为"月日"格式
    const date = new Date(e.detail.value);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.setData({
      checkInDate: `${month}月${day}日`
    });
  },
  // 离店日期选择
  bindCheckOutDateChange(e) {
    // 将日期格式化为"月日"格式
    const date = new Date(e.detail.value);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.setData({
      checkOutDate: `${month}月${day}日`
    });
  },
  // 入住人数选择
  bindGuestChange(e) {
    this.setData({
      guestIndex: e.detail.value
    });
  },
  // 促销码选择
  togglePromotion() {
    this.setData({
      usePromotion: !this.data.usePromotion
    });
  },
  // 搜索可预订房间
  searchRooms() {
    wx.navigateTo({
      url: '/pages/rooms/rooms'
    });
  },
  // 查看全部房间
  navigateToRooms() {
    console.log("正在跳转到房间列表页面...");
    wx.navigateTo({
      url: '/pages/rooms/rooms',
      success: function() {
        console.log("成功跳转到房间列表页面");
      },
      fail: function(err) {
        console.error("跳转失败:", err);
        wx.showToast({
          title: '跳转失败，请稍后再试',
          icon: 'none'
        });
      }
    });
  },
  // 查看房间详情
  navigateToRoomDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/packageBooking/roomDetail/roomDetail?id=${id}`
    });
  },
  // 查看关于酒店
  navigateToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },
  // 跳转到智能助理
  navigateToAiChat() {
    wx.navigateTo({
      url: '/packageService/aiChat/aiChat'
    });
  },
  // 跳转到服务页面
  navigateToService(e) {
    const serviceId = e.currentTarget.dataset.id;
    let url = '';
    
    // 根据服务ID跳转到不同的服务页面
    switch(serviceId) {
      case 1: // 24小时客房服务
        wx.navigateTo({ url: '/packageService/aiChat/aiChat' });
        break;
      case 2: // SPA服务
        wx.navigateTo({ url: '/packageService/dining/dining?type=spa' });
        break;
      case 5: // 餐厅
        wx.navigateTo({ url: '/packageService/dining/dining' });
        break;
      case 7: // 会议室
        wx.navigateTo({ url: '/packageInfo/hotelInfo/hotelInfo?tab=facilities' });
        break;
      default:
        wx.showToast({
          title: '功能开发中',
          icon: 'none'
        });
    }
  },
  // 跳转到会员中心
  navigateToMember() {
    wx.switchTab({
      url: '/pages/member/member'
    });
  },
  // 跳转到会员特权详情
  navigateToMemberDetail(e) {
    const privilegeId = e.currentTarget.dataset.id;
    wx.switchTab({
      url: '/pages/member/member',
      success: () => {
        wx.showToast({
          title: '特权查看中',
          icon: 'success'
        });
      }
    });
  },
  // 统一处理"查看全部"按钮点击
  handleViewAllClick(e) {
    const target = e.currentTarget.dataset.target;
    console.log('查看全部按钮点击，目标页面：', target);
    
    switch(target) {
      case 'rooms':
        console.log('正在跳转到房间列表页面...');
        wx.navigateTo({
          url: '/pages/rooms/rooms',
          success: function() {
            console.log('成功跳转到房间列表页面');
          },
          fail: function(err) {
            console.error('跳转失败:', err);
            // 尝试使用switchTab方式跳转（因为rooms页面也在tabBar中）
            wx.switchTab({
              url: '/pages/rooms/rooms',
              fail: function(switchErr) {
                console.error('switchTab也失败了:', switchErr);
                wx.showToast({
                  title: '跳转失败，请稍后再试',
                  icon: 'none'
                });
              }
            });
          }
        });
        break;
      case 'member':
        console.log('正在跳转到会员中心...');
        wx.switchTab({
          url: '/pages/member/member',
          success: function() {
            console.log('成功跳转到会员中心');
          },
          fail: function(err) {
            console.error('跳转到会员中心失败:', err);
            wx.showToast({
              title: '跳转失败，请稍后再试',
              icon: 'none'
            });
          }
        });
        break;
      case 'about':
        console.log('正在跳转到关于页面...');
        wx.switchTab({
          url: '/pages/about/about',
          success: function() {
            console.log('成功跳转到关于页面');
          },
          fail: function(err) {
            console.error('跳转到关于页面失败:', err);
            // 尝试使用navigateTo方式跳转
            wx.navigateTo({
              url: '/pages/about/about',
              fail: function(navErr) {
                console.error('navigateTo也失败了:', navErr);
                wx.showToast({
                  title: '跳转失败，请稍后再试',
                  icon: 'none'
                });
              }
            });
          }
        });
        break;
      default:
        console.warn('未知的目标页面:', target);
    }
  },
  onShow() {
    // 初始化自定义tabBar
    const app = getApp();
    if (app.initTabBar) {
      app.initTabBar();
    }
  }
})
