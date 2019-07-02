// 云函数入口文件
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

// 云函数入口函数
/**
 * 获取当前用户的OpenId、锁定标志并自动注册
 * @return {object} 用户信息
 * {
 *    openid, //当前用户的openid
 *    isLocked //当前用户的锁定标志
 * }
 */
exports.main = async(event, context) => {
  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()

  const db = cloud.database()
  const _ = db.command

  //如果用户是第一次打开小程序，自动注册
  var queryResult = (await db.collection('user')
    .where({
      //云函数是在服务端操作，对所有用户的数据都有操作权限
      //在云函数中查询用户数据，需要添加openid的查询条件
      _openid: wxContext.OPENID
    })
    .count()).total
  if (queryResult <= 0) {
    await db.collection('user').add({
      data: {
        _openid: wxContext.OPENID, //云函数添加数据不会自动插入openid，需要手动定义
        date: db.serverDate(),
        growthValue: 0, //成长值
        point: 0, //可用积分
        memberExpDate: new Date(1970, 1, 1),  //会员到期时间 Membership Expiration Date
        isLocked: false //是否因触发风控规则被锁定
      }
    })
  }

  //获取用户信息
  var userInfo = (await db.collection('user')
  .where({
    _openid: wxContext.OPENID
  })
  .get()).data[0]

  return {
    openid: wxContext.OPENID,
    isLocked: userInfo.isLocked
  }
}