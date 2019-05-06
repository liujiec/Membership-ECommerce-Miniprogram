//引用商品信息的数据库访问类
import ProductService from '../../../../../dataservice/ProductService.js'
var productService = new ProductService()
//引用用户等级的数据库访问类
import LevelService from '../../../../../dataservice/LevelService.js'
var levelService = new LevelService()
//引用用户信息的数据库访问类
import UserService from '../../../../../dataservice/UserService.js'
var userService = new UserService()
//引用用户已购买商品的数据库访问类
import PaidService from '../../../../../dataservice/PaidService.js'
var paidService = new PaidService()

//小M卡会员折扣
const MEMBERSHIPDISCOUNT = 0.7

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myLevel: {}, //用户等级
    myInfo: {}, //用户信息
    isMembershipExpired: true, //用户是否是小M卡会员（还在会员有效期中）
    price: 0, //商品原价
    discount: 1, //用户会员等级及小M卡会员对应的折扣比例
    discountedPrice: 0, //用户实际支付的商品价格
    membershipPrice: 0, //小M卡会员价
    showPaySuccess: false, //是否支付成功
    showPayFaild: false, //是否支付失败
    productInfo: {}, //商品信息
    cart: [], //购物车数据
    isPaid: false, //用户是否已购买该商品
    isNoMoreData: false, //记录是否已加载完所有分页数据
    inited: false, //是否已从数据库读取数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //获取用户和商品信息
    this.setUserAndProductData(options.index)
    //读取购物车数据
    this.initCart()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //页面显示，需要刷新购物车数据
    this.initCart()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.isNoMoreData && !this.data.isPaid) { //如果还有相关商品未加载完，则获取更多数据
      this.getProductList(false)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    //自定义商品的转发内容，详见onShareAppMessage的官方说明文文档https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html
    return {
      title: this.data.productInfo.bookname,
      imageUrl: this.data.productInfo.coverimg,
      path: '/pages/membership/pages/shop/product/product?index=' + this.data.productInfo.index
    }
  },

  /**
   * 获取并设置用户及商品信息数据
   */
  setUserAndProductData: function(index) {
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
            //从数据库获取商品信息
            productService.getProductByIndex(
              index,
              function(productInfo) {
                //修改页面标题为商品名称
                wx.setNavigationBarTitle({
                  title: productInfo.bookname
                })
                //设置商品数据
                that.setData({
                  productInfo: productInfo,
                  price: parseInt(productInfo.price),
                  discountedPrice: Math.ceil(parseInt(productInfo.price) * that.data.discount),
                  membershipPrice: Math.ceil(parseInt(productInfo.price) * MEMBERSHIPDISCOUNT)
                })
                //查询商品是否已支付
                paidService.getPaidInfo(
                  productInfo.index,
                  function(paidInfo) {
                    if (paidInfo.length > 0) {
                      //显示已购买界面
                      that.setData({
                        isPaid: true
                      })
                    } else {
                      //显示购买界面
                      that.setData({
                        inited: true,
                      })
                      //获取相关商品
                      that.getProductList(true)
                    }
                    wx.hideNavigationBarLoading() //在标题栏中隐藏加that载
                  })
              })
          })
      })
  },

  /**
   * 填充数据到瀑布流组件
   */
  fillData: function(isPull, items) {
    var view = this.selectComponent('#waterFallView');
    view.fillData(isPull, items);
  },

  /**
   * 从数据库获取相关商品（与本商品同一分类的商品）列表
   */
  getProductList(isPull) {
    var that = this
    wx.showNavigationBarLoading() //在标题栏中显示加载
    productService.getProductList(
      this.data.productInfo.secondcategory, //本商品的分类
      "",
      isPull,
      function(productArray) {
        that.fillData(isPull, productArray)
        if (productArray.length <= 0) {
          that.setData({
            isNoMoreData: true //设置数据全部加载完毕的标志
          })
        }
        wx.hideNavigationBarLoading() //完成停止加载
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
    } else {
      this.setData({
        cart: []
      });
    }
  },

  /**
   * 添加商品到购物车
   */
  addCart: function() {
    var value = wx.getStorageSync('cart');
    if (value) {
      if (value.filter(e => e.index == this.data.productInfo.index).length <= 0) {
        value.unshift(this.data.productInfo);
      }
    } else {
      value = [];
      value.push(this.data.productInfo);
    }
    //更新显示数据
    this.setData({
      cart: value
    });
    //更新本地缓存
    wx.setStorage({
      key: "cart",
      data: value,
    })
    //提示已加入购物车,2秒后隐藏提示
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 2000
    });
  },

  /**
   * 购买会员套餐按钮点击事件
   */
  onPayButtonClick: function(event) {
    //如果用户积分不够支付，提示
    if (this.data.myInfo.point < this.data.discountedPrice) {
      wx.showModal({
        content: '很抱歉，你的积分不足，无法购买',
        showCancel: false,
      })
    } else {
      var that = this
      //支付操作，需要弹出确认支付窗口进行二次确认
      wx.showModal({
        title: '积分支付',
        content: '你即将支付p' + this.data.discountedPrice.toString(),
        confirmText: "确认",
        cancelText: "取消",
        success: function(res) {
          //用户确认支付
          if (res.confirm) {
            //页面提示支付中
            wx.showLoading({
              title: '支付中',
            })
            var productsIndex = [that.data.productInfo.index]
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