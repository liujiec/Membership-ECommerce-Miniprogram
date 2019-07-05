// 初始化 云数据库
const db = wx.cloud.database()
const _ = db.command

/**
 * 产品数据操作类 
 */
class ProductService {

  constructor() {
    this.productData = require("../data/json_data.js")
    this.listIndex = 0 //分页获取数据的当前页索引
    this.pageCount = 8 //每次分页获取多少数据
  }

  /**
   * 从数据库获取用于显示的产品列表信息
   * @param {string} category 需要获取的数据的分类名称，值为“全部”获取全部分类
   * @param {string} keyword 需要获取的数据标题关键词
   * @param {bool} isReset 是否清空分页缓存
   * @param {function} successCallback(productArray) 处理数据查询结果的回调函数
   * productArray数据结构：
   * [{
   *     index,
   *     name,
   *     img,
   *     height,
   *     width,
   *     desc,
   *     price,
   *     type
   * },]
   */
  getProductList(category, keyword, isReset, successCallback) {
    var productArray = []

    if (category === undefined || keyword === undefined) {
      typeof successCallback == "function" && successCallback(productArray)
      return
    }

    if (isReset) {
      //重置分页为初始值
      this.listIndex = 0
      this.pageCount = 8
    }

    //构造查询条件
    var query = db.collection('product')
    //构造根据分类或标题关键词查询
    if (category != "全部" && category != "" && keyword != "") {
      query = query.where({
        secondcategory: db.RegExp({
          regexp: category,
          options: 'i',
        }),
        bookname: db.RegExp({
          regexp: '.*' + keyword + '.*',
          options: 'i',
        })
      })
    } else if (category != "全部" && category != "") {
      query = query.where({
        secondcategory: db.RegExp({
          regexp: category,
          options: 'i',
        })
      })
    } else if (keyword != "") {
      query = query.where({
        bookname: db.RegExp({
          regexp: '.*' + keyword + '.*',
          options: 'i',
        })
      })
    }

    //构造分页
    var offset = this.listIndex * this.pageCount
    //skip和limit的传入参数必须大于0
    if (offset === 0) {
      query = query
        .limit(this.pageCount) //限制返回数量为 max 条
    } else {
      query = query
        .skip(offset) // 跳过结果集中的前 offset 条，从第 offset + 1 条开始返回
        .limit(this.pageCount) //限制返回数量为 max 条
    }

    var that = this
    //执行数据库查询
    query
      .get()
      .then(res => {
        if (res.data.length > 0) {
          //构造用于瀑布流显示的商品列表数据
          for (var i in res.data) {
            productArray.push({
              index: res.data[i].index,
              name: res.data[i].bookname,
              img: res.data[i].smallcoverimg,
              height: res.data[i].smallcoverimgheight,
              width: res.data[i].smallcoverimgwidth,
              desc: res.data[i].desc,
              price: res.data[i].price,
              type: 'product'
            })
          }
          //分页显示的页码+1
          ++that.listIndex
        }
        //回调函数处理数据查询结果
        typeof successCallback == "function" && successCallback(productArray)
      }).catch(err => {
        //跳转出错页面
        wx.redirectTo({
          url: '../../errorpage/errorpage'
        })
        console.error(err)
      })
  }

  /**
   * 根据产品index获取产品信息
   * @method getProductByIndex
   * @for ProductService
   * @param {string}} index 产品Id
   * @param {function} successCallback(product) 处理数据查询结果的回调函数
   * product示例数据：
   *  {
   *    index: "2599",
   *    bookname: "Python深度学习",
   *    author: "[美]弗朗索瓦•肖莱...",
   *    price: "119.00",
   *    desc: "本书由Keras之父...",
   *    feature: "“本书在当前的...",
   *    authorinfo: "【作者简介】...",
   *    firstcategory: "计算机",
   *    secondcategory: "",
   *    thirdcategory: "",
   *    coverimg: "cloud://xxx",
   *    smallcoverimg: "cloud://xxx",
   *    catelog: [{
   *      name: "前言",
   *      index: "23171"
   *    },],
   *    smallcoverimgwidth: 231,
   *    smallcoverimgheight: 290,
   *    coverimgwidth: 700,
   *    coverimgheight: 879
   *  }
   */
  getProductByIndex(index, successCallback) {
    db.collection('product').where({
        index: index
      }).get()
      .then(res => {
        if (res.data.length > 0) {
          //回调函数处理数据查询结果
          typeof successCallback == "function" && successCallback(res.data[0])
        } else {
          //跳转出错页面
          wx.redirectTo({
            url: '../../errorpage/errorpage'
          })
        }
      })
      .catch(err => {
        //跳转出错页面
        wx.redirectTo({
          url: '../../errorpage/errorpage'
        })
        console.error(err)
      })
  }

  /**
   * 根据产品index数组获取产品列表信息
   * @method getProductsByIndex
   * @for ProductService
   * @param {string} productsIndex 产品index数组
   * @param {function} successCallback(productArray) 处理数据查询结果的回调函数
   * productArray示例数据：
   *  [{
   *    index: "2599",
   *    bookname: "Python深度学习",
   *    author: "[美]弗朗索瓦•肖莱...",
   *    price: "119.00",
   *    desc: "本书由Keras之父...",
   *    feature: "“本书在当前的...",
   *    authorinfo: "【作者简介】...",
   *    firstcategory: "计算机",
   *    secondcategory: "",
   *    thirdcategory: "",
   *    coverimg: "cloud://xxx",
   *    smallcoverimg: "cloud://xxx",
   *    catelog: [{
   *      name: "前言",
   *      index: "23171"
   *    },],
   *    smallcoverimgwidth: 231,
   *    smallcoverimgheight: 290,
   *    coverimgwidth: 700,
   *    coverimgheight: 879
   *  },]
   */
  getProductsByIndex(productsIndex, successCallback) {
    db.collection('product').where({
        index: _.in(productsIndex)
      }).get()
      .then(res => {
        //回调函数处理数据查询结果
        typeof successCallback == "function" && successCallback(res.data)
      })
      .catch(err => {
        //跳转出错页面
        wx.redirectTo({
          url: '../../errorpage/errorpage'
        })
        console.error(err)
      })
  }



  /**
   * 获取热搜产品关键词
   * @return {array} 热搜产品关键词string数组
   */
  getHotSearchProducts() {
    return this.productData.hotSearchProducts
  }

  /**
   * 获取搜索联想词
   * @param {string} keyword 用户输入的关键词
   * @return {array} 联想词string数组
   */
  getSuggestWords(keyword) {
    keyword = keyword.toLowerCase()
    return this.productData.suggestWords.filter(e => e.word.toLowerCase().indexOf(keyword) >= 0).slice(0, 8)
  }

}

export default ProductService