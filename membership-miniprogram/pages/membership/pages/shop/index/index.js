//引用商品信息的数据库访问类
import ProductService from '../../../../../dataservice/ProductService.js'
var productService = new ProductService()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedCategory: "全部", //用户当前选择的分类
    isNoMoreData: false, //记录是否已加载完所有分页数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getProductList(true)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //页面回到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    this.setData({
      isNoMoreData: false, //重置数据全部加载完毕的标志
    });
    this.getProductList(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.isNoMoreData) { //如果还有数据未加载完，则获取更多数据
      this.getProductList(false)
    }
  },

  /**
   * 填充数据到瀑布流组件
   */
  fillData: function(isPull, items) {
    var view = this.selectComponent('#waterFallView');
    view.fillData(isPull, items);
  },

  /**
   * 从数据库获取产品列表
   */
  getProductList(isPull) {
    var that = this
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //从数据库获取用户选中分类的商品列表信息
    productService.getProductList(
      this.data.selectedCategory,
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
   * 响应分类导航栏组件的分类点击事件
   */
  oncategoryChangeEvent(e) {
    this.setData({
      selectedCategory: e.detail.selectedCategory,
      isNoMoreData: false, //重置数据全部加载完毕的标志
    });
    //页面回到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    //切换分类需要重新加载新分类的商品列表
    this.getProductList(true)
  },
})