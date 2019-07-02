// 云函数入口文件
// 部署：在 cloud-functions/pointRiskControl 文件夹右击选择 “上传并部署”
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()
const db = cloud.database()
const _ = db.command
const MAX_LIMIT = 100
const MAXADDPOINTPERDAY = 100000 //单日最大获取积分数

// 云函数入口函数
/**
 * 积分风控规则
 * @param {data} 要进行风控规则检查的用户
 * {
 *    data:{
 *      openid   //由于本云函数是由服务端调用，而非小程序客户端调用， cloud.getWXContext()无法获取openid
 *    }
 *  }
 * @return {object} 风控规则运行结果 
 * { 
 *    data,    //bool true表示触发风控规则，用户账户锁定并记录风控日志 false表示正常
 * }
 */
exports.main = async (event, context) => {

  var result = false

  //首先获取所有积分记录
  // 先取出集合记录总数
  const countResult = await db.collection('user_point').where({
    _openid: event.openid,
    changePoints: _.gte(0)
  }).count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('user_point').where({
      _openid: event.openid,
      changePoints: _.gte(0)
    }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有
  var allPointRecords = (await Promise.all(tasks)).reduce((acc, cur) => ({
    data: acc.data.concat(cur.data),
    errMsg: acc.errMsg,
  }))

  //计算每日增加的总积分数
  var addPointGroupedByDate = new Array()
  for (var i in allPointRecords.data) {
    var item = allPointRecords.data[i]
    var timestamp = item.timestamp
    if (addPointGroupedByDate[timestamp] !== undefined){
      addPointGroupedByDate[timestamp] += item.changePoints
    }else{
      addPointGroupedByDate[timestamp] = item.changePoints
    }
  }

  //判断是否触发风控规则
  for (var key in addPointGroupedByDate){
    if (addPointGroupedByDate[key] > MAXADDPOINTPERDAY){
      //触发风控规则，锁定账号
      await db.collection('user')
        .where({
          _openid: event.openid
        })
        .update({
          data: {
            isLocked: true
          }
        })
      //记录风控异常日志
      await db.collection('risk')
        .add({
          data: {
            _openid: event.openid,
            date: db.serverDate(),
            event: 'Point',
            maxLimit: MAXADDPOINTPERDAY,
            riskTime: key,
            riskVaule: addPointGroupedByDate[key]
          }
        })
      result = true
    }
  }

  return {
    data: result
  }
}