// pages/aiChat/aiChat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputMessage: '',
    scrollToMessage: '',
    messages: [],
    loading: false,
    quickQuestions: [
      '酒店有哪些餐厅？',
      '预订流程是怎样的？',
      '可以帮我查询一下订单状态吗？',
      '入住和退房时间是几点？'
    ],
    autoReplyData: {
      '你好': '您好，我是ANSEL酒店的智能客服小安，很高兴为您服务。请问有什么可以帮助您的吗？',
      '你是谁': '我是ANSEL酒店的智能客服小安，可以为您提供酒店信息查询、预订咨询等服务。',
      '餐厅': '我们酒店有三家特色餐厅：星光西餐厅(25层)、江南中餐厅(2层)和悠蓝酒廊(顶层)。您可以前往"餐饮美食"页面了解更多信息或进行预订。',
      '房间': '酒店提供豪华客房、行政客房、豪华套房和总统套房等多种房型，可前往"客房"页面查看详情和价格。',
      '预订': '您可以通过小程序直接预订房间，在"客房"页面选择喜欢的房型，填写入住信息后完成支付即可。',
      '入住': '酒店的入住时间是下午14:00后，退房时间是中午12:00前。如需提前入住或延迟退房，建议提前与前台联系。',
      '退房': '酒店的退房时间是中午12:00前。如需延迟退房，建议提前与前台联系，可能会产生额外费用。',
      '设施': '酒店设有健身中心、游泳池、SPA中心、商务中心等设施，大部分设施对住店客人免费开放。',
      '交通': '酒店位于上海市浦东新区陆家嘴环路1288号，距离地铁2号线陆家嘴站步行约500米。',
      '订单': '您可以在"订单"页面查看您的预订记录和当前状态。如需更多帮助，可以联系我们的人工客服。'
    },
    hintMessageList: [
      '您好，我是ANSEL酒店的智能客服小安，很高兴为您服务。',
      '您可以询问关于酒店设施、房型、预订等问题，也可以点击下方快捷问题快速了解。',
      '如需人工服务，请点击右上角转人工客服按钮。'
    ],
    showServiceModal: false,
    showUploadModal: false,
    isTyping: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化消息
    this.addAIMessage('您好，我是ANSEL酒店的智能客服小安，很高兴为您服务。');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.scrollToBottom();
  },

  // 获取当前时间
  getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },
  
  // 输入框内容变化
  onInputChange(e) {
    this.setData({
      inputMessage: e.detail.value
    });
  },
  
  // 添加AI消息
  addAIMessage(content, delay = 0) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const aiMessage = {
          id: `ai_${Date.now()}`,
          type: 'ai',
          content: content,
          time: this.getCurrentTime()
        };
        
        this.setData({
          messages: [...this.data.messages, aiMessage],
          loading: false,
          scrollToMessage: `msg-${aiMessage.id}`
        });
        
        this.scrollToBottom();
        resolve();
      }, delay);
    });
  },
  
  // 发送消息
  sendMessage() {
    const { inputMessage, messages } = this.data;
    
    if (!inputMessage.trim()) {
      return;
    }
    
    // 添加用户消息
    const userMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: inputMessage,
      time: this.getCurrentTime()
    };
    
    this.setData({
      messages: [...messages, userMessage],
      inputMessage: '',
      loading: true,
      scrollToMessage: `msg-${userMessage.id}`
    });
    
    this.scrollToBottom();
    
    // 生成回复
    setTimeout(() => {
      const reply = this.generateReply(inputMessage);
      this.addAIMessage(reply);
    }, 1000);
  },
  
  // 生成回复
  generateReply(userInput) {
    const { autoReplyData } = this.data;
    
    // 尝试精确匹配
    if (autoReplyData[userInput]) {
      return autoReplyData[userInput];
    }
    
    // 关键词匹配
    for (const key in autoReplyData) {
      if (userInput.includes(key)) {
        return autoReplyData[key];
      }
    }
    
    // 默认回复
    return '非常抱歉，我暂时无法理解您的问题。您可以尝试询问关于酒店设施、房型、预订等问题，或点击转人工服务获取更多帮助。';
  },
  
  // 快捷问题
  askQuickQuestion(e) {
    const { question } = e.currentTarget.dataset;
    
    // 设置输入框内容并发送
    this.setData({
      inputMessage: question
    }, () => {
      this.sendMessage();
    });
  },
  
  // 选择图片
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        
        // 添加用户图片消息
        const imageMessage = {
          id: `user_img_${Date.now()}`,
          type: 'user',
          isImage: true,
          content: tempFilePath,
          time: this.getCurrentTime()
        };
        
        this.setData({
          messages: [...this.data.messages, imageMessage],
          loading: true,
          scrollToMessage: `msg-${imageMessage.id}`
        });
        
        this.scrollToBottom();
        
        // 模拟AI回复
        setTimeout(() => {
          this.addAIMessage('我已收到您的图片，但目前我暂时无法处理图片信息。如需进一步沟通，建议转接人工客服获取专业帮助。');
        }, 1500);
      }
    });
  },
  
  // 转人工服务
  switchToHuman() {
    wx.showModal({
      title: '转人工客服',
      content: '确定要转接人工客服吗？工作时间: 8:00-22:00',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '021-88889999'
          });
        }
      }
    });
  },
  
  // 滚动到底部
  scrollToBottom() {
    setTimeout(() => {
      const query = wx.createSelectorQuery();
      query.select('.chat-list').boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec((res) => {
        if (res && res[0] && res[1]) {
          const scrollHeight = res[0].height;
          const scrollTop = res[1].scrollTop;
          const windowHeight = wx.getSystemInfoSync().windowHeight;
          
          wx.pageScrollTo({
            scrollTop: scrollHeight,
            duration: 300
          });
        }
      });
    }, 100);
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
      title: '智能客服 - ANSEL安泽酒店',
      path: '/pages/aiChat/aiChat'
    };
  },

  // 预览图片
  previewImage(e) {
    const { src } = e.currentTarget.dataset;
    wx.previewImage({
      current: src,
      urls: [src]
    });
  },
  
  // 阻止冒泡
  stopPropagation(e) {
    // 阻止事件冒泡
    if (e) {
      e.stopPropagation();
    }
    return;
  },
  
  // 返回上一页
  navigateBack() {
    wx.navigateBack({
      delta: 1
    });
  },
})