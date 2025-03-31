Component({
  data: {
    active: 0,
    list: [
      {
        icon: 'wap-home-o',
        text: '首页',
        url: '/pages/index/index'
      },
      {
        icon: 'hotel-o',
        text: '客房',
        url: '/pages/rooms/rooms'
      },
      {
        icon: 'orders-o',
        text: '订单',
        url: '/pages/myOrders/myOrders'
      },
      {
        icon: 'contact',
        text: '我的',
        url: '/pages/member/member'
      },
      {
        icon: 'apps-o',
        text: '更多',
        url: '/pages/about/about'
      }
    ]
  },

  methods: {
    onChange(event) {
      this.setData({ active: event.detail });
      wx.switchTab({
        url: this.data.list[event.detail].url
      });
    },

    init() {
      const page = getCurrentPages().pop();
      const route = page ? page.route : 'pages/index/index';
      const active = this.data.list.findIndex(item => item.url === `/${route}`);
      
      this.setData({ active });
    }
  }
}); 