//引用商品信息的数据库访问类
import ProductService from '../../../../../dataservice/ProductService.js'
var productService = new ProductService()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "", //用户输入的搜索内容
    searchedKeywords: [], //搜索历史记录
    hotSearchProducts: [], //热搜产品关键词
    suggestKeywords: [], //搜索联想关键词
    isNoMoreData: false, //记录是否已加载完所有分页数据
    inputFocused: false, //是否焦点在搜索输入框
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //设置热搜产品关键词
    this.setData({
      hotSearchProducts: productService.getHotSearchProducts()
    })
    //从本地缓存读取用户历史搜索记录
    this.initSearchedKeyword()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.isNoMoreData && !this.data.inputFocused) { //如果还有数据未加载完，则获取更多数据
      wx.showNavigationBarLoading() //在标题栏中显示加载
      this.getProductList(false)
    }
  },

  /**
   * 搜索框聚焦
   */
  inputFocus: function() {
    this.setData({
      inputFocused: true
    });
    this.refreshSuggestWords()
  },

  /**
   * 搜索框失去焦点
   */
  inputBlur: function() {
    this.setData({
      inputFocused: false
    });
  },

  /**
   * 清空搜索框
   */
  clearInput: function() {
    this.setData({
      inputVal: "",
      suggestKeywords: [],
    });
  },

  /**
   * 实时获取搜索内容
   */
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value,
    });
    this.refreshSuggestWords()
  },

  /**
   * 刷新搜索关键词
   */
  refreshSuggestWords: function() {
    var suggestWords = productService.getSuggestWords(this.data.inputVal)
    this.setData({
      suggestKeywords: suggestWords
    });
  },

  /**
   * 点击历史记录、热门搜索、联想关键词标签
   */
  onClickTags: function(e) {
    this.setData({
      inputVal: e.currentTarget.id,
    });
    this.onClickSearchButton()
  },

  /**
   * 点击搜索按钮
   */
  onClickSearchButton: function() {
    this.addSearchedKeyword(this.data.inputVal)
    this.setData({
      isNoMoreData: false, //重置数据全部加载完毕的标志
    });
    //页面回到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    //需要根据当前搜索关键词加载新的商品列表信息
    this.getProductList(true)
  },

  /**
   * 页面加载时读取搜索历史记录
   */
  initSearchedKeyword: function() {
    var value = wx.getStorageSync('searchedKeywords');
    if (value) {
      this.setData({
        searchedKeywords: value
      });
    }
  },

  /**
   * 添加搜索历史记录
   */
  addSearchedKeyword: function(text) {
    if (typeof(text) == "undefined" || text.length == 0) {
      return;
    }
    var value = wx.getStorageSync('searchedKeywords');
    if (value) {
      if (value.indexOf(text) < 0) {
        value.unshift(text);
      }
    } else {
      value = [];
      value.push(text);
    }
    //更新显示数据
    this.setData({
      searchedKeywords: value
    });
    //更新本地缓存
    wx.setStorage({
      key: "searchedKeywords",
      data: value,
    })
  },

  /**
   * 清空搜索历史记录
   */
  clearSearchedKeywords: function() {
    this.setData({
      searchedKeywords: []
    });
    //清空本地缓存
    wx.removeStorage({
      key: 'searchedKeywords',
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
   * 从数据库获取产品列表
   */
  getProductList(isPull) {
    var that = this
    wx.showNavigationBarLoading() //在标题栏中显示加载
    productService.getProductList(
      "",
      this.data.inputVal,
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
})