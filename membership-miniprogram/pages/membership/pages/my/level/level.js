//引用用户等级的数据库访问类
import LevelService from '../../../../../dataservice/LevelService.js'
var levelService = new LevelService()
//引用用户信息的数据库访问类
import UserService from '../../../../../dataservice/UserService.js'
var userService = new UserService()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    levels: [], //成长体系中的所有成长等级列表
    myLevel: {},  //用户等级
    myInfo: {}, //用户信息
    growthValueToNextLevel: -1, //用户还需要多长成长值才能升到下一级
    selectedLevel: {}, //用户当前选中的成长等级信息
    nextLevel: undefined, //用户当前等级的下一等级信息
    selectedId: 1, //用户当前选中的成长等级id
    inited: false, //是否已从数据库读取数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    levelService.getLevelList(
      //获取成长体系中的所有成长等级回调函数
      function(levelList) {
        var levels = levelList
        userService.getUserInfo(
          //获取用户信息回调函数
          function(userinfo) {
            var myInfo = userinfo
            that.setLevelData(levels, myInfo)
          })
      })
  },

  /**
   * 设置用户等级信息
   */
  setLevelData: function(levels, myInfo) {
    var that = this
    var myLevel = levels.filter(e => e.minGrowthValue <= myInfo.growthValue && myInfo.growthValue <= e.maxGrowthValue )[0]
    that.setData({
      levels: levels,
      myLevel: myLevel,
      myInfo: myInfo,
      selectedId: myLevel.id,
      selectedLevel: levels[myLevel.id - 1]
    })
    var nextLevel = levels.filter(e => e.id == myLevel.id + 1)[0]
    if (nextLevel !== undefined) {
      that.setData({
        growthValueToNextLevel: nextLevel.minGrowthValue - myInfo.growthValue,
        nextLevel: nextLevel
      })
    }
    //显示界面
    that.setData({
      inited: true
    })
  },

  /**
   * 用户点击成长体系中的某一成长等级事件
   */
  onLevelItemClick: function(event) {
    var id = event.currentTarget.dataset.item.id;
    //如果切换成长等级才响应
    if (this.data.selectedId != id) {
      this.setData({
        selectedId: id,
        selectedLevel: this.data.levels[id - 1]
      });
    }
  },
})