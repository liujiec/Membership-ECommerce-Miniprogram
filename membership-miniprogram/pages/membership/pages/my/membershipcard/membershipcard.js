//引用用户信息的数据库访问类
import UserService from '../../../../../dataservice/UserService.js'
var userService = new UserService()

//引用时间格式化工具
const util = require('../../../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myInfo: {},
    isMembershipExpired: true, //用户是否是小M卡会员（还在会员有效期中）
    memberExpDate: '', //小M卡会员到期时间
    inited: false,  //是否已从数据库读取数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setUserData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {    
    //每次显示页面，需要刷新数据
    this.setUserData()
  },

  /**
   * 获取并设置用户信息数据
   */
  setUserData: function () {
    var that = this
    userService.getUserInfo(
      //获取用户信息回调函数
      function (userinfo) {
        var myInfo = userinfo
        //设置用户信息
        var isMembershipExpired = myInfo.memberExpDate < new Date()
        that.setData({
          myInfo: myInfo,
          isMembershipExpired: isMembershipExpired,
          memberExpDate: util.formatDate(myInfo.memberExpDate)
        })
        //显示界面
        that.setData({
          inited: true
        })
      })
  }
})