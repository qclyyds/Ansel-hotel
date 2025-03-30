Page({

  /**
   * 页面的初始数据
   */
  data: {
    rating: 0,
    selectedType: '',
    feedbackContent: '',
    contactInfo: '',
    images: [],
    canSubmit: false,
    submitting: false,
    feedbackTypes: [
      { value: 'suggestion', label: '建议' },
      { value: 'complaint', label: '投诉' },
      { value: 'praise', label: '表扬' },
      { value: 'question', label: '咨询' },
      { value: 'other', label: '其他' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 如果从其他页面进入，可以获取相关参数
    if (options.type) {
      this.selectType({ currentTarget: { dataset: { type: options.type } } });
    }
    
    // 每次输入都检查表单是否可提交
    this.checkFormValid();
  },

  /**
   * 设置评分
   */
  setRating(e) {
    const rating = e.currentTarget.dataset.rating;
    this.setData({ rating });
    this.checkFormValid();
  },

  /**
   * 选择反馈类型
   */
  selectType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ selectedType: type });
    this.checkFormValid();
  },

  /**
   * 输入反馈内容
   */
  inputFeedback(e) {
    this.setData({ 
      feedbackContent: e.detail.value 
    });
    this.checkFormValid();
  },

  /**
   * 输入联系方式
   */
  inputContact(e) {
    this.setData({ 
      contactInfo: e.detail.value 
    });
  },

  /**
   * 选择图片
   */
  chooseImage() {
    const { images } = this.data;
    const remainCount = 3 - images.length;
    
    if (remainCount <= 0) {
      return;
    }
    
    wx.chooseMedia({
      count: remainCount,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 获取新选择的图片临时路径
        const newImages = res.tempFiles.map(file => file.tempFilePath);
        
        // 添加到图片列表
        this.setData({
          images: [...images, ...newImages]
        });
      }
    });
  },

  /**
   * 预览图片
   */
  previewImage(e) {
    const { index } = e.currentTarget.dataset;
    const { images } = this.data;
    
    wx.previewImage({
      current: images[index],
      urls: images
    });
  },

  /**
   * 删除图片
   */
  deleteImage(e) {
    const { index } = e.currentTarget.dataset;
    const { images } = this.data;
    
    const newImages = [...images];
    newImages.splice(index, 1);
    
    this.setData({
      images: newImages
    });
  },

  /**
   * 检查表单是否有效
   */
  checkFormValid() {
    const { rating, selectedType, feedbackContent } = this.data;
    
    // 必须有评分、选择反馈类型且有反馈内容
    const canSubmit = (
      rating > 0 && 
      selectedType && 
      feedbackContent.trim().length > 0
    );
    
    if (this.data.canSubmit !== canSubmit) {
      this.setData({ canSubmit });
    }
  },

  /**
   * 提交反馈
   */
  submitFeedback() {
    const { canSubmit, rating, selectedType, feedbackContent, contactInfo, images } = this.data;
    
    if (!canSubmit) {
      // 如果不满足提交条件，提示用户
      if (rating === 0) {
        this.showToast('请为我们评分');
        return;
      }
      
      if (!selectedType) {
        this.showToast('请选择反馈类型');
        return;
      }
      
      if (!feedbackContent.trim()) {
        this.showToast('请填写反馈内容');
        return;
      }
      
      return;
    }
    
    // 设置为提交中状态
    this.setData({ submitting: true });
    
    // 准备提交的数据
    const feedbackData = {
      rating,
      type: selectedType,
      content: feedbackContent,
      contact: contactInfo,
      images: images.length > 0 ? images : []
    };
    
    console.log('提交反馈:', feedbackData);
    
    // 模拟提交过程
    setTimeout(() => {
      // 提交成功后
      this.setData({ submitting: false });
      
      wx.showToast({
        title: '反馈提交成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          // 2秒后返回上一页
          setTimeout(() => {
            wx.navigateBack();
          }, 2000);
        }
      });
    }, 1500);
  },

  /**
   * 显示提示信息
   */
  showToast(title) {
    wx.showToast({
      title,
      icon: 'none',
      duration: 2000
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
      title: '意见反馈 - ANSEL安泽酒店',
      path: '/pages/feedback/feedback'
    };
  }
}) 