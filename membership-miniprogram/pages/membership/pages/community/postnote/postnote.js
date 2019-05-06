//引用笔记的数据库访问类
import NoteService from '../../../../../dataservice/NoteService.js'
var noteService = new NoteService()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [], //用户已选择的图片
    inputLength: 0 //用户输入文字的长度
  },

  /**
   * 计算用户输入的文字长度
   */
  bindTextareaInput: function(e) {
    this.setData({
      inputLength: e.detail.value.length
    });
  },

  /**
   * 发表笔记
   */
  postFormSubmit: function(e) {
    //页面提示发表中
    wx.showLoading({
      title: '发表中',
    })
    var content = e.detail.value.content
    noteService.postNote(
      content,
      this.data.imageList,
      function() {
        //关闭发表中的页面提示
        wx.hideLoading();
        //提示笔记发表成功
        wx.showToast({
          title: '发表笔记成功',
          icon: 'success',
          duration: 1500,
        });
        //1.5秒后自动返回笔记列表页
        setTimeout(function() {
          wx.navigateBack({
            delta: 1,
          })
        }, 1500)
      }
    )
  },

  /**
   * 用户选择照片
   */
  chooseImage() {
    const that = this
    wx.chooseImage({
      sourceType: ['camera', 'album'], //拍照和相册
      sizeType: ['compressed'], //压缩图片
      count: 8, //最多上传9张
      success(res) {
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },

  /**
   * 预览照片
   */
  previewImage(e) {
    const current = e.target.dataset.src
    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },
})