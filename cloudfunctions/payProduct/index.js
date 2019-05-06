// 云函数入口文件
// 部署：在 cloud-functions/payProduct 文件夹右击选择 “上传并部署”
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()
const db = cloud.database()
const _ = db.command
const MEMBERSHIPDISCOUNT = 0.7

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
 * 支付积分购买产品
 * @param {data} 要购买的商品信息
 * {
 *    data:{
 *      productsIndex,    //[] 用户购买的产品index数组
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
  //读取折扣
  var discount = 1
  var levels = (await db.collection('level').get()).data
  var userLevel = levels.filter(e => e.minGrowthValue <= user.growthValue && user.growthValue <= e.maxGrowthValue)[0]
  var isMembershipExpired = user.memberExpDate < new Date()
  if (!isMembershipExpired) {
    //设置小M卡会员折扣
    discount = MEMBERSHIPDISCOUNT
  } else if (userLevel.bonus.length == 3) {
    //设置用户等级对应的折扣
    discount = userLevel.bonus[1].discount
  }
  //读取购买的商品
  var products = (await db.collection('product')
    .where({
      index: _.in(event.productsIndex)
    })
    .get()).data

  //原价
  var totalPrice = 0
  //实际支付价格
  var paymentFee = 0
  for (var i in products) {
    totalPrice += parseInt(products[i].price)
    paymentFee += Math.ceil(parseInt(products[i].price) * discount)
  }
  if (user.point < paymentFee) {
    errMsg = "很抱歉，你的积分不足，无法购买"
  } else {
    //添加订单购买记录
    var orderId = (await db.collection('user_order')
      .add({
        data: {
          _openid: wxContext.OPENID, //云函数添加数据不会自动插入openid，需要手动定义
          date: db.serverDate(),
          productsIndex: event.productsIndex,
          totalPrice: totalPrice,
          paymentFee: paymentFee,
          discount: discount,
          memberExpDate: user.memberExpDate,
          userLevel: userLevel.id,
          userPoint: user.point,
          status: 'paid'
        }
      }))._id
    //添加已购买商品记录
    for (var i in products) {
      await db.collection('user_paid')
        .add({
          data: {
            _openid: wxContext.OPENID, //云函数添加数据不会自动插入openid，需要手动定义
            date: db.serverDate(),
            productIndex: products[i].index,
            price: parseInt(products[i].price),
            paymentFee: Math.ceil(parseInt(products[i].price) * discount),
            discount: discount,
            orderId: orderId
          }
        })
    }
    //添加积分支付记录
    await db.collection('user_point')
      .add({
        data: {
          _openid: wxContext.OPENID, //云函数添加数据不会自动插入openid，需要手动定义
          date: db.serverDate(),
          changePoints: -1 * paymentFee,
          operation: "购买商品",
          timestamp: '',
          orderId: orderId
        }
      })
    //添加成长值记录
    await db.collection('user_growth_value')
      .add({
        data: {
          _openid: wxContext.OPENID, //云函数添加数据不会自动插入openid，需要手动定义
          date: db.serverDate(),
          changeGrowthValue: paymentFee,
          operation: "购买商品",
          timestamp: '',
          orderId: orderId,
          noteId: ''
        }
      })
    var newPoint = user.point - paymentFee //支付后剩余积分
    var newGrowthValue = user.growthValue + paymentFee //支付后新成长值
    //修改会员积分和成长值
    var updateUserResult = await db.collection('user')
      .where({
        //云函数是在服务端操作，对所有用户的数据都有操作权限
        //在云函数中查询用户数据，需要添加openid的查询条件
        _openid: wxContext.OPENID
      })
      .update({
        data: {
          point: newPoint,
          growthValue: newGrowthValue
        }
      })
    if (updateUserResult.stats.updated == 1) {
      //发送模板消息，详见https://developers.weixin.qq.com/miniprogram/dev/api-backend/templateMessage.send.html
      var name = products[0].bookname
      if (products.length > 1){
        name = name + '等' + products.length.toString() + '件商品'
      }
      try {
        const result = await cloud.openapi.templateMessage.send({
          touser: wxContext.OPENID,
          page: '/pages/membership/pages/my/index/index',
          data: {
            keyword1: {
              value: name
            },
            keyword2: {
              value: formatTime(new Date())
            },
            keyword3: {
              value: paymentFee.toString() + '积分'
            },
            keyword4: {
              value: newPoint.toString() + '积分'
            }
          },
          templateId: 'gS97oBUmt6mk_1odD2JA9yAoX90Hw4CXw1GcnKBZdJU',
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