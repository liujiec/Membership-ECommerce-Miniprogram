//引用时间格式化工具
const util = require('../../../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weRunToPointData: [], //同步微信运动步数增加的积分详情
    addPointNum: 0, //同步微信运动步数增加的总积分
    isFailed: false //是否同步失败
  },

  /**
   * 同步按钮点击事件
   */
  onSyncButtonClick: function() {
    var that = this
    //同步之前先初始化数据
    that.setData({
      weRunToPointData: [],
      addPointNum: 0,
      isFailed: false
    })
    //页面提示同步中
    wx.showLoading({
      title: '同步中',
    })
    //wx.getSetting详见https://developers.weixin.qq.com/miniprogram/dev/api/wx.getSetting.html
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.werun']) {
          // 如果用户还未授权过，需要用户授权读取微信运动数据
          wx.authorize({
            scope: 'scope.werun',
            success() {
              that.syncWeRunData()
            },
            fail() {
              //如果用户拒绝授权，提示同步失败
              wx.hideLoading(); //隐藏同步中页面提示
              that.setData({
                isFailed: true
              })
            }
          })
        } else {
          //如果用户已授权过，直接开始同步微信运动数据
          that.syncWeRunData()
        }
      },
      fail() {
        //如果wx.getSetting失败，提示同步失败
        wx.hideLoading(); //隐藏同步中页面提示
        that.setData({
          isFailed: true
        })
      }
    })
  },

  /**
   * 同步微信运动数据
   */
  syncWeRunData: function() {
    var that = this
    //调用微信运动API获取用户最近30天的运动步数，详见https://developers.weixin.qq.com/miniprogram/dev/api/wx.getWeRunData.html
    wx.getWeRunData({
      success(weRunEncryptedData) {
        //console.log('scope.werun-->' + JSON.stringify(weRunEncryptedData) + "\r\n")
        //调用云函数，并同步更新用户积分、成长值
        that.syncWeRunToPoint(weRunEncryptedData)
      },
      fail() {
        wx.hideLoading();
        that.setData({
          isFailed: true
        })
      }
    })
  },

  /**
   * 调用云函数，插入同步的微信运动到数据库，并同步更新用户积分、成长值
   * 解密数据和对解密后数据的数据库操作，都应该在服务端进行，加密数据无法伪造，可以避免黑客伪造客户端提交数据刷积分
   */
  syncWeRunToPoint: function(weRunEncryptedData) {
    var that = this
    //调用云函数，插入同步的微信运动到数据库，并同步更新用户积分、成长值
    wx.cloud.callFunction({
      name: 'syncWeRunToPoint',
      data: {
        //云调用直接获取开放数据，详见https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html
        //接口如果涉及敏感数据（如wx.getWeRunData），接口的明文内容将不包含这些敏感数据，
        //而是在返回的接口中包含对应敏感数据的 cloudID 字段，数据可以通过云函数获取。
        weRunData: wx.cloud.CloudID(weRunEncryptedData.cloudID)
      },
      success: function(res) {
        var weRunToPointData = res.result
        //设置页面显示数据
        var addPointNum = 0
        for (var i in weRunToPointData) {
          addPointNum += weRunToPointData[i].changePoints
          weRunToPointData[i].time = util.formatDate(new Date(weRunToPointData[i].time * 1000))
        }
        that.setData({
          addPointNum: addPointNum,
          weRunToPointData: weRunToPointData.reverse()
        })
      },
      fail: function(err) {
        //调用云函数失败，显示同步失败提示
        console.log('syncWeRunToPoint---err' + JSON.stringify(err) + "\r\n")
        that.setData({
          isFailed: true
        })
      },
      complete: function() {
        wx.hideLoading(); //隐藏同步中页面提示
      }
    })
  }
})











//--------------------------------------使用 2.7.0 以下版本基础库时的旧版代码-------------------------//
//--------------------------------------2.7.0 以下版本基础库不支持CloudId----------------------------//
// //引用时间格式化工具
// const util = require('../../../../../utils/util.js')

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     weRunToPointData: [], //同步微信运动步数增加的积分详情
//     addPointNum: 0, //同步微信运动步数增加的总积分
//     isFailed: false //是否同步失败
//   },

