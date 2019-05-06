const app = getApp()

/**
 * 当用户触发风控规则被锁定后的前端处理组件
 */
Component({

  /**
   * 组件生命周期函数-在组件实例进入页面节点树时执行
   */
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    created() {
      this._userLockedCheck()
    },
  },

  /**
   * 组件生命周期函数-在组件的父Page发生变化时执行
   */
  pageLifetimes: {
    // 页面被展示时执行
    show() {
      this._userLockedCheck()
    },
    // 页面尺寸变化时执行
    resize() {
      this._userLockedCheck()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 如果用户被锁定，则用户访问任何页面均跳转到用户被锁定的提示页面
     */
    _userLockedCheck: function () {
      if (app.globalData.isLocked) {
        wx.reLaunch({
          url: '/pages/membership/pages/userlockedpage/userlockedpage',
        })
      }
    },
  }
})
