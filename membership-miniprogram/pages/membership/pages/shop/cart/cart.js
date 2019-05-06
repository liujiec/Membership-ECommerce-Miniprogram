//引用用户等级的数据库访问类
import LevelService from '../../../../../dataservice/LevelService.js'
var levelService = new LevelService()
//引用用户信息的数据库访问类
import UserService from '../../../../../dataservice/UserService.js'
var userService = new UserService()

//小M卡会员折扣
const MEMBERSHIPDISCOUNT = 0.7

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [], //购物车数据
    myLevel: {}, //用户等级
    myInfo: {}, //用户信息
    isMembershipExpired: true, //用户是否是小M卡会员（还在会员有效期中）
    discount: 1, //用户会员等级及小M卡会员对应的折扣比例
    totalPrice: 0, //购物车中的商品原价合计
    totalDiscountedPrice: 0, //购物车中的商品用户实际支付总价
    showPaySuccess: false, //是否支付成功
    showPayFaild: false, //是否支付失败
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取并设置用户及购物车信息数据
    this.setUserAndCartData()
  },

  /**
   * 获取并设置用户及购物车信息数据
   */
  setUserAndCartData: function() {
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
            var isMembershipExpired = myInfo.memberExpDate < new Date()
            that.setData({
              myLevel: myLevel,
              isMembershipExpired: isMembershipExpired,
              myInfo: myInfo
            })
            if (!isMembershipExpired) {
              //如果用户是在有效期的小M卡会员，设置小M卡会员折扣
              that.setData({
                discount: MEMBERSHIPDISCOUNT
              })
            } else if (myLevel.bonus.length == 3) {
              //如果用户不是小M卡会员，设置用户当前等级对应的折扣
              that.setData({
                discount: myLevel.bonus[1].discount
              })
            }
            //读取购物车数据
            that.initCart()
            //计算购物车中商品价格
            that.refreshPrice()
          })
      })
  },

  /**
   * 页面加载时读取用户本地缓存的购物车数据
   */
  initCart: function() {
    var value = wx.getStorageSync('cart');
    if (value) {
      this.setData({
        cart: value
      });
    }
  },

  /**
   * 清空购物车数据
   */
  clearCart: function() {
    this.setData({
      cart: []
    });
    //清空本地缓存
    wx.removeStorage({
      key: 'cart',
    })
  },

  /**
   * 删除购物车数据
   */
  deleteProductFromCart: function(event) {
    var productIndex = event.currentTarget.dataset.item.index
    var value = wx.getStorageSync('cart');
    if (value) {
      var product = value.filter(e => e.index == productIndex)
      if (product.length > 0) {
        var index = value.indexOf(product[0])
        if (index > -1) {
          //删除记录
          value.splice(index, 1)
          //更新显示数据
          this.setData({
            cart: value
          });
          //更新本地缓存
          wx.setStorage({
            key: "cart",
            data: value,
          })
          //更新购物车商品价格
          this.refreshPrice()
        }
      }
    }
  },

  /**
   * 刷新购物车商品价格
   */
  refreshPrice() {
    var totalPrice = 0
    var totalDiscountedPrice = 0
    var cart = this.data.cart
    for (var i in this.data.cart) {
      cart[i].price = parseInt(cart[i].price) //原价
      cart[i].discountedPrice = Math.ceil(cart[i].price * this.data.discount) //折扣价
      totalPrice += cart[i].price
      totalDiscountedPrice += Math.ceil(cart[i].price * this.data.discount)
    }
    this.setData({
      cart: cart,
      totalDiscountedPrice: totalDiscountedPrice,
      totalPrice: totalPrice
    });
  },

  /**
   * 结算按钮点击事件
   */
  onPayButtonClick: function(event) {
    //如果用户积分不够支付，提示
    if (this.data.myInfo.point < this.data.totalDiscountedPrice) {
      wx.showModal({
        content: '很抱歉，你的积分不足，无法购买',
        showCancel: false,
      })
    } else {
      var that = this
      //支付操作，需要弹出确认支付窗口进行二次确认
      wx.showModal({
        title: '积分支付',
        content: '你即将支付p' + this.data.totalDiscountedPrice.toString(),
        confirmText: "确认",
        cancelText: "取消",
        success: function(res) {
          //用户确认支付
          if (res.confirm) {
            //页面提示支付中
            wx.showLoading({
              title: '支付中',
            })
            var productsIndex = []
            for (var i in that.data.cart) {
              productsIndex.push(that.data.cart[i].index)
            }
            //调用云函数执行购买购物车中所有商品的操作
            wx.cloud.callFunction({
              name: 'payProduct',
              data: {
                productsIndex: productsIndex,
                formId: event.detail.formId //用于发送模板消息，详见https://developers.weixin.qq.com/miniprogram/dev/api-backend/templateMessage.send.html
              },
              success: function(res) {
                //根据云函数返回值，决定显示支付成功、支付失败或其他提示
                if (res.result.data == true) {
                  that.clearCart()
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
      })
    }
  },
})