//   /**
//    * 同步按钮点击事件
//    */
//   onSyncButtonClick: function () {
//     var that = this
//     //同步之前先初始化数据
//     that.setData({
//       weRunToPointData: [],
//       addPointNum: 0,
//       isFailed: false
//     })
//     //页面提示同步中
//     wx.showLoading({
//       title: '同步中',
//     })
//     //wx.getSetting详见https://developers.weixin.qq.com/miniprogram/dev/api/wx.getSetting.html
//     wx.getSetting({
//       success(res) {
//         if (!res.authSetting['scope.werun']) {
//           // 如果用户还未授权过，需要用户授权读取微信运动数据
//           wx.authorize({
//             scope: 'scope.werun',
//             success() {
//               that.syncWeRunData()
//             },
//             fail() {
//               //如果用户拒绝授权，提示同步失败
//               wx.hideLoading(); //隐藏同步中页面提示
//               that.setData({
//                 isFailed: true
//               })
//             }
//           })
//         } else {
//           //如果用户已授权过，直接开始同步微信运动数据
//           that.syncWeRunData()
//         }
//       },
//       fail() {
//         //如果wx.getSetting失败，提示同步失败
//         wx.hideLoading();//隐藏同步中页面提示
//         that.setData({
//           isFailed: true
//         })
//       }
//     })
//   },

//   /**
//    * 同步微信运动数据
//    */
//   syncWeRunData: function () {
//     var that = this
//     //调用wx.login获取code，详见https://developers.weixin.qq.com/miniprogram/dev/api/wx.login.html
//     wx.login({
//       success: function (loginResult) {
//         //console.log('code-->' + loginResult.code + "\r\n")
//         //调用微信运动API获取用户最近30天的运动步数，详见https://developers.weixin.qq.com/miniprogram/dev/api/wx.getWeRunData.html
//         wx.getWeRunData({
//           success(weRunEncryptedData) {
//             //console.log('scope.werun-->' + JSON.stringify(weRunEncryptedData) + "\r\n")
//             //调用云函数，解密微信运动数据，并同步更新用户积分、成长值
//             that.syncWeRunToPoint(loginResult, weRunEncryptedData)
//           },
//           fail() {
//             wx.hideLoading();
//             that.setData({
//               isFailed: true
//             })
//           }
//         })
//       },
//       fail() {
//         wx.hideLoading();
//         that.setData({
//           isFailed: true
//         })
//       }
//     })
//   },

//   /**
//    * 调用云函数，插入同步的微信运动到数据库，并同步更新用户积分、成长值
//    * 解密数据和对解密后数据的数据库操作，都应该在服务端进行，加密数据无法伪造，可以避免黑客伪造客户端提交数据刷积分
//    */
//   syncWeRunToPoint: function (loginResult, weRunEncryptedData) {
//     var that = this
//     //调用云函数，插入同步的微信运动到数据库，并同步更新用户积分、成长值
//     wx.cloud.callFunction({
//       name: 'syncWeRunToPoint',
//       data: {
//         js_code: loginResult.code,
//         encryptedData: weRunEncryptedData.encryptedData,
//         iv: weRunEncryptedData.iv
//       },
//       success: function (res) {
//         var weRunToPointData = res.result
//         //设置页面显示数据
//         var addPointNum = 0
//         for (var i in weRunToPointData) {
//           addPointNum += weRunToPointData[i].changePoints
//           weRunToPointData[i].time = util.formatDate(new Date(weRunToPointData[i].time * 1000))
//         }
//         that.setData({
//           addPointNum: addPointNum,
//           weRunToPointData: weRunToPointData.reverse()
//         })
//       },
//       fail: function (err) {
//         //调用云函数失败，显示同步失败提示
//         console.log('syncWeRunToPoint---err' + JSON.stringify(err) + "\r\n")
//         that.setData({
//           isFailed: true
//         })
//       },
//       complete: function () {
//         wx.hideLoading(); //隐藏同步中页面提示
//       }
//     })
//   }
// })