/**
 * 商品分类数据
 */
var productData = require("../../data/json_data.js")

/**
 * 横向分类导航栏组件
 */
Component({

  /**
   * 组件的初始数据
   */
  data: {
    //分类数组
    categories: [{
      id: "0",
      title: "全部",
      isSelect: true
    }],
    //当前选中的分类id
    selectedId: "0"
  },

  /**
   * 组件生命周期函数-在组件实例进入页面节点树时执行
   */
  attached: function() {
    //读取分类数据
    this.setData({
      categories: productData.categories
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 分类item点击事件
     * @param {object} event 详见https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html
     */
    _onCategoryItemClick: function(event) {
      //获取用户点击的分类
      var id = event.currentTarget.dataset.item.id;
      //如果切换分类才响应
      if (this.data.selectedId != id) {
        var curIndex = 0;
        for (var i = 0; i < this.data.categories.length; i++) {
          if (id == this.data.categories[i].id) {
            this.data.categories[i].isSelect = true;
            curIndex = i;
          } else {
            this.data.categories[i].isSelect = false;
          }
        }
        //触发父组件的事件处理函数，详见https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html?search-key=triggerEvent
        this.triggerEvent('categoryChangeEvent', {
          selectedCategory: this.data.categories[curIndex].title
        }, {})
        //设置用户点击的分类
        this.setData({
          categories: this.data.categories,
          selectedId: id
        });
      }
    },
  }
})