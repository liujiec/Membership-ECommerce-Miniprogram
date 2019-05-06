//引用会员套餐的数据库访问类
import MembershipService from '../../../../../dataservice/MembershipService.js'
var membershipService = new MembershipService()
//引用用户等级的数据库访问类
import LevelService from '../../../../../dataservice/LevelService.js'
var levelService = new LevelService()
//引用用户信息的数据库访问类
import UserService from '../../../../../dataservice/UserService.js'
var userService = new UserService()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    myLevel: {}, //用户等级
    myInfo: {}, //用户信息
    membershipPlans: [], //会员套餐列表
    selectedId: 0, //用户选中的套餐id
    price: 0, //用户选中套餐的价格
    discount: 0, //用户会员等级对应的折扣金额
    showPaySuccess: false, //是否支付成功
    showPayFaild: false, //是否支付失败
    inited: false, //是否已从数据库读取数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    membershipService.getMembershipPlans(
      //获取小M卡会员套餐信息回调函数
      function(membershipPlans) {
        that.setData({
          membershipPlans: membershipPlans,
          selectedId: membershipPlans[0].id,
          price: membershipPlans[0].price
        })
      })
    //获取用户信息
    this.setUserData()
  },

  /**
   * 会员套餐item点击事件
   */
  onPlanItemClick: function(event) {
    var id = event.currentTarget.dataset.item.id;
    //如果切换会员套餐item才响应
    if (this.data.selectedId != id) {
      this.setData({
        selectedId: id,
        price: this.data.membershipPlans[id - 1].price
      });
    }
  },
  /**
   * 获取并设置用户信息数据
   */
  setUserData: function() {
    var that = this
    levelService.getLevelList(
      //获取成长体系中的所有成长等级回调函数
      function(levelList) {
        var levels = levelList
        userService.getUserInfo(
          //获取用户信息回调函数
          function(userinfo) {
            var myInfo = userinfo
            //设置用户信息
            var myLevel = levels.filter(e => e.minGrowthValue <= myInfo.growthValue && myInfo.growthValue <= e.maxGrowthValue)[0]
            that.setData({
              myLevel: myLevel,
              myInfo: myInfo,
            })
            //设置用户等级对应的折扣
            if (myLevel.bonus.length == 3) {
              that.setData({
                discount: myLevel.bonus[2].discount
              })
            }
            //显示界面
            that.setData({
              inited: true,
            })
          })
      })
  },
  /**
   * 购买会员套餐按钮点击事件
   */
  onPayButtonClick: function(event) {
    //如果用户积分不够支付，提示
    if (this.data.myInfo.point < this.data.price - this.data.discount) {
      wx.showModal({
        content: '很抱歉，你的积分不足，无法购买',
        showCancel: false,
      })
    } else {
      var that = this
      //支付操作，需要弹出确认支付窗口进行二次确认
      wx.showModal({
        title: '积分支付',
        content: '你即将支付p' + (this.data.price - this.data.discount).toString(),
        confirmText: "确认",
        cancelText: "取消",
        success: function(res) {
          //用户确认支付
          if (res.confirm) {
            //页面提示支付中
            wx.showLoading({
              title: '支付中',
            })
            //调用云函数执行购买会员操作
            wx.cloud.callFunction({
              name: 'payMembership',
              data: {
                membershipPlanId: that.data.selectedId,
                formId: event.detail.formId //用于发送模板消息，详见https://developers.weixin.qq.com/miniprogram/dev/api-backend/templateMessage.send.html
              },
              success: function(res) {
                //根据云函数返回值，决定显示支付成功、支付失败或其他提示
                if (res.result.data == true) {
                  that.setData({
                    showPaySuccess: true
                  })
                } else if (res.result.errMsg == "很抱歉，你的积分不足，无法购买") {
                  wx.showModal({
                    content: '很抱歉，你的积分不足，无法购买',
                    showCancel: false,
                  })
                } else {
                  that.setData({
                    showPayFaild: true
                  })
                }
              },
              fail: function(err) {
                //调用云函数失败，显示支付失败提示界面
                console.log('onPayButtonClick---err' + JSON.stringify(err) + "\r\n")
                that.setData({
                  showPayFaild: true
                })
              },
              complete: function() {
                wx.hideLoading(); //关闭支付中页面提示
              }
            })
          }
        }
      });
    }
  },
})