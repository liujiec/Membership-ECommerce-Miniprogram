// 初始化 云数据库
const db = wx.cloud.database()
const _ = db.command

/**
 *用户已购买商品数据操作类
 *@class PaidService
 *@constructor
 */
class PaidService {
  /**
   * 构造函数
   */
  constructor() {}

  /**
   * 从数据库获取用户是否已购买商品
   * @method getPaidInfo
   * @for PaidService
   * @param {string} productIndex 商品id
   * @param {function} successCallback(paidInfo) 处理数据查询结果的回调函数
   * paidInfo数据结构：
   * {
   *     _id,
   *     _openid, 
   *     date,
   *     productIndex,
   *     price,
   *     paymentFee,
   *     discount,
   *     orderId
   * }
   */
  getPaidInfo(productIndex, successCallback) {
    //执行数据库查询
    db.collection('user_paid')
      .where({
        productIndex: productIndex
      })
      .get()
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
}

export default PaidService