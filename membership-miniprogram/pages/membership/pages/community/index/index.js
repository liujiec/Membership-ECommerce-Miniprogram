//引用笔记的数据库访问类
import NoteService from '../../../../../dataservice/NoteService.js'
var noteService = new NoteService()
//引用点赞的数据库访问类
import UpvoteService from '../../../../../dataservice/UpvoteService.js'
var upvoteService = new UpvoteService()

const app = getApp() //定义app用于获取全局变量中的用户openid
var sliderWidth = 117; //weui的navbar需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["发现", "收藏", "我的"], //定义navbar的选项卡
    activeIndex: 0, //navbar的当前选中选项
    sliderOffset: 0, //weui的navbar参数
    sliderLeft: 0, //weui的navbar参数
    isNoMoreData: false, //记录是否已加载完所有分页数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    //初始化weui的navbar
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getNoteList(true)
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    //页面回到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    this.setData({
      isNoMoreData: false, //重置数据全部加载完毕的标志
    });
    this.getNoteList(true)
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.isNoMoreData) { //如果还有数据未加载完，则获取更多数据
      this.getNoteList(false)
    }
  },

  /**
   * navbar Click事件，切换Tab
   */
  navBarTabClick: function(e) {
    //如果切换Tab才响应
    if (e.currentTarget.id != this.data.activeIndex) {
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id, //记录navbar的当前选中选项
        isNoMoreData: false, //重置数据全部加载完毕的标志
      });
      //切换选项卡需要重新加载瀑布流数据
      this.getNoteList(true)
    }
  },

  /**
   * 填充数据到瀑布流组件
   */
  fillData: function(isPull, items) {
    if (items.length <= 0) {
      this.setData({
        isNoMoreData: true //设置数据全部加载完毕的标志
      })
    }
    wx.hideNavigationBarLoading() //完成停止加载
    var view = this.selectComponent('#waterFallView');
    view.fillData(isPull, items);
  },

  /**
   * 从数据库获取笔记列表
   */
  getNoteList(isPull) {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    if (this.data.activeIndex == 0) {
      //全部笔记
      this.getAllNoteList(isPull)
    } else if (this.data.activeIndex == 1) {
      //用户点赞过的笔记
      this.getUpvotedNoteList(isPull)
    } else {
      //用户发表的笔记
      this.getMyNoteList(isPull)
    }
  },

  /**
   * 从数据库获取全部笔记列表
   */
  getAllNoteList(isPull) {
    var that = this
    noteService.getNoteList(
      '',
      isPull,
      function(noteArray) {
        that.fillData(isPull, noteArray)
      })
  },

  /**
   * 从数据库获取我发表的笔记列表
   */
  getMyNoteList(isPull) {
    var that = this
    noteService.getNoteList(
      app.globalData.openid,
      isPull,
      function(noteArray) {
        that.fillData(isPull, noteArray)
      })
  },

  /**
   * 从数据库获取我赞过的笔记列表
   */
  getUpvotedNoteList(isPull) {
    var that = this
    //先分页获取我的点赞记录
    upvoteService.getMyUpvoteList(
      isPull,
      function(upvoteArray) {
        var indexArray = []
        for (var i in upvoteArray) {
          indexArray.push(upvoteArray[i].noteId)
        }
        //获取点赞记录对应的笔记具体内容
        noteService.getNotesByIndex(
          indexArray,
          function(noteArray) {
            that.fillData(isPull, noteArray)
          })
      })
  },
})