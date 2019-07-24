// 初始化 云数据库
const db = wx.cloud.database()
const _ = db.command
//引用时间格式化工具
const util = require('../utils/util.js')
//定义app用于获取全局变量中的用户openid
const app = getApp() 

/**
 *笔记数据操作类
 *@class NoteService
 *@constructor
 */
class NoteService {
  /**
   * 构造函数
   */
  constructor() {
    this.listIndex = 0 //分页获取数据的当前页索引
    this.pageCount = 8 //每次分页获取多少数据
  }

  /**
   * 从数据库获取笔记列表信息
   * @method getNoteList
   * @for NoteService
   * @param {string} openId 用户OpenId，为空查询全部用户
   * @param {bool} isReset 是否清空分页缓存
   * @param {function} successCallback(noteArray) 处理数据查询结果的回调函数
   * noteArray数据格式：
   * [{
   *     index,
   *     date,
   *     content,
   *     img,
   *     height,
   *     width,
   *     upvoteNum,
   *     type
   * },]
   */
  getNoteList(openId, isReset, successCallback) {
    var noteArray = []

    if (openId === undefined) {
      typeof successCallback == "function" && successCallback(noteArray)
      return
    }

    if (isReset) {
      //重置分页为初始值
      this.listIndex = 0
      this.pageCount = 8
    }

    //构造查询条件
    var query = db.collection('user_note')
    //构造根据openId查询
    if (openId != "") {
      query = query.where({
        _openid: openId
      })
    }

    //构造分页
    var offset = this.listIndex * this.pageCount
    //skip和limit的传入参数必须大于0
    if (offset === 0) {
      query = query
        .orderBy('date', 'desc') //按笔记发表时间倒序排序
        .limit(this.pageCount) //限制返回数量为 max 条
    } else {
      query = query
        .orderBy('date', 'desc') //按笔记发表时间倒序排序
        .skip(offset) // 跳过结果集中的前 offset 条，从第 offset + 1 条开始返回
        .limit(this.pageCount) //限制返回数量为 max 条
    }

    var that = this
    //执行数据库查询
    query
      .get()
      .then(res => {
        if (res.data.length > 0) {
          //构造用于瀑布流显示的笔记列表数据
          for (var i in res.data) {
            var img = ''
            var height = '300'
            var width = '300'
            if (res.data[i].images.length > 0) {
              img = res.data[i].images[0].url
              height = res.data[i].images[0].height
              width = res.data[i].images[0].width
            }
            noteArray.push({
              index: res.data[i]._id,
              date: util.formatTime(res.data[i].date).substring(5),
              content: res.data[i].content,
              img: img,
              height: height,
              width: width,
              upvoteNum: res.data[i].upvoteNum,
              type: 'note'
            })
          }
          //分页显示的页码+1
          ++that.listIndex
        }
        //回调函数处理数据查询结果
        typeof successCallback == "function" && successCallback(noteArray)
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
   * 根据笔记 ID 列表获取笔记列表信息
   * @method getNoteByIndex
   * @for NoteService
   * @param {string}} indexArray 笔记Id列表
   * @param {function} successCallback(noteArray) 处理数据查询结果的回调函数
   * noteArray数据格式：
   * [{
   *     index,
   *     date,
   *     content,
   *     img,
   *     height,
   *     width,
   *     upvoteNum,
   *     type
   * },]
   */
  getNotesByIndex(indexArray, successCallback) {
    var noteArray = []

    if (indexArray === undefined) {
      return noteArray
    }

    //执行数据库查询
    db.collection('user_note')
      .where({
        _id: _.in(indexArray)
      })
      .get()
      .then(res => {
        if (res.data.length > 0) {
          //构造用于瀑布流显示的笔记列表数据
          for (var i in res.data) {
            var img = ''
            var height = '300'
            var width = '300'
            if (res.data[i].images.length > 0) {
              img = res.data[i].images[0].url
              height = res.data[i].images[0].height
              width = res.data[i].images[0].width
            }
            noteArray.push({
              index: res.data[i]._id,
              date: util.formatTime(res.data[i].date).substring(5),
              content: res.data[i].content,
              img: img,
              height: height,
              width: width,
              upvoteNum: res.data[i].upvoteNum,
              type: 'note'
            })
          }
        }
        //回调函数处理数据查询结果
        typeof successCallback == "function" && successCallback(noteArray)
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
   * 根据笔记 ID 获取笔记信息
   * @method getNoteByIndex
   * @for NoteService
   * @param {string}} index 笔记Id
   * @param {function} successCallback(noteInfo) 处理数据查询结果的回调函数
   * noteInfo数据结构：
   *  {
   *     _id,
   *     images: [{
   *       url,
   *       width,
   *       height
   *     }],
   *     _openid,
   *     date,
   *     content,
   *     upvoteNum
   *   }
   */
  getNoteByIndex(index, successCallback) {
    db.collection('user_note').where({
        _id: index
      }).get()
      .then(res => {
        //回调函数处理数据查询结果
        if (res.data.length > 0) {
          res.data[0].date = util.formatTime(res.data[0].date)
          typeof successCallback == "function" && successCallback(res.data[0])
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

  /**
   * 添加用户笔记到数据库
   * @method postNote
   * @for NoteService
   * @param {string} content 笔记文字
   * @param {array} imageList 笔记图片地址列表
   * @param {function} successCallback() 处理数据查询结果的回调函数
   */
  postNote(content, imageList, successCallback) {
    var index = 0

    //构造包含图片高度宽度信息的数据格式
    var images = []
    for (var i in imageList) {
      images.push({
        url: imageList[i],
        width: 0,
        height: 0
      })
    }

    //构造笔记的数据格式
    var note = {
      content: content,
      images: images
    }

    if (images.length > 0) {
      //如果包含图片，先上传图片到云存储
      this._addImage(index, note, successCallback)
    } else {
      //如果不包含图片，直接添加笔记到数据库
      this._addNote(note, successCallback)
    }
  }

  /**
   * 私有方法-上传图片到云开发图片存储-递归调用
   * @method _addImage
   * @for NoteService
   * @param {string} index 当前上传图片的数组序号
   * @param {object} note 笔记
   * @param {function} successCallback() 处理数据查询结果的回调函数
   */
  _addImage(index, note, successCallback) {
    var that = this
    //先获取图片的高度宽度信息
    wx.getImageInfo({
      src: note.images[index].url,
      success(imageInfo) {
        note.images[index].width = imageInfo.width
        note.images[index].height = imageInfo.height
        //然后上传图片到云存储
        wx.cloud.uploadFile({
          cloudPath: 'user/note/images/' + app.globalData.openid + '/' + new Date().getTime().toString() + '.jpg', //云存储路径
          filePath: note.images[index].url, // 图片本地路径
        }).then(res => {
          note.images[index].url = res.fileID //笔记的图片URL保存为云存储地址
          if (index < note.images.length - 1) {
            //如果还有图片，先上传图片到云存储
            that._addImage(index + 1, note, successCallback)
          } else {
            //如果图片已全部上传到云存储，添加笔记到数据库
            that._addNote(note, successCallback)
          }
        }).catch(err => {
          //跳转出错页面
          wx.redirectTo({
            url: '../../errorpage/errorpage'
          })
          console.error(err)
        })
      },
      fail(err) {
        //跳转出错页面
        wx.redirectTo({
          url: '../../errorpage/errorpage'
        })
        console.error(err)
      }
    })
  }

  /**
   * 私有方法-发表笔记到云开发数据库
   * @method _addNote
   * @for NoteService
   * @param {object} note 笔记
   * @param {function} successCallback() 处理数据查询结果的回调函数
   */
  _addNote(note, successCallback) {
    //调用云函数执行发表笔记操作
    wx.cloud.callFunction({
      name: 'postNote',
      data: {
        content: note.content,
        images: note.images
      },
      success: function(res) {
        if (res.result.data == true) {
          //回调函数处理数据查询结果
          typeof successCallback == "function" && successCallback()
        } else {
          //跳转出错页面
          wx.redirectTo({
            url: '../../errorpage/errorpage'
          })
          console.error(err)
        }
      },
      fail: function(err) {
        //跳转出错页面
        wx.redirectTo({
          url: '../../errorpage/errorpage'
        })
        console.error(err)
      }
    })
  }
}

export default NoteService