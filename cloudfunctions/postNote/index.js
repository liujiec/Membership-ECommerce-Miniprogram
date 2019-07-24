// 云函数入口文件
// 部署：在 cloud-functions/postNote 文件夹右击选择 “上传并部署”
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()
const db = cloud.database()
const _ = db.command
const NOTEADDGROWTHVALUE = 1000

// 云函数入口函数
/**
 * 发表笔记
 * @param {data} 要发表的笔记内容
 * {
 *    data:{
 *      content,   //文字内容
 *      images     //已上传到云存储的图片内容
 *    }
 *  }
 * @return {object} 结果 
 * { 
 *    data,    //bool 发表笔记成功或失败
 *    errMsg   //如果发表笔记失败，该字段包含具体错误信息
 * }
 */

// 云函数入口函数
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
  //添加笔记
  var noteId = (await db.collection('user_note')
    .add({
      data: {
        _openid: wxContext.OPENID, //云函数添加数据不会自动插入openid，需要手动定义
        date: db.serverDate(),
        content: event.content,
        images: event.images,
        upvoteNum: 0
      }
    }))._id
  //添加成长值记录
  await db.collection('user_growth_value')
    .add({
      data: {
        _openid: wxContext.OPENID, //云函数添加数据不会自动插入openid，需要手动定义
        date: db.serverDate(),
        changeGrowthValue: NOTEADDGROWTHVALUE,
        operation: "发表笔记",
        timestamp: '',
        orderId: '',
        noteId: noteId
      }
    })
  var newGrowthValue = user.growthValue + NOTEADDGROWTHVALUE //新成长值
  //修改成长值
  var updateUserResult = await db.collection('user')
    .where({
      //云函数是在服务端操作，对所有用户的数据都有操作权限
      //在云函数中查询用户数据，需要添加openid的查询条件
      _openid: wxContext.OPENID
    })
    .update({
      data: {
        growthValue: newGrowthValue
      }
    })
  if (updateUserResult.stats.updated == 1) {
    result = true

    //调用风控规则校验
    await cloud.callFunction({
      name: 'growthValueRiskControl',
      data: {
        openid: wxContext.OPENID
      }
    })
  } else {
    errMsg = "系统异常，如有疑问请联系客服"
  }
  return {
    data: result,
    errMsg: errMsg
  }
}