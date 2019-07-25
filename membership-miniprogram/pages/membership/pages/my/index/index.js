//引用用户等级的数据库访问类
import LevelService from '../../../../../dataservice/LevelService.js'
var levelService = new LevelService()
//引用用户信息的数据库访问类
import UserService from '../../../../../dataservice/UserService.js'
var userService = new UserService()
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
    tabs: ["笔记", "赞过"], //定义navbar的选项卡
    myLevel: {}, //用户等级
    myInfo: {}, //用户信息
    myBeUpvotedNum: 0, //用户获赞数
    isMembershipExpired: true, //用户是否是小M卡会员（还在会员有效期中）
    cart: [], //购物车数据
    activeIndex: 0, //navbar的当前选中选项
    sliderOffset: 0, //weui的navbar参数
    sliderLeft: 0, //weui的navbar参数
    isNoMoreData: false, //记录是否已加载完所有分页数据
    inited: false, //是否已从数据库读取数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    //获取用户信息
    this.setUserData()
    //读取本地缓存的购物车数据
    this.initCart()
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
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //每次显示页面，需要刷新数据
    this.setUserData()
    this.initCart()
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
      //页面回到顶部
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
      //切换选项卡需要重新加载瀑布流数据
      this.getNoteList(true)
    }
  },

  /**
   * 页面加载时读取用户本地缓存的购物车数据
   */
  initCart: function() {
    var value = wx.getStorageSync('cart');
    if (value) {
      this.setData({
        cart: value
      });
    } else {
      this.setData({
        cart: []
      });
    }
  },

  /**
   * 获取并设置用户信息数据
   */
  setUserData: function() {
    var that = this
    levelService.getLevelList(
      //获取成长体系中的所有成长等级回调函数
      function(levelList) {
        var levels = levelList
        userService.getUserInfo(
          //获取用户信息回调函数
          function(userinfo) {
            var myInfo = userinfo
            upvoteService.getMyBeUpvotedNum(
              //获取文章获得点赞数回调函数
              function(num) {
                //设置用户信息
                var myLevel = levels.filter(e => e.minGrowthValue <= myInfo.growthValue && myInfo.growthValue <= e.maxGrowthValue)[0]
                var isMembershipExpired = myInfo.memberExpDate < new Date()
                that.setData({
                  myLevel: myLevel,
                  myInfo: myInfo,
                  myBeUpvotedNum: num,
                  isMembershipExpired: isMembershipExpired
                })
                //显示界面
                that.setData({
                  inited: true
                })
                //瀑布流显示我发表的笔记
                that.getNoteList(true)
              })
          })
      })
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
      //用户发表的笔记
      this.getMyNoteList(isPull)
    } else {
      //用户赞过的笔记
      this.getUpvotedNoteList(isPull)
    }
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