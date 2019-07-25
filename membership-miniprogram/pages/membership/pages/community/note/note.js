//引用笔记的数据库访问类
import NoteService from '../../../../../dataservice/NoteService.js'
var noteService = new NoteService()
//引用点赞的数据库访问类
import UpvoteService from '../../../../../dataservice/UpvoteService.js'
var upvoteService = new UpvoteService()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteInfo: {}, //笔记信息
    isUpvoted: false, //用户是否已经点赞过该笔记
    maxHeight: 0, //笔记所有图片的最大高度，用于指定swiper组件的高度
    inited: false //是否已从数据库读取数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    noteService.getNoteByIndex(
      options.index, //笔记Id
      function(noteInfo) {
        //修改页面标题为笔记内容
        wx.setNavigationBarTitle({
          title: noteInfo.content.substring(0, 20)
        })
        if (noteInfo.images.length > 0) {
          var windowWidth = wx.getSystemInfoSync().windowWidth //获取手机屏幕的宽度信息
          var maxHeight = that.data.maxHeight
          for (var i in noteInfo.images) {
            //图片的最大宽度为手机屏幕宽度，如果图片宽度大于手机屏幕宽度要等比例缩放图片高度与宽度
            if (noteInfo.images[i].width > windowWidth) {
              noteInfo.images[i].height = noteInfo.images[i].height * windowWidth / noteInfo.images[i].width
              noteInfo.images[i].width = windowWidth
            }
            //获取笔记所有图片的最大高度
            if (maxHeight < noteInfo.images[i].height) {
              maxHeight = noteInfo.images[i].height
            }
          }
          that.setData({
            maxHeight: maxHeight,
          })
        }
        //获取用户是否已点赞笔记
        upvoteService.getMyUpvote(
          noteInfo._id,
          function(isUpvoted) {
            //设置笔记数据
            that.setData({
              noteInfo: noteInfo,
              isUpvoted: isUpvoted,
              inited: true
            })
          })
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    //自定义笔记的转发内容，详见onShareAppMessage的官方说明文文档https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html
    if (this.data.noteInfo.images.length > 0) {
      return {
        title: this.data.noteInfo.content.substring(0, 20),
        imageUrl: this.data.noteInfo.images[0],
        path: '/pages/membership/pages/community/note/note?index=' + this.data.noteInfo._id
      }
    } else {
      return {
        title: this.data.noteInfo.content.substring(0, 20),
        path: '/pages/membership/pages/community/note/note?index=' + this.data.noteInfo._id
      }
    }
  },

  /**
   * 用户点击点赞图标
   */
  onUpvoteClick: function() {
    var that = this
    var noteInfo = that.data.noteInfo
    //更新用户点赞行为到数据库
    upvoteService.updateUpvote(
      noteInfo._id,
      noteInfo._openid,
      function(isUpvoted) {
        //如果用户未点赞，则点赞数加一，并显示用户已点赞
        if (isUpvoted) {
          ++noteInfo.upvoteNum
          //如果用户已点赞，则点赞数减一，并显示用户未点赞
        } else {
          --noteInfo.upvoteNum
        }
        //更新页面显示数据
        that.setData({
          noteInfo: noteInfo,
          isUpvoted: isUpvoted
        })
      })
  },
})