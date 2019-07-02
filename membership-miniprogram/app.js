/* 参考https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html */
App({
  /**
   * 生命周期回调——监听小程序初始化。
   */
  onLaunch: function () {
    //云开发基础库要求2.2.3 或以上
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    //使用云函数获取用户openid，用户是否被锁定
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.globalData.isLocked = res.result.isLocked
        this.globalData.openid = res.result.openid
      },
      fail: err => {
        //跳转出错页面
        wx.redirectTo({
          url: '/pages/membership/pages/errorpage/errorpage'
        })
      }
    })
  },
  //小程序全局变量
  globalData: {
    openid: null,
    isLocked: null
  }
})