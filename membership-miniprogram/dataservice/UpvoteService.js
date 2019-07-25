// 初始化 云数据库
const db = wx.cloud.database()
const _ = db.command
//定义app用于获取全局变量中的用户openid
const app = getApp()

/**
 *点赞信息数据操作类
 *@class UpvoteService
 *@constructor
 */
class UpvoteService {
  /**
   * 构造函数
   */
  constructor() {
    this.listIndex = 0 //分页获取数据的当前页索引
    this.pageCount = 8 //每次分页获取多少数据    
  }

  /**
   * 从数据库获取用户点赞列表信息
   * @method getMyUpvoteList
   * @for UpvoteService
   * @param {bool} isReset 是否清空分页缓存
   * @param {function} successCallback(upvoteArray) 处理数据查询结果的回调函数
   * upvoteArray数据结构：
   * [{
   *    _id,
   *    _openid,
   *    date,
   *    noteId,
   *    autherOpenid
   * },]
   */
  getMyUpvoteList(isReset, successCallback) {
    var upvoteArray = []

    if (isReset) {
      //重置分页为初始值
      this.listIndex = 0
      this.pageCount = 8
    }

    //构造根据点赞者 OpenId 查询的查询条件
    var query = db.collection('upvote')
      .where({
        _openid: app.globalData.openid
      })

    //构造分页
    var offset = this.listIndex * this.pageCount
    //skip和limit的传入参数必须大于0
    if (offset === 0) {
      query = query
        .orderBy('date', 'desc') //按点赞时间倒序排序
        .limit(this.pageCount) //限制返回数量为 max 条
    } else {
      query = query
        .orderBy('date', 'desc') //按点赞时间倒序排序
        .skip(offset) // 跳过结果集中的前 offset 条，从第 offset + 1 条开始返回
        .limit(this.pageCount) //限制返回数量为 max 条
    }

    var that = this
    //执行数据库查询
    query
      .get()
      .then(res => {
        if (res.data.length > 0) {
          upvoteArray = res.data
            //分页显示的页码+1
            ++that.listIndex
        }
        //回调函数处理数据查询结果
        typeof successCallback == "function" && successCallback(upvoteArray)
      })
      .catch(err => {
        //跳转出错页面
        wx.redirectTo({
          url: '../../errorpage/errorpage'
        })
        console.error(err)
      })
  }

  /**
   * 从数据库获取我的笔记获得的点赞总数
   * @method getMyBeUpvotedNum
   * @for UpvoteService
   * @param {function} successCallback(num) 处理数据查询结果的回调函数
   * num: 我的笔记获得的点赞总数
   */
  getMyBeUpvotedNum(successCallback) {
    //执行数据库查询
    db.collection('upvote').where({
        autherOpenid: app.globalData.openid
      })
      .count()
      .then(res => {
        //回调函数处理数据查询结果
        typeof successCallback == "function" && successCallback(res.total)
      })
      .catch(err => {
        //跳转出错页面
        wx.redirectTo({
          url: '../../errorpage/errorpage'
        })
        console.error(err)
      })
  }

  /**
   * 从数据库获取用户是否点赞笔记
   * @method getMyUpvote
   * @for UpvoteService
   * @param {string} id 笔记id
   * @param {function} successCallback(isUpvoted) 处理数据查询结果的回调函数
   * isUpvoted: 用户是否点赞过该笔记
   */
  getMyUpvote(id, successCallback) {
    //执行数据库查询
    db.collection('upvote').where({
        noteId: id,
        _openid: app.globalData.openid,
      })
      .count()
      .then(res => {
        //回调函数处理数据查询结果
        typeof successCallback == "function" && successCallback(res.total > 0)
      })
      .catch(err => {
        //跳转出错页面
        wx.redirectTo({
          url: '../../errorpage/errorpage'
        })
        console.error(err)
      })
  }

  /**
   * 更新用户点赞笔记的记录
   * @method updateUpvote
   * @for UpvoteService
   * @param {string} noteId 笔记id
   * @param {string} autherOpenid 笔记作者Openid
   * @param {function} successCallback(isUpvoted) 处理数据查询结果的回调函数
   * isUpvoted: 用户是否已点赞该笔记
   */
  updateUpvote(noteId, autherOpenid, successCallback) {
    //执行数据库查询
    db.collection('upvote').where({
        noteId: noteId,
        _openid: app.globalData.openid,
      })
      .get()
      .then(res => {
        //回调函数处理数据查询结果
        if (res.data.length > 0) {
          //如果用户已点赞则删除点赞记录
          db.collection('upvote').doc(res.data[0]._id)
            .remove()
            .then(r => {
              //笔记点赞数-1
              db.collection('user_note').doc(noteId).update({
                  data: {
                    upvoteNum: _.inc(-1)
                  }
                })
                .then(r => {
                  typeof successCallback == "function" && successCallback(false)
                })
                .catch(err => {
                  //跳转出错页面
                  wx.redirectTo({
                    url: '../../errorpage/errorpage'
                  })
                  console.error(err)
                })
            })
            .catch(err => {
              //跳转出错页面
              wx.redirectTo({
                url: '../../errorpage/errorpage'
              })
              console.error(err)
            })
        } else {
          //如果用户未点赞则添加点赞记录
          db.collection('upvote')
            .add({
              data: {
                date: db.serverDate(),
                noteId: noteId,
                autherOpenid: autherOpenid
              }
            })
            .then(r => {
              //笔记点赞数+1
              db.collection('user_note').doc(noteId).update({
                  data: {
                    upvoteNum: _.inc(1)
                  }
                })
                .then(r => {
                  typeof successCallback == "function" && successCallback(true)
                })
                .catch(err => {
                  //跳转出错页面
                  wx.redirectTo({
                    url: '../../errorpage/errorpage'
                  })
                  console.error(err)
                })
            })
            .catch(err => {
              //跳转出错页面
              wx.redirectTo({
                url: '../../errorpage/errorpage'
              })
              console.error(err)
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

export default UpvoteService