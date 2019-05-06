/**
 * 全局变量
 */
var leftList = new Array(); //左侧集合
var rightList = new Array(); //右侧集合
var leftHight = 0, //左边一列的高度
  rightHight = 0, //右边一列的高度
  itemWidth = 0, //图片宽度
  maxHeight = 0; //每张图片的最大高度

/**
 * 瀑布流显示组件，参考https://www.jianshu.com/p/d9f8b48968c8实现
 */
Component({

  options: {
    //设置组件可以使用调用该组件的Page的样式，详见https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html
    styleIsolation: 'apply-shared'
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftList: [], //左侧集合
    rightList: [], //右侧集合
    itemWidth: 0 //图片宽度
  },

  /**
   * 组件生命周期函数-在组件实例进入页面节点树时执行
   */
  attached: function() {
    //根据手机的屏幕分辨率设置图片宽度和每张图片的最大高度
    wx.getSystemInfo({
      success: (res) => {
        var percentage = 750 / res.windowWidth;
        var margin = 60 / percentage;
        itemWidth = (res.windowWidth - margin) / 2;
        maxHeight = itemWidth / 0.5
      }
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 填充瀑布流数据
     * @param {bool} isPull 是否清空数据
     * @param {array} listData 在瀑布流末尾追加显示的多条数据
     *  [{
     *      index,  //记录id
     *      width,  //图片宽度
     *      height, //图片高度
     *      img,    //图片URL
     *      ...     //其他需要在模板中显示的内容
     *},]
     */
    fillData: function(isPull, listData) {
      this.setData({
        itemWidth: itemWidth
      })
      if (isPull) {
        //清空已加载的数据
        leftList.length = 0;
        rightList.length = 0;
        leftHight = 0;
        rightHight = 0;
      }
      
      for (var i = 0, len = listData.length; i < len; i++) {
        var tmp = listData[i];
        //计算每张图片的高度和宽度
        tmp.width = parseInt(tmp.width);
        tmp.height = parseInt(tmp.height);
        tmp.itemWidth = itemWidth
        var per = tmp.width / tmp.itemWidth;
        tmp.itemHeight = tmp.height / per;
        if (tmp.itemHeight > maxHeight) {
          tmp.itemHeight = maxHeight;
        }
        //计算并将每条数据放入瀑布流的左列或右列显示
        if (leftHight == rightHight) {
          leftList.push(tmp);
          leftHight = leftHight + tmp.itemHeight;
        } else if (leftHight < rightHight) {
          leftList.push(tmp);
          leftHight = leftHight + tmp.itemHeight;
        } else {
          rightList.push(tmp);
          rightHight = rightHight + tmp.itemHeight;
        }
      }
      //设置更新后的瀑布流数据，刷新瀑布流显示
      this.setData({
        leftList: leftList,
        rightList: rightList,
      });
    },
  }
})