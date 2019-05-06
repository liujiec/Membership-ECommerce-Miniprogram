// 初始化 云数据库
const db = wx.cloud.database()
const _ = db.command

/**
 *付费会员操作类
 *@class MembershipService
 *@constructor
 */
class MembershipService {
  /**
   * 构造函数
   */
  constructor() {}

  /**
   * 从数据库获取付费会员套餐类型信息
   * @method getMembershipPlans
   * @for MembershipService
   * @param {function} successCallback(payMembershipInfo) 处理数据查询结果的回调函数
   * payMembershipInfo示例数据：
   *   [{
   *    id: 1,
   *    title: "月卡会员",
   *    listPrice: 20000,
   *    price: 20000,
   *    validity: 1
   *   },]
   */
  getMembershipPlans(successCallback) {
    db.collection('membership_plan')
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

export default MembershipService