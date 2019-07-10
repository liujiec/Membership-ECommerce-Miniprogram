// learningdemo/pages/update_products/update_products.js
const productData = require("../../data/product_data.js")
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.updateProducts()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 上传商品数据
   */
  updateProducts: function() {
    var product = productData.products[this.data.index]
    this.setData({
      total: productData.products.length
    })
    this.checkUpdate(product)
  },
  checkUpdate: function (product) {
    var that = this
    db.collection('product').where({
      index: product.index
    }).get().then(res => {
      if (res.data.length <= 0) {
        that.updateSmallcoverimg(product)
      } else {
        var index = that.data.index
        that.setData({
          index: index + 1,
        })
        if (that.data.index < that.data.total - 1) {
          that.checkUpdate(productData.products[index + 1])
        }
      }
    }).catch(error => {
      // handle error
      console.log(error)
    })
  }, 
  updateSmallcoverimg: function(product) {
    var that = this
    wx.cloud.uploadFile({
      cloudPath: 'product/images/' + product.smallcoverimg,
      filePath: '/data/images/' + product.smallcoverimg, // 文件路径
    }).then(res => {
      // get resource ID
      product.smallcoverimg = res.fileID
      that.updateCoverimg(product)
    }).catch(error => {
      // handle error
      console.log(error)
    })    
  },
  updateCoverimg: function(product) {
    var that = this
    wx.cloud.uploadFile({
      cloudPath: 'product/images/' + product.coverimg,
      filePath: '/data/images/' + product.coverimg, // 文件路径
    }).then(res => {
      // get resource ID
      product.coverimg = res.fileID
      that.updateProduct(product)
    }).catch(error => {
      // handle error
      console.log(error)
    })
  },
  updateProduct: function(product) {
    var that = this
    db.collection('product').add({
      data: {
        index: product.index,
        bookname: product.bookname,
        author: product.author,
        price: parseInt(product.price) * 100,
        desc: product.desc,
        feature: product.feature,
        authorinfo: product.authorinfo,
        firstcategory: product.firstcategory,
        secondcategory: product.secondcategory,
        thirdcategory: product.thirdcategory,
        coverimg: product.coverimg,
        smallcoverimg: product.smallcoverimg,
        catelog: product.catelog,
        smallcoverimgwidth: product.smallcoverimgwidth,
        smallcoverimgheight: product.smallcoverimgheight,
        coverimgwidth: product.coverimgwidth,
        coverimgheight: product.coverimgheight
      }
    }).then(res => {
      var index = that.data.index
      that.setData({
        index: index + 1,
      })
      if (that.data.index < that.data.total - 1) {
        that.checkUpdate(productData.products[index + 1])
      }
    }).catch(error => {
      // handle error
      console.log(error)
    })
  }
})