// 云函数入口文件
// 部署：在 cloud-functions/growthValueRiskControl 文件夹右击选择 “上传并部署”
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()
const db = cloud.database()
const _ = db.command
const MAX_LIMIT = 100
const MAXSYNCWERUNPERDAY = 100000 //单日最大同步微信运动获得成长值数
const MAXPOSTNOTEPERDAY = 30000 //单日最大发表笔记获得成长值数

//格式化日期
const formatDate = date => {
  //将服务器时间转换为北京时间
  var localTime = date.getTime();
  var localOffset = date.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
  var utc = localTime + localOffset; //utc即GMT时间
  var wishTime = utc + (3600000 * 8); //offset 时区  中国为  8
  date = new Date(wishTime)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('/')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 云函数入口函数
/**
 * 成长值风控规则
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
exports.main = async(event, context) => {

  var result = false

  //首先获取所有成长值记录
  // 先取出集合记录总数
  const countResult = await db.collection('user_growth_value').where({
    _openid: event.openid
  }).count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('user_growth_value').where({
      _openid: event.openid
    }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有
  var allGrowthValueRecords = (await Promise.all(tasks)).reduce((acc, cur) => ({
    data: acc.data.concat(cur.data),
    errMsg: acc.errMsg,
  }))

  //计算每日同步微信运动增加的总成长值数
  var addGrowthValueGroupedByDate = new Array()
  for (var i in allGrowthValueRecords.data) {
    var item = allGrowthValueRecords.data[i]
    if (item.operation == "微信运动") {
      var timestamp = item.timestamp
      if (addGrowthValueGroupedByDate[timestamp] !== undefined) {
        addGrowthValueGroupedByDate[timestamp] += item.changeGrowthValue
      } else {
        addGrowthValueGroupedByDate[timestamp] = item.changeGrowthValue
      }
    }
  }

  //判断是否触发风控规则
  for (var key in addGrowthValueGroupedByDate) {
    if (addGrowthValueGroupedByDate[key] > MAXSYNCWERUNPERDAY) {
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
            event: 'SyncWeRunGrowthValue',
            maxLimit: MAXSYNCWERUNPERDAY,
            riskTime: key,
            riskVaule: addGrowthValueGroupedByDate[key]
          }
        })
      result = true
    }
  }

  //计算每日发表笔记增加的总成长值数
  addGrowthValueGroupedByDate = new Array()
  for (var i in allGrowthValueRecords.data) {
    var item = allGrowthValueRecords.data[i]
    if (item.operation == "发表笔记") {
      var date = formatDate(item.date)
      if (addGrowthValueGroupedByDate[date] !== undefined) {
        addGrowthValueGroupedByDate[date] += item.changeGrowthValue
      } else {
        addGrowthValueGroupedByDate[date] = item.changeGrowthValue
      }
    }
  }

  //判断是否触发风控规则
  for (var key in addGrowthValueGroupedByDate) {
    if (addGrowthValueGroupedByDate[key] > MAXPOSTNOTEPERDAY) {
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
            event: 'PostNoteGrowthValue',
            maxLimit: MAXPOSTNOTEPERDAY,
            riskTime: key,
            riskVaule: addGrowthValueGroupedByDate[key]
          }
        })
      result = true
    }
  }

  return {
    data: result
  }
}