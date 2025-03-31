Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 公司信息
    companyInfo: {
      name: 'ANSEL安泽酒店集团',
      logo: '/images/aboutUs/hotel-logo.png',
      slogan: '尊贵体验，舒适随行',
      description: 'ANSEL安泽酒店集团成立于2008年，总部位于上海，是中国领先的高端酒店管理集团。我们致力于为宾客提供尊贵、舒适的住宿体验和卓越的服务，目前在全国20多个城市拥有超过30家分店。安泽酒店以其独特的设计风格、精致的服务和完善的设施闻名，赢得了众多商务和休闲旅客的信赖与喜爱。',
      values: [
        { title: '我们的使命', content: '为旅客创造难忘的入住体验，成为中国最受尊敬的酒店品牌。' },
        { title: '我们的愿景', content: '到2030年，成为亚洲领先的高端酒店管理集团，拥有100家分店，遍布全球主要城市。' },
        { title: '我们的价值观', content: '尊重、创新、卓越、责任。我们尊重每一位客人，不断创新服务体验，追求卓越品质，承担社会责任。' }
      ]
    },
    // 发展历程
    historyList: [
      { year: '2008年', event: 'ANSEL安泽酒店集团在上海成立，首家酒店在上海浦东开业。' },
      { year: '2010年', event: '拓展至北京、广州等一线城市，推出会员积分体系。' },
      { year: '2013年', event: '获得"中国酒店业最佳新锐品牌"奖项，会员数突破50万。' },
      { year: '2015年', event: '开始国际化布局，在新加坡、东京设立分店。' },
      { year: '2018年', event: '推出全新的智能化酒店服务系统，实现无接触入住。' },
      { year: '2020年', event: '疫情期间推出严格消毒标准，为行业树立标杆。' },
      { year: '2022年', event: '集团会员数突破1000万，推出线上预订APP。' },
      { year: '2023年', event: '获得"亚洲最具投资价值酒店品牌"称号。' },
      { year: '2024年', event: '全新微信小程序上线，提供更便捷的服务体验。' }
    ],
    // 荣誉资质
    awardsList: [
      { year: '2023年', award: '亚洲最具投资价值酒店品牌' },
      { year: '2022年', award: '中国酒店业创新服务奖' },
      { year: '2021年', award: '最佳商务酒店集团' },
      { year: '2020年', award: '中国绿色健康酒店示范单位' },
      { year: '2019年', award: '中国酒店星光奖' },
      { year: '2018年', award: '亚洲酒店设计卓越奖' },
      { year: '2016年', award: '中国最佳雇主酒店集团' },
      { year: '2015年', award: '全球奢华酒店100强' }
    ],
    // 联系信息
    contactInfo: {
      address: '上海市浦东新区陆家嘴环路1288号安泽中心',
      phone: '021-88889999',
      email: 'service@ansel-hotel.com',
      website: 'www.ansel-hotel.com'
    },
    // 当前激活的标签页
    activeTab: 'about'
  },

  /**
   * 返回上一页
   */
  navigateBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 切换标签页
   */
  switchTab(e) {
    const { tab } = e.currentTarget.dataset;
    
    this.setData({
      activeTab: tab
    });
  },

  /**
   * 拨打电话
   */
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.contactInfo.phone
    });
  },

  /**
   * 复制邮箱
   */
  copyEmail() {
    wx.setClipboardData({
      data: this.data.contactInfo.email,
      success: () => {
        wx.showToast({
          title: '邮箱已复制',
          icon: 'success'
        });
      }
    });
  },

  /**
   * 复制网址
   */
  copyWebsite() {
    wx.setClipboardData({
      data: this.data.contactInfo.website,
      success: () => {
        wx.showToast({
          title: '网址已复制',
          icon: 'success'
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 如果从菜单进入，可以获取指定的标签页
    if (options.tab) {
      this.setData({
        activeTab: options.tab
      });
    }
    
    // 设置系统导航栏标题
    wx.setNavigationBarTitle({
      title: '关于我们'
    });
    
    // 设置系统导航栏颜色
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    });
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
    return {
      title: '关于ANSEL安泽酒店',
      path: '/pages/aboutUs/aboutUs'
    };
  }
}) 