// 云函数入口文件
// 部署：在 cloud-functions/payMembership 文件夹右击选择 “上传并部署”
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()
const db = cloud.database()
const _ = db.command

//格式化时间
const formatTime = date => {
  //将服务器时间转换为北京时间
  var localTime = date.getTime();
  var localOffset = date.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
  var utc = localTime + localOffset; //utc即GMT时间
  var wishTime = utc + (3600000 * 8); //offset 时区  中国为  8
  date = new Date(wishTime)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 云函数入口函数
/**
 * 支付积分购买会员套餐
 * @param {data} 要购买的会员套餐
 * {
 *    data:{
 *      membershipPlanId, //用户购买的套餐
 *      formId:  //用于发送模板消息
 *    }
 *  }
 * @return {object} 支付结果 
 * { 
 *    data,    //bool 支付成功或失败
 *    errMsg   //如果支付失败，该字段包含支付失败的具体错误信息
 * }
 */
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  var result = false
  var errMsg = ''

  //读取用户信息
  var user = (await db.collection('user')
    .where({
      //云函数是在服务端操作，对所有用户的数据都有操作权限
      //在云函数中查询用户数据，需要添加openid的查询条件
      _openid: wxContext.OPENID
    })
    .get()).data[0]
  //读取用户等级折扣
  var levels = (await db.collection('level').get()).data
  var userLevel = levels.filter(e => e.minGrowthValue <= user.growthValue && user.growthValue <= e.maxGrowthValue)[0]
  var discount = userLevel.bonus.length == 3 ? userLevel.bonus[2].discount : 0
  //读取购买的会员套餐
  var membershipPlan = (await db.collection('membership_plan')
    .where({
      id: event.membershipPlanId
    })
    .get()).data[0]
  //实际支付积分
  var paymentFee = membershipPlan.price - discount
  if (user.point < paymentFee) {
    errMsg = "很抱歉，你的积分不足，无法购买"
  } else {
    //添加积分支付记录
    await db.collection('user_point')
      .add({
        data: {
          _openid: wxContext.OPENID, //云函数添加数据不会自动插入openid，需要手动定义
          date: db.serverDate(),
          changePoints: -1 * paymentFee,
          operation: "购买会员",
          timestamp: '',
          orderId: ''
        }
      })

    var memberExpDate = user.memberExpDate //用户原会员有效期
    var validity = membershipPlan.validity //有效期延长月数（1月 = 30天）
    var newPoint = user.point - paymentFee //支付后剩余积分
    var fromDate = new Date() //如果会员已过期，从现在开始计算有效期
    if (memberExpDate > fromDate) {
      //如果会员未过期，从原有有效期增加
      fromDate = memberExpDate
    }
    var newMemberExpDate = new Date(fromDate.getTime() + 1000 * 60 * 60 * 24 * 30 * validity)
    //添加会员购买记录
    await db.collection('user_membership')
      .add({
        data: {
          _openid: wxContext.OPENID, //云函数添加数据不会自动插入openid，需要手动定义
          date: db.serverDate(),
          membershipPlanId: event.membershipPlanId,
          userLevel: userLevel.id,
          price: membershipPlan.price,
          discount: discount,
          paymentFee: paymentFee,
          fromDate: fromDate,
          toDate: newMemberExpDate
        }
      })
    //增加会员有效期
    var updateUserResult = await db.collection('user')
      .where({
        //云函数是在服务端操作，对所有用户的数据都有操作权限
        //在云函数中查询用户数据，需要添加openid的查询条件
        _openid: wxContext.OPENID
      })
      .update({
        data: {
          memberExpDate: newMemberExpDate,
          point: newPoint
        }
      })
    if (updateUserResult.stats.updated == 1) {
      //发送模板消息，详见https://developers.weixin.qq.com/miniprogram/dev/api-backend/templateMessage.send.html
      try {
        const result = await cloud.openapi.templateMessage.send({
          touser: wxContext.OPENID,
          page: '/pages/membership/pages/my/index/index',
          data: {
            keyword1: {
              value: membershipPlan.title
            },
            keyword2: {
              value: '已经成功开通'
            },
            keyword3: {
              value: formatTime(new Date())
            },
            keyword4: {
              value: formatTime(newMemberExpDate)
            },
            keyword5: {
              value: paymentFee.toString() + '积分'
            }
          },
          templateId: 'y4eB4rXIFWnUPC_hKNAaotjiHQd2XxuhWcjvdz5HPKE',
          formId: event.formId,
          //emphasisKeyword: 'keyword1.DATA'
        })
      } catch (err) {
        console.log(err)
      }
      result = true
    } else {
      errMsg = "支付异常，如有疑问请联系客服"
    }
  }

  return {
    data: result,
    errMsg: errMsg
  }
}