// 初始化 云数据库
const db = wx.cloud.database()
const _ = db.command

/**
 *用户信息数据操作类
 *@class UserService
 *@constructor
 */
class UserService {
  /**
   * 构造函数
   */
  constructor() {}

  /**
   * 从数据库获取用户信息
   * @method getUserInfo
   * @for UserService
   * @param {function} success_callback(userinfo) 处理数据查询结果的回调函数
   * userinfo数据结构：
   * {
   *    _id,
   *    _openid,
   *    date, //注册时间
   *    growthValue, //总成长值
   *    point, //可用积分
   *    memberExpDate,  //会员到期时间 Membership Expiration Date
   *    isLocked //是否因触发风控规则被锁定
   * }
   */
  getUserInfo(success_callback) {
    //执行数据库查询
    db.collection('user')
      .get()
      .then(res => {
        if (res.data.length > 0) {
          //回调函数处理数据查询结果
          typeof success_callback == "function" && success_callback(res.data[0])
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
}

export default UserService