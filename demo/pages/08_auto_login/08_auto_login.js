// demo/pages/08_auto_login/08_auto_login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //需要定义一个变量that来代表page
    var that = this
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'autoLoginDemo',
      // 传给云函数的参数
      data: {},
      // 请求云函数成功的回调函数
      success: function (res){
        //在JS的回调函数中，this并不是指小程序的page，而是我们调用的云函数
        //因此我们设置page的数据，需要使用前面定义的that
        that.setData({
          openid: res.result.openid
        })
      }
    })
  },
})