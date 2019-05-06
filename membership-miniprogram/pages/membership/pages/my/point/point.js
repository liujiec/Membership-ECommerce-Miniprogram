//引用积分变动记录的数据库访问类
import PointService from '../../../../../dataservice/PointService.js'
var pointService = new PointService()

var sliderWidth = 96; //weui的navbar需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部", "增加", "减少"], //定义navbar的选项卡
    queryParam: ["all", "inc", "dec"], //对应选项卡的查询参数
    pointChangeRecords: [], //积分变化记录
    isNoMoreData: false, //记录是否已加载完所有分页数据
    activeIndex: 0, //navbar的当前选中选项
    sliderOffset: 0, //weui的navbar参数
    sliderLeft: 0, //weui的navbar参数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
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
    this.getPointList(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.isNoMoreData) { //如果还有数据未加载完，则获取更多数据
      this.getPointList(false)
    }
  },

  /**
   * Tab点击事件
   */
  tabClick: function(e) {
    //如果切换Tab才响应
    if (e.currentTarget.id != this.data.activeIndex) {
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id //记录navbar的当前选中选项
      });
      //切换选项卡需要重新加载数据
      this.getPointList(true)
    }
  },

  /**
   * 从数据库获取积分变动列表
   */
  getPointList(isTabChanged) {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    if (isTabChanged) {
      //切换选项卡清空数据
      this.setData({
        pointChangeRecords: [],
        isNoMoreData: false
      })
    }

    var pointChangeRecords = this.data.pointChangeRecords
    var that = this
    //从数据库获取用于显示的积分变动列表信息
    pointService.getPointChangeList(
      this.data.queryParam[this.data.activeIndex],
      isTabChanged,
      //处理数据库查询结果的回调函数
      function(pointChangeArray) {
        if (pointChangeArray.length > 0) {
          //将分页数据添加到列表显示的底部
          pointChangeRecords = pointChangeRecords.concat(pointChangeArray)
          that.setData({
            pointChangeRecords: pointChangeRecords
          })
        } else {
          that.setData({
            isNoMoreData: true //设置数据全部加载完毕的标志
          })
        }
        wx.hideNavigationBarLoading() //完成停止加载
      })
  },
})