Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //方法一 数据库操作写在云函数中，前端仅负责调用
    /*     
    wx.cloud.callFunction({
          name: 'pageCounter',
          data: {},
          success: res => {
            console.error('[云函数] [pageCounter] 调用结果', res.result)
            this.setData({
              count: res.result.count
            })
          },
          fail: err => {
            console.error('[云函数] [pageCounter] 调用失败', err)
          }
        }) 
    */

    //方法二 前端直接操作数据库
    this.pageCounter()
  },

  /**
   * 本地调用数据库更新页面访问次数
   */
  pageCounter: function() {
    const db = wx.cloud.database()
    const _ = db.command

    db.collection('counters')
      .get()
      .then(res => {
        if (res.data.length > 0) {
          db.collection('counters').doc(res.data[0]._id).update({
            data: {
              count: _.inc(1)
            }
          })
          this.setData({
            count: res.data[0].count + 1
          })
        } else {
          db.collection('counters').add({
            data: {
              count: 1
            }
          })
          this.setData({
            count: 1
          })
        }
      });
  },
})