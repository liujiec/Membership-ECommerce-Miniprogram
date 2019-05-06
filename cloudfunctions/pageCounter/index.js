// 云函数入口文件
// 部署：在 cloud-functions/pageCounter 文件夹右击选择 “上传并部署”
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

// 初始化云数据库
const db = cloud.database()
const _ = db.command

// 云函数入口函数
/**
 * 更新并返回用户浏览网页的次数
 * @return {object}  
 * { 
 *    count,    //用户浏览网页的次数
 * }
 */
exports.main = async(event, context) => {
  //输出到云开发函数调用日志
  console.log(event)

  //获取微信用户信息
  const wxContext = cloud.getWXContext()

  //获取当前用户在数据库中的访问记录数据
  var record = await db.collection('counters')
    .where({
      _openid: wxContext.OPENID,
    }).get();
  console.log("existRecordCount: " + record.data.length)

  var pageViewCount = 1
  if (record.data.length > 0) {
    //如果存在记录，访问数加一
    await db.collection('counters')
      .where({
        _openid: wxContext.OPENID,
      }).update({
        data: {
          count: _.inc(1)
        }
      });
    pageViewCount = record.data[0].count + 1
  } else {
    //如果不存在记录，新建记录
    var result = await db.collection('counters').add({
      data: {
        _openid: wxContext.OPENID,
        count: 1
      }
    });
  }

  return {
    count: pageViewCount
  }
}