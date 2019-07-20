//引用订单的数据库访问类
import OrderService from '../../../../../dataservice/OrderService.js'
var orderService = new OrderService()
//引用商品的数据库访问类
import ProductService from '../../../../../dataservice/ProductService.js'
var productService = new ProductService()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [], //订单记录列表
    isNoMoreData: false, //记录是否已加载完所有分页数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getOrderList(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.isNoMoreData) { //如果还有数据未加载完，则获取更多数据
      this.getOrderList(false)
    }
  },

  /**
   * 从数据库获取订单列表
   */
  getOrderList(isReset) {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    var orders = this.data.orders
    var that = this
    //从数据库获取用订单列表信息
    orderService.getOrderList(
      isReset,
      //处理数据库查询结果的回调函数
      function(orderArray) {
        if (orderArray.length > 0) {
          //找出订单列表中的所有商品ID
          var productsIndex = []
          for (var i in orderArray) {
            for (var j in orderArray[i].productsIndex) {
              if (productsIndex.indexOf(orderArray[i].productsIndex[j]) < 0) {
                productsIndex.push(orderArray[i].productsIndex[j])
              }
            }
          }
          //由于订单中只包含商品ID，需要再从数据库获取所有商品的具体信息
          productService.getProductsByIndex(
            productsIndex,
            //处理数据库查询结果的回调函数
            function(productArray) {
              if (productArray.length > 0) {
                //设置每个订单的商品具体信息
                for (var i in orderArray) {
                  orderArray[i].products = []                
                  for (var j in orderArray[i].productsIndex) {
                    var filter = productArray.filter(e => e.index == orderArray[i].productsIndex[j])
                    if (filter.length > 0){
                      orderArray[i].products.push(filter[0])
                    }
                  }
                }
              }
              //将分页数据添加到列表显示的底部
              orders = orders.concat(orderArray)
              that.setData({
                orders: orders
              })
            })
        } else {
          that.setData({
            isNoMoreData: true //设置数据全部加载完毕的标志
          })
        }
        wx.hideNavigationBarLoading() //完成停止加载
      })
  },
})