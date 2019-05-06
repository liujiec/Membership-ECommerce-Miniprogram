// 初始化 云数据库
const db = wx.cloud.database()
const _ = db.command

/**
 * 用户等级规则数据操作类
 *@class LevelService
 *@constructor
 */
class LevelService {
  /**
   * 构造函数
   */
  constructor() {}

  /**
   * 从数据库获取用户等级规则列表信息
   * @method getLevelList
   * @for LevelService
   * @param {function} successCallback(levelList) 处理数据查询结果的回调函数
   * levelList示例数据：
   *  [{
   *      id: 2,
   *      title: "幼稚园",
   *      isSelect: false,
   *      minGrowthValue: 20000,
   *      maxGrowthValue: 49900,
   *      icon: "brown",
   *      bonus: [
   *          { name: "创作笔记", desc: ""
   *          },
   *          { name: "优享折扣", desc: "98折", discount: 0.98
   *          },
   *          { name: "会费立减", desc: "5千积分", discount: 5000
   *          }
   *        ]
   *   },]
   */
  getLevelList(successCallback) {
    db.collection('level')
      .get()
      .then(res => {
        //回调函数处理数据查询结果
        typeof successCallback == "function" && successCallback(res.data)
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

export default LevelService