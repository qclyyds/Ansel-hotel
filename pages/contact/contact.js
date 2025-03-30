// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactInfo: {
      phone: '021-88889999',
      email: 'service@anselhotel.com',
      address: '上海市浦东新区陆家嘴环路1288号',
      workTime: '周一至周日 24小时',
      socialMedia: [
        { name: '微信公众号', icon: '/images/contact/wechat.png', value: 'AnselHotel' },
        { name: '微博', icon: '/images/contact/weibo.png', value: '@ANSEL安泽酒店' }
      ]
    },
    location: {
      latitude: 31.235929,
      longitude: 121.501654,
      markers: [{
        id: 1,
        latitude: 31.235929,
        longitude: 121.501654,
        name: 'ANSEL 安泽酒店'
      }]
    },
    formData: {
      name: '',
      phone: '',
      email: '',
      content: ''
    },
    submitDisabled: true
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
      title: '联系我们 - ANSEL安泽酒店',
      path: '/pages/contact/contact'
    };
  },

  // 打电话
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.contactInfo.phone
    });
  },

  // 复制邮箱
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

  // 复制公众号
  copyWechat() {
    wx.setClipboardData({
      data: this.data.contactInfo.socialMedia[0].value,
      success: () => {
        wx.showToast({
          title: '微信号已复制',
          icon: 'success'
        });
      }
    });
  },

  // 导航到酒店
  navigateToHotel() {
    const { latitude, longitude } = this.data.location;
    wx.openLocation({
      latitude,
      longitude,
      name: 'ANSEL 安泽酒店',
      address: this.data.contactInfo.address,
      scale: 18
    });
  },

  // 表单输入
  inputChange(e) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;
    
    this.setData({
      [`formData.${field}`]: value
    });
    
    // 验证表单
    this.validateForm();
  },

  // 验证表单
  validateForm() {
    const { name, phone, content } = this.data.formData;
    const isValid = name.trim() !== '' && phone.trim() !== '' && content.trim() !== '';
    
    this.setData({
      submitDisabled: !isValid
    });
  },

  // 提交表单
  submitForm() {
    const { name, phone, email, content } = this.data.formData;
    
    if (this.data.submitDisabled) {
      return;
    }
    
    // 简单的手机号验证
    const phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }
    
    // 如果填写了邮箱，进行验证
    if (email !== '') {
      const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!emailReg.test(email)) {
        wx.showToast({
          title: '请输入正确的邮箱',
          icon: 'none'
        });
        return;
      }
    }
    
    wx.showLoading({
      title: '提交中...'
    });
    
    // 模拟提交
    setTimeout(() => {
      wx.hideLoading();
      
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      });
      
      // 重置表单
      this.setData({
        formData: {
          name: '',
          phone: '',
          email: '',
          content: ''
        },
        submitDisabled: true
      });
    }, 1500);
  }
})