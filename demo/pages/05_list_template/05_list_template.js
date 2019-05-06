Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_desc_array: [], //分页获取到的数据集合
    list_index: 0, //分页获取数据的当前页索引
    page_count: 5, //每次分页获取多少数据
    is_no_more_data: false //记录是否已加载完所有分页数据
  },

  /**
   * 从云数据库获取标题和描述列表
   */
  getTitleDescList() {
    const db = wx.cloud.database()
    var offset = this.data.list_index * this.data.page_count
    var max = this.data.page_count

    var query
    //skip和limit的传入参数必须大于0
    if (offset === 0) {
      query = db.collection('list_demo')
        .limit(max) // 限制返回数量为 max 条
    }
    else {
      query = db.collection('list_demo')
        .skip(offset) // 跳过结果集中的前 offset 条，从第 offset + 1 条开始返回
        .limit(max) // 限制返回数量为 max 条
    }
    query
      .get()
      .then(res => {
        if (res.data.length > 0) {
          let title_desc_array = this.data.title_desc_array
          title_desc_array = title_desc_array.concat(res.data)
          this.setData({
            title_desc_array: title_desc_array,
            list_index: ++this.data.list_index
          })
        } else {
          this.setData({
            is_no_more_data: true
          }) //设置数据全部加载完毕的标志
        }
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新动画       
      })
      .catch(err => {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新动画    
        console.error(err)
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getTitleDescList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (!this.data.is_no_more_data) { //如果还有数据未加载完，则获取更多数据
      wx.showNavigationBarLoading() //在标题栏中显示加载
      this.getTitleDescList()
    }
    else {
      wx.stopPullDownRefresh() //停止下拉刷新动画       
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.is_no_more_data) { //如果还有数据未加载完，则获取更多数据
      wx.showNavigationBarLoading() //在标题栏中显示加载
      this.getTitleDescList()
    }
  },
})