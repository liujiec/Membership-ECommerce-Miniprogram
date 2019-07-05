// 初始化 云数据库
const db = wx.cloud.database()
const _ = db.command
//引用时间格式化工具
const util = require('../utils/util.js')

/**
 *积分数据操作类
 *@class PointService
 *@constructor
 */
class PointService {
  /**
   * 构造函数
   */
  constructor() {
    this.listIndex = 0 //分页获取数据的当前页索引
    this.pageCount = 12 //每次分页获取多少数据
  }

  /**
   * 从数据库获取用于显示的积分变动列表信息
   * @method getPointChangeList
   * @for PointService
   * @param {string} type 需要获取的积分变动类型，增加-inc，减少-dec，全部-all
   * @param {bool} isReset 是否清空分页缓存
   * @param {function} successCallback(pointChangeArray) 处理数据查询结果的回调函数
   * pointChangeArray数据结构：
   * [{
   *     index,
   *     date,
   *     changePoints,
   *     operation
   * },]
   */
  getPointChangeList(type, isReset, successCallback) {
    var pointChangeArray = []

    if (type === undefined) {
      typeof successCallback == "function" && successCallback(pointChangeArray)
      return
    }

    if (isReset) {
      //重置分页为初始值
      this.listIndex = 0
      this.pageCount = 12
    }

    //构造查询条件
    var query = db.collection('user_point')
    //构造积分变动类型查询条件
    if (type == "inc") {
      query = query
        .where({
          changePoints: _.gte(0)
        })
    } else if (type == "dec") {
      query = query
        .where({
          changePoints: _.lt(0)
        })
    }

    //构造分页
    var offset = this.listIndex * this.pageCount
    //skip和limit的传入参数必须大于0
    if (offset === 0) {
      query = query
        .orderBy('date', 'desc') //按积分变动时间倒序排序
        .limit(this.pageCount) //限制返回数量为 max 条
    } else {
      query = query
        .orderBy('date', 'desc') //按积分变动时间倒序排序
        .skip(offset) // 跳过结果集中的前 offset 条，从第 offset + 1 条开始返回
        .limit(this.pageCount) //限制返回数量为 max 条
    }

    var that = this
    //执行数据库查询
    query
      .get()
      .then(res => {
        if (res.data.length > 0) {
          for (var i in res.data) {
            //构造用于列表显示的积分列表数据
            pointChangeArray.push({
              index: res.data[i]._id,
              date: util.formatTime(res.data[i].date),
              changePoints: res.data[i].changePoints,
              operation: res.data[i].operation
            })
          }
          //分页显示的页码+1
          ++that.listIndex
        }
        //回调函数处理数据查询结果
        typeof successCallback == "function" && successCallback(pointChangeArray)
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

export default PointService