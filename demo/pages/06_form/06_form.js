import WxValidate from '../../utils/validate/WxValidate.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    email: '',
    tel: '',
    idcard: '',
    password: '',
    confirmPassword: '',
    gender: '',
    skills: '',
    publicInfo: false,
    date: '',
    countryIndex: '',
    textarea: '',
    isAgree: '',
    radio: [{
        name: '男',
        value: 'male',
        checked: !1,
      },
      {
        name: '女',
        value: 'female',
      },
    ],
    checkbox: [{
        name: 'HTML',
        value: '0001',
        checked: !1,
      },
      {
        name: 'CSS',
        value: '0002',
      },
      {
        name: 'JS',
        value: '0003',
      },
      {
        name: '小程序',
        value: '0004',
      },
    ],
    countries: ["中国", "美国", "英国"],
    error: "",
    errorMap: {}, //接收validate的所有错误，用于界面显示错误提示
    inputLength: 0 //textarea的输入字符数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initValidate()
    console.log(this.WxValidate)
  },

  /**
   * 显示表单错误提示
   */
  showTopTips: function() {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function() {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },

  /**
   * 点击提交表单时的前端验证
   */
  submitForm(e) {
    const params = e.detail.value

    console.log(params)

    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
      this.setErrorMap(this.WxValidate.errorList)
      this.setData({
        error: this.WxValidate.errorList[0].msg
      })
      this.showTopTips()
      return false
    }

    wx.showModal({
      title: '提交',
      content: '提交成功'
    })
  },

  /**
   * 表单的验证的规则
   */
  initValidate() {
    const rules = {
      name: {
        required: true,
        minlength: 2,
        maxlength: 4
      },
      email: {
        required: true,
        email: true
      },
      tel: {
        required: true,
        tel: true
      },
      idcard: {
        required: true,
        idcard: true
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 15
      },
      confirmPassword: {
        required: true,
        minlength: 6,
        maxlength: 15,
        equalTo: 'password'
      },
      gender: {
        required: true
      },
      skills: {
        required: true,
        skills: true
      },
      date: {
        required: true,
        date: true
      },
      countryIndex: {
        required: true
      },
      isAgree: {
        required: true
      },
      textarea: {
        maxlength: 200
      }
    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name: {
        required: '请输入姓名',
        minlength: '姓名最少2个字',
        maxlength: '姓名最多4个字'
      },
      email: {
        required: '请输入邮箱',
        email: '请输入正确的邮箱'
      },
      tel: {
        required: '请输入手机号',
        tel: '请输入正确的手机号'
      },
      idcard: {
        required: '请输入身份证号码',
        idcard: '请输入正确的身份证号码'
      },
      password: {
        required: '请输入新密码',
        minlength: '密码长度不少于6位',
        maxlength: '密码长度不多于15位'
      },
      confirmPassword: {
        required: '请输入确认密码',
        minlength: '密码长度不少于6位',
        maxlength: '密码长度不多于15位',
        equalTo: '确认密码和新密码保持一致'
      },
      gender: {
        required: '请选择性别'
      },
      skill: {
        required: '请选择至少一项技能'
      },
      date: {
        required: '请选择出生日期',
        date: '请选择正确的出生日期'
      },
      countryIndex: {
        required: '请选择国籍'
      },
      isAgree: {
        required: '请同意《相关条款》'
      },
      textarea: {
        maxlength: '个人介绍最多200个字'
      },
    }

    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)

    // 自定义验证规则
    this.WxValidate.addMethod('skills', (value, param) => {
      return this.WxValidate.optional(value) || (value.length >= 1)
    }, '请选择至少一项技能')
  },

  /**
   * 设置错误提示Map的值
   */
  setErrorMap: function(e) {
    var map = {}
    for (var index in e) {
      map[e[index].param] = e[index].msg.length > 0
    }
    this.setData({
      errorMap: map
    })
  },

  /**
   * 出生日期改变时刷新data中的值
   */
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 国籍改变时刷新data中的值
   */
  bindCountryChange: function(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },

  /**
   * radio改变时刷新data中的值
   */
  radioChange(e) {
    const value = e.detail.value
    const radio = this.data.radio
    const items = radio.map(n => {
      return Object.assign({}, n, {
        checked: n.value === value,
      })
    })
    console.log(items)
    this.setData({
      radio: items,
      gender: value,
    })
  },

  /**
   * checkbox改变时刷新data中的值
   */
  checkboxChange(e) {
    const values = e.detail.value
    const checkbox = this.data.checkbox
    const items = checkbox.map(n => {
      return Object.assign({}, n, {
        checked: values.includes(n.value),
      })
    })
    console.log(items)
    this.setData({
      checkbox: items,
      skills: values,
    })
  },

  /**
   * 阅读并同意条款勾选框改变时刷新data中的值
   */
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  
  /**
   * Textarea文本内容改变时刷新文本内容长度
   */
  bindTextareaInput: function(e) {
    this.setData({
      inputLength: e.detail.value.length
    });
  },
})