/**
 * 商品分类数据
 */
var categories = [{
    id: "0",
    isSelect: true,
    title: "全部",
  },
  {
    id: "01",
    isSelect: false,
    title: "Web设计",
  },
  {
    id: "11",
    isSelect: false,
    title: "软件开发",
  },
  {
    id: "21",
    isSelect: false,
    title: "编程语言",
  },
  {
    id: "31",
    isSelect: false,
    title: "少儿编程",
  },
  {
    id: "41",
    isSelect: false,
    title: "游戏开发",
  },
  {
    id: "51",
    isSelect: false,
    title: "移动开发",
  },
  {
    id: "61",
    isSelect: false,
    title: "数据分析",
  },
  {
    id: "71",
    isSelect: false,
    title: "数据库",
  },
  {
    id: "81",
    isSelect: false,
    title: "软件管理及方法学",
  },
  {
    id: "91",
    isSelect: false,
    title: "程序员修炼",
  },
  {
    id: "101",
    isSelect: false,
    title: "操作系统",
  },
  {
    id: "111",
    isSelect: false,
    title: "网络与通信",
  },
  {
    id: "121",
    isSelect: false,
    title: "计算机数学",
  },
  {
    id: "131",
    isSelect: false,
    title: "人工智能",
  },
  {
    id: "141",
    isSelect: false,
    title: "计算机原理",
  },
  {
    id: "151",
    isSelect: false,
    title: "算法",
  },
  {
    id: "161",
    isSelect: false,
    title: "技术管理",
  },
  {
    id: "171",
    isSelect: false,
    title: "信息安全",
  },
  {
    id: "181",
    isSelect: false,
    title: "云计算",
  },
  {
    id: "191",
    isSelect: false,
    title: "SEO",
  },
  {
    id: "201",
    isSelect: false,
    title: "产业文化",
  },
  {
    id: "211",
    isSelect: false,
    title: "物联网",
  },
  {
    id: "221",
    isSelect: false,
    title: "数据结构",
  },
  {
    id: "231",
    isSelect: false,
    title: "系统设计",
  },
  {
    id: "241",
    isSelect: false,
    title: "图像处理"
  }
]


/**
 * 商品搜索页面的热搜关键词数据
 */
var hotSearchProducts = [
  "Python", "算法", "JavaScript", "机器学习", "Java", "数学", "C语言", "Linux"
]

/**
 * 商品搜索页面的实时搜索建议数据
 */
var suggestWords = [{
    word: "版",
    count: 120
  },
  {
    word: "第",
    count: 102
  },
  {
    word: "发",
    count: 80
  },
  {
    word: "开发",
    count: 72
  },
  {
    word: "2",
    count: 68
  },
  {
    word: "设计",
    count: 58
  },
  {
    word: "实战",
    count: 51
  },
  {
    word: "编程",
    count: 45
  },
  {
    word: "数据",
    count: 43
  },
  {
    word: "序",
    count: 40
  },
  {
    word: "程序",
    count: 37
  },
  {
    word: "指南",
    count: 36
  },
  {
    word: "3",
    count: 35
  },
  {
    word: "python",
    count: 32
  },
  {
    word: "学习",
    count: 32
  },
  {
    word: "析",
    count: 29
  },
  {
    word: "算法",
    count: 29
  },
  {
    word: "实践",
    count: 28
  },
  {
    word: "践",
    count: 28
  },
  {
    word: "基础",
    count: 25
  },
  {
    word: "础",
    count: 25
  },
  {
    word: "式",
    count: 24
  },
  {
    word: "教程",
    count: 23
  },
  {
    word: "分析",
    count: 22
  },
  {
    word: "android",
    count: 21
  },
  {
    word: "应用",
    count: 21
  },
  {
    word: "精通",
    count: 21
  },
  {
    word: "威",
    count: 19
  },
  {
    word: "计算",
    count: 19
  },
  {
    word: "程序设计",
    count: 19
  },
  {
    word: "入门",
    count: 19
  },
  {
    word: "权威",
    count: 19
  },
  {
    word: "和",
    count: 19
  },
  {
    word: "java",
    count: 18
  },
  {
    word: "图解",
    count: 17
  },
  {
    word: "c",
    count: 17
  },
  {
    word: "游戏",
    count: 16
  },
  {
    word: "员",
    count: 16
  },
  {
    word: "5",
    count: 16
  },
  {
    word: "程序员",
    count: 16
  },
  {
    word: "卷",
    count: 16
  },
  {
    word: "基础教程",
    count: 16
  },
  {
    word: "游",
    count: 16
  },
  {
    word: "模",
    count: 16
  },
  {
    word: "架",
    count: 16
  },
  {
    word: "戏",
    count: 15
  },
  {
    word: "深入",
    count: 15
  },
  {
    word: "机器",
    count: 15
  },
  {
    word: "javascript",
    count: 15
  },
  {
    word: "测试",
    count: 14
  },
  {
    word: "一",
    count: 14
  },
  {
    word: "web",
    count: 14
  },
  {
    word: "算机",
    count: 14
  },
  {
    word: "计算机",
    count: 14
  },
  {
    word: "模式",
    count: 13
  },
  {
    word: "据分析",
    count: 13
  },
  {
    word: "语言",
    count: 13
  },
  {
    word: "典",
    count: 13
  },
  {
    word: "软件",
    count: 13
  },
  {
    word: "技术",
    count: 12
  },
  {
    word: "到",
    count: 12
  },
  {
    word: "性能",
    count: 11
  },
  {
    word: "4",
    count: 11
  },
  {
    word: "艺术",
    count: 11
  },
  {
    word: "面",
    count: 11
  },
  {
    word: "艺",
    count: 11
  },
  {
    word: "络",
    count: 11
  },
  {
    word: "网络",
    count: 11
  },
  {
    word: "术",
    count: 11
  },
  {
    word: "实例",
    count: 11
  },
  {
    word: "科学",
    count: 11
  },
  {
    word: "架构",
    count: 10
  },
  {
    word: "发指",
    count: 10
  },
  {
    word: "ios",
    count: 10
  },
  {
    word: "制",
    count: 9
  },
  {
    word: "体",
    count: 9
  },
  {
    word: "订",
    count: 9
  },
  {
    word: "修订版",
    count: 9
  },
  {
    word: "维",
    count: 9
  },
  {
    word: "安全",
    count: 9
  },
  {
    word: "linux",
    count: 9
  },
  {
    word: "代码",
    count: 9
  },
  {
    word: "结构",
    count: 9
  },
  {
    word: "修订",
    count: 9
  },
  {
    word: "面试",
    count: 8
  },
  {
    word: "构",
    count: 8
  },
  {
    word: "服务",
    count: 8
  },
  {
    word: "深度",
    count: 8
  },
  {
    word: "攻",
    count: 8
  },
  {
    word: "方法",
    count: 8
  },
  {
    word: "swift",
    count: 8
  },
  {
    word: "网站",
    count: 8
  },
  {
    word: "工程",
    count: 8
  },
  {
    word: "经典",
    count: 7
  },
  {
    word: "系统",
    count: 7
  },
  {
    word: "防",
    count: 7
  },
  {
    word: "优化",
    count: 7
  },
  {
    word: "试",
    count: 7
  },
  {
    word: "数据结构",
    count: 7
  },
  {
    word: "css",
    count: 7
  },
  {
    word: "d",
    count: 7
  },
  {
    word: "器",
    count: 7
  },
  {
    word: "理解",
    count: 7
  },
  {
    word: "学",
    count: 7
  },
  {
    word: "实现",
    count: 7
  },
  {
    word: "html",
    count: 7
  },
  {
    word: "html5",
    count: 7
  },
  {
    word: "入理",
    count: 7
  },
  {
    word: "掘",
    count: 6
  },
  {
    word: "英文",
    count: 6
  },
  {
    word: "敏",
    count: 6
  },
  {
    word: "捷",
    count: 6
  },
  {
    word: "驱动",
    count: 6
  },
  {
    word: "运",
    count: 6
  },
  {
    word: "r",
    count: 6
  },
  {
    word: "响应",
    count: 6
  },
  {
    word: "敏捷",
    count: 6
  },
  {
    word: "码",
    count: 6
  },
  {
    word: "原理",
    count: 6
  },
  {
    word: "项目",
    count: 6
  },
  {
    word: "spark",
    count: 6
  },
  {
    word: "unity",
    count: 6
  },
  {
    word: "最佳",
    count: 6
  },
  {
    word: "数学",
    count: 6
  },
  {
    word: "本",
    count: 6
  },
  {
    word: "意",
    count: 6
  },
  {
    word: "英文版",
    count: 6
  },
  {
    word: "必会",
    count: 5
  },
  {
    word: "攻防",
    count: 5
  },
  {
    word: "逆",
    count: 5
  },
  {
    word: "中文版",
    count: 5
  },
  {
    word: "必",
    count: 5
  },
  {
    word: "基于",
    count: 5
  },
  {
    word: "零",
    count: 5
  },
  {
    word: "200",
    count: 5
  },
  {
    word: "解析",
    count: 5
  },
  {
    word: "8",
    count: 5
  },
  {
    word: "现代",
    count: 5
  },
  {
    word: "向",
    count: 5
  },
  {
    word: "挖掘",
    count: 5
  },
  {
    word: "逆向",
    count: 5
  },
  {
    word: "中文",
    count: 5
  },
  {
    word: "创",
    count: 5
  },
  {
    word: "css3",
    count: 5
  },
  {
    word: "服务器",
    count: 5
  },
  {
    word: "农",
    count: 5
  },
  {
    word: "书",
    count: 5
  },
  {
    word: "c#",
    count: 5
  },
  {
    word: "挖",
    count: 5
  },
  {
    word: "docker",
    count: 5
  },
  {
    word: "管理",
    count: 5
  },
  {
    word: "个",
    count: 5
  },
  {
    word: "高效",
    count: 5
  },
  {
    word: "社会",
    count: 5
  },
  {
    word: "知",
    count: 5
  },
  {
    word: "自制",
    count: 5
  },
  {
    word: "js",
    count: 5
  },
  {
    word: "述",
    count: 5
  },
  {
    word: "并发",
    count: 4
  },
  {
    word: "x",
    count: 4
  },
  {
    word: "reactnative",
    count: 4
  },
  {
    word: "透",
    count: 4
  },
  {
    word: "描述",
    count: 4
  },
  {
    word: "拟",
    count: 4
  },
  {
    word: "核心",
    count: 4
  },
  {
    word: "级",
    count: 4
  },
  {
    word: "cocos",
    count: 4
  },
  {
    word: "团队",
    count: 4
  },
  {
    word: "范",
    count: 4
  },
  {
    word: "学习指南",
    count: 4
  },
  {
    word: "渗透",
    count: 4
  },
  {
    word: "http",
    count: 4
  },
  {
    word: "高级",
    count: 4
  },
  {
    word: "第一",
    count: 4
  },
  {
    word: "少儿",
    count: 4
  },
  {
    word: "户",
    count: 4
  },
  {
    word: "移",
    count: 4
  },
  {
    word: "6",
    count: 4
  },
  {
    word: "移动",
    count: 4
  },
  {
    word: "业",
    count: 4
  },
  {
    word: "未来",
    count: 4
  },
  {
    word: "联网",
    count: 4
  },
  {
    word: "期",
    count: 4
  },
  {
    word: "署",
    count: 4
  },
  {
    word: "使用",
    count: 4
  },
  {
    word: "略",
    count: 4
  },
  {
    word: "tensorflow",
    count: 4
  },
  {
    word: "sql",
    count: 4
  },
  {
    word: "部署",
    count: 4
  },
  {
    word: "快速",
    count: 4
  },
  {
    word: "智能",
    count: 4
  },
  {
    word: "动",
    count: 4
  },
  {
    word: "描",
    count: 4
  },
  {
    word: "化",
    count: 4
  },
  {
    word: "产品",
    count: 3
  },
  {
    word: "数",
    count: 3
  },
  {
    word: "openstack",
    count: 3
  },
  {
    word: "巧",
    count: 3
  },
  {
    word: "100",
    count: 3
  },
  {
    word: "go",
    count: 3
  },
  {
    word: "重构",
    count: 3
  },
  {
    word: "技巧",
    count: 3
  },
  {
    word: "证",
    count: 3
  },
  {
    word: "线程",
    count: 3
  },
  {
    word: "认证",
    count: 3
  },
  {
    word: "1",
    count: 3
  },
  {
    word: "oracle",
    count: 3
  },
  {
    word: "scala",
    count: 3
  },
  {
    word: "库",
    count: 3
  },
  {
    word: "ui",
    count: 3
  },
  {
    word: "小",
    count: 3
  },
  {
    word: "mysql",
    count: 3
  },
  {
    word: "进阶",
    count: 3
  },
  {
    word: "故事",
    count: 3
  },
  {
    word: "作",
    count: 3
  },
  {
    word: "解",
    count: 3
  },
  {
    word: "脚",
    count: 3
  },
  {
    word: "云",
    count: 3
  },
  {
    word: "阶",
    count: 3
  },
  {
    word: "人工智能",
    count: 3
  },
  {
    word: "人人",
    count: 3
  },
  {
    word: "人工",
    count: 3
  },
  {
    word: "用",
    count: 3
  },
  {
    word: "appinventor",
    count: 3
  },
  {
    word: "scratch",
    count: 3
  },
  {
    word: "创意",
    count: 3
  },
  {
    word: "node",
    count: 3
  },
  {
    word: "谈",
    count: 3
  },
  {
    word: "布",
    count: 3
  },
  {
    word: "tableau",
    count: 3
  },
  {
    word: "mariadb",
    count: 3
  },
  {
    word: "高性能",
    count: 3
  },
  {
    word: "益",
    count: 3
  },
  {
    word: "机",
    count: 3
  },
  {
    word: "基础设施",
    count: 3
  },
  {
    word: "虚",
    count: 3
  },
  {
    word: "施",
    count: 3
  },
  {
    word: "虚拟",
    count: 3
  },
  {
    word: "端",
    count: 3
  },
  {
    word: "思维",
    count: 3
  },
  {
    word: "函",
    count: 3
  },
  {
    word: "虚拟机",
    count: 3
  },
  {
    word: "工具",
    count: 3
  },
  {
    word: "即",
    count: 3
  },
  {
    word: "用户",
    count: 3
  },
  {
    word: "篇",
    count: 3
  },
  {
    word: "ccna",
    count: 3
  },
  {
    word: "企",
    count: 3
  },
  {
    word: "索",
    count: 3
  },
  {
    word: "译",
    count: 3
  },
  {
    word: "册",
    count: 3
  },
  {
    word: "编译",
    count: 3
  },
  {
    word: "appstore",
    count: 3
  },
  {
    word: "企业",
    count: 3
  },
  {
    word: "念",
    count: 3
  },
  {
    word: "微",
    count: 3
  },
  {
    word: "c++",
    count: 3
  },
  {
    word: "挑战",
    count: 3
  },
  {
    word: "精",
    count: 3
  },
  {
    word: "挑",
    count: 3
  },
  {
    word: "设施",
    count: 3
  },
  {
    word: "战",
    count: 3
  },
  {
    word: "函数",
    count: 3
  },
  {
    word: "黑客",
    count: 3
  },
  {
    word: "中",
    count: 3
  },
  {
    word: "力",
    count: 3
  },
  {
    word: "攻略",
    count: 3
  },
  {
    word: "react",
    count: 3
  },
  {
    word: "脚本",
    count: 3
  },
  {
    word: "bootstrap",
    count: 3
  },
  {
    word: "框架",
    count: 3
  },
  {
    word: "师",
    count: 3
  },
  {
    word: "大数",
    count: 3
  },
  {
    word: "法书",
    count: 3
  },
  {
    word: "softwaredesign",
    count: 3
  },
  {
    word: "从小",
    count: 3
  },
  {
    word: "github",
    count: 3
  },
  {
    word: "里",
    count: 3
  },
  {
    word: "牛",
    count: 3
  },
  {
    word: "大牛",
    count: 3
  },
  {
    word: "小白",
    count: 3
  },
  {
    word: "上",
    count: 3
  },
  {
    word: "家",
    count: 3
  },
  {
    word: "宝典",
    count: 3
  },
  {
    word: "全",
    count: 3
  },
  {
    word: "vue",
    count: 2
  },
  {
    word: "vue.js",
    count: 2
  },
  {
    word: "关卡",
    count: 2
  },
  {
    word: "客",
    count: 2
  },
  {
    word: "令行",
    count: 2
  },
  {
    word: "链",
    count: 2
  },
  {
    word: "工作",
    count: 2
  },
  {
    word: "区块",
    count: 2
  },
  {
    word: "命令",
    count: 2
  },
  {
    word: "金",
    count: 2
  },
  {
    word: "命令行",
    count: 2
  },
  {
    word: "原则",
    count: 2
  },
  {
    word: "页",
    count: 2
  },
  {
    word: "试题",
    count: 2
  },
  {
    word: "网页",
    count: 2
  },
  {
    word: "微软",
    count: 2
  },
  {
    word: "二",
    count: 2
  },
  {
    word: "软",
    count: 2
  },
  {
    word: "恶",
    count: 2
  },
  {
    word: "商",
    count: 2
  },
  {
    word: "tcp",
    count: 2
  },
  {
    word: "题",
    count: 2
  },
  {
    word: "ip",
    count: 2
  },
  {
    word: "亿",
    count: 2
  },
  {
    word: "恶意",
    count: 2
  },
  {
    word: "训",
    count: 2
  },
  {
    word: "恶意代码",
    count: 2
  },
  {
    word: "之路",
    count: 2
  },
  {
    word: "鱼",
    count: 2
  },
  {
    word: "构建",
    count: 2
  },
  {
    word: "elastic",
    count: 2
  },
  {
    word: "keras",
    count: 2
  },
  {
    word: "elasticsearch",
    count: 2
  },
  {
    word: "第一本",
    count: 2
  },
  {
    word: "本质",
    count: 2
  },
  {
    word: "组合",
    count: 2
  },
  {
    word: "手册",
    count: 2
  },
  {
    word: "我",
    count: 2
  },
  {
    word: "栈",
    count: 2
  },
  {
    word: "数值",
    count: 2
  },
  {
    word: "制作",
    count: 2
  },
  {
    word: "查找",
    count: 2
  },
  {
    word: "clojure",
    count: 2
  },
  {
    word: "小书",
    count: 2
  },
  {
    word: "互联网",
    count: 2
  },
  {
    word: "metasploit",
    count: 2
  },
  {
    word: "互联",
    count: 2
  },
  {
    word: "即用",
    count: 2
  },
  {
    word: "行",
    count: 2
  },
  {
    word: "postgresql",
    count: 2
  },
  {
    word: "一行",
    count: 2
  },
  {
    word: "ruby",
    count: 2
  },
  {
    word: "开源",
    count: 2
  },
  {
    word: "都是",
    count: 2
  },
  {
    word: "objective",
    count: 2
  },
  {
    word: "可视",
    count: 2
  },
  {
    word: "cocos2d-x",
    count: 2
  },
  {
    word: "持续",
    count: 2
  },
  {
    word: "objective-c",
    count: 2
  },
  {
    word: "知道",
    count: 2
  },
  {
    word: "视觉",
    count: 2
  },
  {
    word: "不知",
    count: 2
  },
  {
    word: "想录",
    count: 2
  },
  {
    word: "你",
    count: 2
  },
  {
    word: "随想",
    count: 2
  },
  {
    word: "网",
    count: 2
  },
  {
    word: "随想录",
    count: 2
  },
  {
    word: "从零开始",
    count: 2
  },
  {
    word: "斯",
    count: 2
  },
  {
    word: "媒体",
    count: 2
  },
  {
    word: "父",
    count: 2
  },
  {
    word: "开始",
    count: 2
  },
  {
    word: "处理",
    count: 2
  },
  {
    word: "凤凰",
    count: 2
  },
  {
    word: "周",
    count: 2
  },
  {
    word: "传奇",
    count: 2
  },
  {
    word: "经理",
    count: 2
  },
  {
    word: "特征",
    count: 2
  },
  {
    word: "物",
    count: 2
  },
  {
    word: "全攻",
    count: 2
  },
  {
    word: "趣味",
    count: 2
  },
  {
    word: "秘",
    count: 2
  },
  {
    word: "之",
    count: 2
  },
  {
    word: "宫",
    count: 2
  },
  {
    word: "统计",
    count: 2
  },
  {
    word: "南",
    count: 2
  },
  {
    word: "有趣",
    count: 2
  },
  {
    word: "解读",
    count: 2
  },
  {
    word: "验",
    count: 2
  },
  {
    word: "七",
    count: 2
  },
  {
    word: "专家",
    count: 2
  },
  {
    word: "世界",
    count: 2
  },
  {
    word: "体验",
    count: 2
  },
  {
    word: "编码",
    count: 2
  },
  {
    word: "髓",
    count: 2
  },
  {
    word: "105",
    count: 2
  },
  {
    word: "概念",
    count: 2
  },
  {
    word: "孩子",
    count: 2
  },
  {
    word: "自然",
    count: 2
  },
  {
    word: "电",
    count: 2
  },
  {
    word: "打印",
    count: 2
  },
  {
    word: "练",
    count: 2
  },
  {
    word: "3d",
    count: 2
  },
  {
    word: "探",
    count: 2
  },
  {
    word: "cio",
    count: 2
  },
  {
    word: "4a",
    count: 2
  },
  {
    word: "松",
    count: 2
  },
  {
    word: "合算",
    count: 2
  },
  {
    word: "轻松",
    count: 2
  },
  {
    word: "排序",
    count: 2
  },
  {
    word: "畅",
    count: 2
  },
  {
    word: "集成",
    count: 2
  },
  {
    word: "net",
    count: 2
  },
  {
    word: "django",
    count: 2
  },
  {
    word: "体系",
    count: 2
  },
  {
    word: "分析师",
    count: 2
  },
  {
    word: "系",
    count: 2
  },
  {
    word: "可视化",
    count: 2
  },
  {
    word: "asp",
    count: 2
  },
  {
    word: "发布",
    count: 2
  },
  {
    word: "之道",
    count: 2
  },
  {
    word: "jquery",
    count: 2
  },
  {
    word: "惯",
    count: 2
  },
  {
    word: "媒",
    count: 2
  },
  {
    word: "习惯",
    count: 2
  },
  {
    word: "中心",
    count: 2
  },
  {
    word: "零基",
    count: 2
  },
  {
    word: "征",
    count: 2
  },
  {
    word: "洞",
    count: 2
  },
  {
    word: "一线",
    count: 2
  },
  {
    word: "大话",
    count: 2
  },
  {
    word: "梦",
    count: 2
  },
  {
    word: "01",
    count: 2
  },
  {
    word: "一起",
    count: 2
  },
  {
    word: "擎",
    count: 2
  },
  {
    word: "块",
    count: 2
  },
  {
    word: "引擎",
    count: 2
  },
  {
    word: "题解",
    count: 2
  },
  {
    word: "索引",
    count: 2
  },
  {
    word: "道",
    count: 2
  },
  {
    word: "搜索",
    count: 2
  },
  {
    word: "一本",
    count: 2
  },
  {
    word: "搜索引擎",
    count: 2
  },
  {
    word: "半数",
    count: 2
  },
  {
    word: "openflow",
    count: 2
  },
  {
    word: "基本",
    count: 2
  },
  {
    word: "sdn",
    count: 2
  },
  {
    word: "pythonweb",
    count: 2
  },
  {
    word: "12",
    count: 2
  },
  {
    word: "不知道",
    count: 2
  },
  {
    word: "101",
    count: 2
  },
  {
    word: "flaskweb",
    count: 2
  },
  {
    word: "剖析",
    count: 2
  },
  {
    word: "必读",
    count: 2
  },
  {
    word: "node.js",
    count: 2
  },
  {
    word: "起",
    count: 2
  },
  {
    word: "配置",
    count: 2
  },
  {
    word: "构设",
    count: 2
  },
  {
    word: "置",
    count: 2
  },
  {
    word: "训练",
    count: 2
  },
  {
    word: "出",
    count: 2
  },
  {
    word: "容器",
    count: 2
  },
  {
    word: "浅",
    count: 2
  },
  {
    word: "hadoop",
    count: 2
  },
  {
    word: "深入浅出",
    count: 2
  },
  {
    word: "一个",
    count: 2
  },
  {
    word: "extjs",
    count: 2
  },
  {
    word: "java8",
    count: 2
  },
  {
    word: "核心技术",
    count: 2
  },
  {
    word: "交换",
    count: 2
  },
  {
    word: "路由",
    count: 2
  },
  {
    word: "数据库",
    count: 2
  },
  {
    word: "git",
    count: 2
  },
  {
    word: "密",
    count: 2
  },
  {
    word: "级数",
    count: 2
  },
  {
    word: "7",
    count: 2
  },
  {
    word: "a",
    count: 2
  },
  {
    word: "qt5",
    count: 1
  },
  {
    word: "方案",
    count: 1
  },
  {
    word: "以太",
    count: 1
  },
  {
    word: "控",
    count: 1
  },
  {
    word: "推荐",
    count: 1
  },
  {
    word: "访客",
    count: 1
  },
  {
    word: "javascriptweb",
    count: 1
  },
  {
    word: "打动",
    count: 1
  },
  {
    word: "乐趣",
    count: 1
  },
  {
    word: "内容",
    count: 1
  },
  {
    word: "svg",
    count: 1
  },
  {
    word: "站内",
    count: 1
  },
  {
    word: "精髓",
    count: 1
  },
  {
    word: "影响",
    count: 1
  },
  {
    word: "与会",
    count: 1
  },
  {
    word: "mongodb",
    count: 1
  },
  {
    word: "靠",
    count: 1
  },
  {
    word: "erlang",
    count: 1
  },
  {
    word: "可靠",
    count: 1
  },
  {
    word: "理工",
    count: 1
  },
  {
    word: "付",
    count: 1
  },
  {
    word: "配置管理",
    count: 1
  },
  {
    word: "上卷",
    count: 1
  },
  {
    word: "单元",
    count: 1
  },
  {
    word: "身边",
    count: 1
  },
  {
    word: "200-101",
    count: 1
  },
  {
    word: "unity5.x",
    count: 1
  },
  {
    word: "大智",
    count: 1
  },
  {
    word: "交付",
    count: 1
  },
  {
    word: "慧",
    count: 1
  },
  {
    word: "概率",
    count: 1
  },
  {
    word: "定义",
    count: 1
  },
  {
    word: "二进制",
    count: 1
  },
  {
    word: "总结",
    count: 1
  },
  {
    word: "二进",
    count: 1
  },
  {
    word: "迄今",
    count: 1
  },
  {
    word: "进制",
    count: 1
  },
  {
    word: "今",
    count: 1
  },
  {
    word: "洞悉",
    count: 1
  },
  {
    word: "领域",
    count: 1
  },
  {
    word: "悉数",
    count: 1
  },
  {
    word: "最",
    count: 1
  },
  {
    word: "悉",
    count: 1
  },
  {
    word: "重要",
    count: 1
  },
  {
    word: "台",
    count: 1
  },
  {
    word: "sass",
    count: 1
  },
  {
    word: "平台",
    count: 1
  },
  {
    word: "seo",
    count: 1
  },
  {
    word: "节奏",
    count: 1
  },
  {
    word: "经验总结",
    count: 1
  },
  {
    word: "发掘",
    count: 1
  },
  {
    word: "oracledatabase",
    count: 1
  },
  {
    word: "真义",
    count: 1
  },
  {
    word: "红宝书",
    count: 1
  },
  {
    word: "phone",
    count: 1
  },
  {
    word: "oracledatabase12c",
    count: 1
  },
  {
    word: "沃",
    count: 1
  },
  {
    word: "漏",
    count: 1
  },
  {
    word: "跨",
    count: 1
  },
  {
    word: "倍",
    count: 1
  },
  {
    word: "大师",
    count: 1
  },
  {
    word: "发明",
    count: 1
  },
  {
    word: "动画设计",
    count: 1
  },
  {
    word: "那些",
    count: 1
  },
  {
    word: "动画",
    count: 1
  },
  {
    word: "倍增",
    count: 1
  },
  {
    word: "手机",
    count: 1
  },
  {
    word: "漏洞",
    count: 1
  },
  {
    word: "诊断",
    count: 1
  },
  {
    word: "修炼",
    count: 1
  },
  {
    word: "诊",
    count: 1
  },
  {
    word: "的人",
    count: 1
  },
  {
    word: "断",
    count: 1
  },
  {
    word: "入选",
    count: 1
  },
  {
    word: "802",
    count: 1
  },
  {
    word: "中国",
    count: 1
  },
  {
    word: "640",
    count: 1
  },
  {
    word: "榜",
    count: 1
  },
  {
    word: "640-802",
    count: 1
  },
  {
    word: "品味",
    count: 1
  },
  {
    word: "日本",
    count: 1
  },
  {
    word: "4.5",
    count: 1
  },
  {
    word: "电子",
    count: 1
  },
  {
    word: "万",
    count: 1
  },
  {
    word: "子产",
    count: 1
  },
  {
    word: "windowsphone",
    count: 1
  },
  {
    word: "产业",
    count: 1
  },
  {
    word: "图书",
    count: 1
  },
  {
    word: "兴衰",
    count: 1
  },
  {
    word: "起点",
    count: 1
  },
  {
    word: "衰",
    count: 1
  },
  {
    word: "工作指南",
    count: 1
  },
  {
    word: "录",
    count: 1
  },
  {
    word: "掌",
    count: 1
  },
  {
    word: "明",
    count: 1
  },
  {
    word: "典范",
    count: 1
  },
  {
    word: "入门篇",
    count: 1
  },
  {
    word: "流量",
    count: 1
  },
  {
    word: "系统开发",
    count: 1
  },
  {
    word: "autodesk",
    count: 1
  },
  {
    word: "会话式",
    count: 1
  },
  {
    word: "ddesign",
    count: 1
  },
  {
    word: "内核",
    count: 1
  },
  {
    word: "印机",
    count: 1
  },
  {
    word: "环境",
    count: 1
  },
  {
    word: "实用",
    count: 1
  },
  {
    word: "极限",
    count: 1
  },
  {
    word: "量子",
    count: 1
  },
  {
    word: "续集",
    count: 1
  },
  {
    word: "打造",
    count: 1
  },
  {
    word: "解数",
    count: 1
  },
  {
    word: "硬件",
    count: 1
  },
  {
    word: "体系结构",
    count: 1
  },
  {
    word: "oracleace",
    count: 1
  },
  {
    word: "言及",
    count: 1
  },
  {
    word: "招",
    count: 1
  },
  {
    word: "及其",
    count: 1
  },
  {
    word: "oraclesql",
    count: 1
  },
  {
    word: "包",
    count: 1
  },
  {
    word: "storm",
    count: 1
  },
  {
    word: "androidlauncher",
    count: 1
  },
  {
    word: "实例教程",
    count: 1
  },
  {
    word: "走近",
    count: 1
  },
  {
    word: "站开",
    count: 1
  },
  {
    word: "2050",
    count: 1
  },
  {
    word: "原型",
    count: 1
  },
  {
    word: "注意力",
    count: 1
  },
  {
    word: "就是",
    count: 1
  },
  {
    word: "注意",
    count: 1
  },
  {
    word: "kalilinux",
    count: 1
  },
  {
    word: "注",
    count: 1
  },
  {
    word: "express",
    count: 1
  },
  {
    word: "与人",
    count: 1
  },
  {
    word: "所求",
    count: 1
  },
  {
    word: "截面",
    count: 1
  },
  {
    word: "两",
    count: 1
  },
  {
    word: "截",
    count: 1
  },
  {
    word: "脚本语言",
    count: 1
  },
  {
    word: "干净",
    count: 1
  },
  {
    word: "驾",
    count: 1
  },
  {
    word: "净",
    count: 1
  },
  {
    word: "信息",
    count: 1
  },
  {
    word: "清洗",
    count: 1
  },
  {
    word: "浪",
    count: 1
  },
  {
    word: "洗",
    count: 1
  },
  {
    word: "对话",
    count: 1
  },
  {
    word: "软件设计",
    count: 1
  },
  {
    word: "流",
    count: 1
  },
  {
    word: "webgl",
    count: 1
  },
  {
    word: "别无",
    count: 1
  },
  {
    word: "多核",
    count: 1
  },
  {
    word: "正则",
    count: 1
  },
  {
    word: "速度",
    count: 1
  },
  {
    word: "表达",
    count: 1
  },
  {
    word: "激情",
    count: 1
  },
  {
    word: "达式",
    count: 1
  },
  {
    word: "激",
    count: 1
  },
  {
    word: "只是",
    count: 1
  },
  {
    word: "情",
    count: 1
  },
  {
    word: "为了",
    count: 1
  },
  {
    word: "以网",
    count: 1
  },
  {
    word: "之父",
    count: 1
  },
  {
    word: "提升",
    count: 1
  },
  {
    word: "林",
    count: 1
  },
  {
    word: "写给",
    count: 1
  },
  {
    word: "在手",
    count: 1
  },
  {
    word: "大家",
    count: 1
  },
  {
    word: "一册",
    count: 1
  },
  {
    word: "看",
    count: 1
  },
  {
    word: "面面",
    count: 1
  },
  {
    word: "安",
    count: 1
  },
  {
    word: "南面",
    count: 1
  },
  {
    word: "卓",
    count: 1
  },
  {
    word: "推送",
    count: 1
  },
  {
    word: "发书",
    count: 1
  },
  {
    word: "分布",
    count: 1
  },
  {
    word: "appinventor2",
    count: 1
  },
  {
    word: "netwebapi",
    count: 1
  },
  {
    word: "防范",
    count: 1
  },
  {
    word: "欢迎",
    count: 1
  },
  {
    word: "钓鱼",
    count: 1
  },
  {
    word: "模数",
    count: 1
  },
  {
    word: "钓",
    count: 1
  },
  {
    word: "肢体",
    count: 1
  },
  {
    word: "欺诈",
    count: 1
  },
  {
    word: "码本",
    count: 1
  },
  {
    word: "欺",
    count: 1
  },
  {
    word: "模拟",
    count: 1
  },
  {
    word: "诈",
    count: 1
  },
  {
    word: "大规模",
    count: 1
  },
  {
    word: "微服",
    count: 1
  },
  {
    word: "健",
    count: 1
  },
  {
    word: "言实",
    count: 1
  },
  {
    word: "网大",
    count: 1
  },
  {
    word: "解密",
    count: 1
  },
  {
    word: "系列丛书",
    count: 1
  },
  {
    word: "密码",
    count: 1
  },
  {
    word: "丛书",
    count: 1
  },
  {
    word: "300",
    count: 1
  },
  {
    word: "以来",
    count: 1
  },
  {
    word: "399",
    count: 1
  },
  {
    word: "作者",
    count: 1
  },
  {
    word: "进化",
    count: 1
  },
  {
    word: "埃",
    count: 1
  },
  {
    word: "孤胆",
    count: 1
  },
  {
    word: "莱",
    count: 1
  },
  {
    word: "孤",
    count: 1
  },
  {
    word: "物理",
    count: 1
  },
  {
    word: "胆",
    count: 1
  },
  {
    word: "小时",
    count: 1
  },
  {
    word: "极",
    count: 1
  },
  {
    word: "365",
    count: 1
  },
  {
    word: "数据仓库",
    count: 1
  },
  {
    word: "不间断",
    count: 1
  },
  {
    word: "仓库",
    count: 1
  },
  {
    word: "有史以来",
    count: 1
  },
  {
    word: "仓",
    count: 1
  },
  {
    word: "监",
    count: 1
  },
  {
    word: "以及",
    count: 1
  },
  {
    word: "窍",
    count: 1
  },
  {
    word: "datavault",
    count: 1
  },
  {
    word: "自己",
    count: 1
  },
  {
    word: "线性代数",
    count: 1
  },
  {
    word: "施设",
    count: 1
  },
  {
    word: "线性",
    count: 1
  },
  {
    word: "头",
    count: 1
  },
  {
    word: "代数",
    count: 1
  },
  {
    word: "learninghardc",
    count: 1
  },
  {
    word: "魔力",
    count: 1
  },
  {
    word: "笔",
    count: 1
  },
  {
    word: "haskell",
    count: 1
  },
  {
    word: "web+dbpress",
    count: 1
  },
  {
    word: "会话",
    count: 1
  },
  {
    word: "智取",
    count: 1
  },
  {
    word: "通关",
    count: 1
  },
  {
    word: "捕",
    count: 1
  },
  {
    word: "详解",
    count: 1
  },
  {
    word: "策略",
    count: 1
  },
  {
    word: "详",
    count: 1
  },
  {
    word: "达人",
    count: 1
  },
  {
    word: "时序",
    count: 1
  },
  {
    word: "具体",
    count: 1
  },
  {
    word: "unity5",
    count: 1
  },
  {
    word: "第二",
    count: 1
  },
  {
    word: "讲解",
    count: 1
  },
  {
    word: "好工作",
    count: 1
  },
  {
    word: "编译器",
    count: 1
  },
  {
    word: "服务器端",
    count: 1
  },
  {
    word: "揭秘",
    count: 1
  },
  {
    word: "299",
    count: 1
  },
  {
    word: "揭",
    count: 1
  },
  {
    word: "镜头",
    count: 1
  },
  {
    word: "企业级",
    count: 1
  },
  {
    word: "机制",
    count: 1
  },
  {
    word: "php",
    count: 1
  },
  {
    word: "求职",
    count: 1
  },
  {
    word: "质",
    count: 1
  },
  {
    word: "型",
    count: 1
  },
  {
    word: "竞赛",
    count: 1
  },
  {
    word: "程之",
    count: 1
  },
  {
    word: "竞",
    count: 1
  },
  {
    word: "旅",
    count: 1
  },
  {
    word: "赛",
    count: 1
  },
  {
    word: "卡特",
    count: 1
  },
  {
    word: "和数",
    count: 1
  },
  {
    word: "论文",
    count: 1
  },
  {
    word: "软件开发",
    count: 1
  },
  {
    word: "游戏机",
    count: 1
  },
  {
    word: "本质论",
    count: 1
  },
  {
    word: "生平",
    count: 1
  },
  {
    word: "论",
    count: 1
  },
  {
    word: "秘密",
    count: 1
  },
  {
    word: "追求",
    count: 1
  },
  {
    word: "图灵",
    count: 1
  },
  {
    word: "简约",
    count: 1
  },
  {
    word: "聊",
    count: 1
  },
  {
    word: "体现",
    count: 1
  },
  {
    word: "数据中心",
    count: 1
  },
  {
    word: "现价",
    count: 1
  },
  {
    word: "网络技术",
    count: 1
  },
  {
    word: "价值",
    count: 1
  },
  {
    word: "架开",
    count: 1
  },
  {
    word: "逐步",
    count: 1
  },
  {
    word: "meanweb",
    count: 1
  },
  {
    word: "逐",
    count: 1
  },
  {
    word: "搭建",
    count: 1
  },
  {
    word: "步",
    count: 1
  },
  {
    word: "建",
    count: 1
  },
  {
    word: "序数",
    count: 1
  },
  {
    word: "营利",
    count: 1
  },
  {
    word: "采集",
    count: 1
  },
  {
    word: "致",
    count: 1
  },
  {
    word: "垃圾",
    count: 1
  },
  {
    word: "漫",
    count: 1
  },
  {
    word: "垃",
    count: 1
  },
  {
    word: "人",
    count: 1
  },
  {
    word: "圾",
    count: 1
  },
  {
    word: "辑",
    count: 1
  },
  {
    word: "回收",
    count: 1
  },
  {
    word: "逻辑",
    count: 1
  },
  {
    word: "回",
    count: 1
  },
  {
    word: "19",
    count: 1
  },
  {
    word: "收",
    count: 1
  },
  {
    word: "奏",
    count: 1
  },
  {
    word: "https",
    count: 1
  },
  {
    word: "以太网",
    count: 1
  },
  {
    word: "用上",
    count: 1
  },
  {
    word: "网络游戏",
    count: 1
  },
  {
    word: "上部",
    count: 1
  },
  {
    word: "oracle12c",
    count: 1
  },
  {
    word: "ssl",
    count: 1
  },
  {
    word: "mahout",
    count: 1
  },
  {
    word: "tls",
    count: 1
  },
  {
    word: "管理工具",
    count: 1
  },
  {
    word: "pki",
    count: 1
  },
  {
    word: "puppet",
    count: 1
  },
  {
    word: "良",
    count: 1
  },
  {
    word: "智慧",
    count: 1
  },
  {
    word: "浏览器",
    count: 1
  },
  {
    word: "200-120",
    count: 1
  },
  {
    word: "浏览",
    count: 1
  },
  {
    word: "迄",
    count: 1
  },
  {
    word: "浏",
    count: 1
  },
  {
    word: "域",
    count: 1
  },
  {
    word: "览",
    count: 1
  },
  {
    word: "著作",
    count: 1
  },
  {
    word: "实战篇",
    count: 1
  },
  {
    word: "经验",
    count: 1
  },
  {
    word: "springboot",
    count: 1
  },
  {
    word: "思科",
    count: 1
  },
  {
    word: "meteor",
    count: 1
  },
  {
    word: "linuxshell",
    count: 1
  },
  {
    word: "菜鸟",
    count: 1
  },
  {
    word: "谁",
    count: 1
  },
  {
    word: "菜",
    count: 1
  },
  {
    word: "windows",
    count: 1
  },
  {
    word: "鸟",
    count: 1
  },
  {
    word: "人性",
    count: 1
  },
  {
    word: "侦探",
    count: 1
  },
  {
    word: "帝国",
    count: 1
  },
  {
    word: "侦",
    count: 1
  },
  {
    word: "好书",
    count: 1
  },
  {
    word: "数据处理",
    count: 1
  },
  {
    word: "全体",
    count: 1
  },
  {
    word: "客户端",
    count: 1
  },
  {
    word: "畅销",
    count: 1
  },
  {
    word: "客户",
    count: 1
  },
  {
    word: "零起点",
    count: 1
  },
  {
    word: "存储",
    count: 1
  },
  {
    word: "掌握",
    count: 1
  },
  {
    word: "储",
    count: 1
  },
  {
    word: "用典",
    count: 1
  },
  {
    word: "shell",
    count: 1
  },
  {
    word: "123",
    count: 1
  },
  {
    word: "大全",
    count: 1
  },
  {
    word: "物件",
    count: 1
  },
  {
    word: "swiftios",
    count: 1
  },
  {
    word: "比特",
    count: 1
  },
  {
    word: "特性",
    count: 1
  },
  {
    word: "oaktable",
    count: 1
  },
  {
    word: "说",
    count: 1
  },
  {
    word: "学会",
    count: 1
  },
  {
    word: "如何",
    count: 1
  },
  {
    word: "源码",
    count: 1
  },
  {
    word: "65",
    count: 1
  },
  {
    word: "入网",
    count: 1
  },
  {
    word: "提高",
    count: 1
  },
  {
    word: "cocos2d-x3",
    count: 1
  },
  {
    word: "景",
    count: 1
  },
  {
    word: "架设",
    count: 1
  },
  {
    word: "helloworld",
    count: 1
  },
  {
    word: "无所",
    count: 1
  },
  {
    word: "上手",
    count: 1
  },
  {
    word: "驭",
    count: 1
  },
  {
    word: "tomcat",
    count: 1
  },
  {
    word: "潮",
    count: 1
  },
  {
    word: "全开",
    count: 1
  },
  {
    word: "组织",
    count: 1
  },
  {
    word: "技能",
    count: 1
  },
  {
    word: "表达式",
    count: 1
  },
  {
    word: "57",
    count: 1
  },
  {
    word: "groovy",
    count: 1
  },
  {
    word: "功力",
    count: 1
  },
  {
    word: "好玩",
    count: 1
  },
  {
    word: "测试题",
    count: 1
  },
  {
    word: "纳",
    count: 1
  },
  {
    word: "macos",
    count: 1
  },
  {
    word: "俱",
    count: 1
  },
  {
    word: "图像",
    count: 1
  },
  {
    word: "使用指南",
    count: 1
  },
  {
    word: "法新",
    count: 1
  },
  {
    word: "asp.netwebapi",
    count: 1
  },
  {
    word: "新解",
    count: 1
  },
  {
    word: "受欢迎",
    count: 1
  },
  {
    word: "webapi",
    count: 1
  },
  {
    word: "肢",
    count: 1
  },
  {
    word: "图形化",
    count: 1
  },
  {
    word: "自然系统",
    count: 1
  },
  {
    word: "图形",
    count: 1
  },
  {
    word: "康",
    count: 1
  },
  {
    word: "场景",
    count: 1
  },
  {
    word: "系列",
    count: 1
  },
  {
    word: "协作",
    count: 1
  },
  {
    word: "创业",
    count: 1
  },
  {
    word: "协",
    count: 1
  },
  {
    word: "克",
    count: 1
  },
  {
    word: "pytorch",
    count: 1
  },
  {
    word: "24",
    count: 1
  },
  {
    word: "100-105",
    count: 1
  },
  {
    word: "天",
    count: 1
  },
  {
    word: "面试题",
    count: 1
  },
  {
    word: "qt",
    count: 1
  },
  {
    word: "200-105",
    count: 1
  },
  {
    word: "窍门",
    count: 1
  },
  {
    word: "200-125",
    count: 1
  },
  {
    word: "用户手册",
    count: 1
  },
  {
    word: "125",
    count: 1
  },
  {
    word: "笔记",
    count: 1
  },
  {
    word: "交互",
    count: 1
  },
  {
    word: "dbpress",
    count: 1
  },
  {
    word: "时代",
    count: 1
  },
  {
    word: "问题",
    count: 1
  },
  {
    word: "思考力",
    count: 1
  },
  {
    word: "googleglass",
    count: 1
  },
  {
    word: "跟",
    count: 1
  },
  {
    word: "都有",
    count: 1
  },
  {
    word: "阿",
    count: 1
  },
  {
    word: "镜",
    count: 1
  },
  {
    word: "铭",
    count: 1
  },
  {
    word: "行业",
    count: 1
  },
  {
    word: "反病毒",
    count: 1
  },
  {
    word: "模型",
    count: 1
  },
  {
    word: "病毒",
    count: 1
  },
  {
    word: "之旅",
    count: 1
  },
  {
    word: "毒",
    count: 1
  },
  {
    word: "防线",
    count: 1
  },
  {
    word: "前端",
    count: 1
  },
  {
    word: "思想",
    count: 1
  },
  {
    word: "思考",
    count: 1
  },
  {
    word: "236",
    count: 1
  },
  {
    word: "利用",
    count: 1
  },
  {
    word: "天机",
    count: 1
  },
  {
    word: "angular",
    count: 1
  },
  {
    word: "cocoa",
    count: 1
  },
  {
    word: "多线程",
    count: 1
  },
  {
    word: "富",
    count: 1
  },
  {
    word: "趣",
    count: 1
  },
  {
    word: "理到",
    count: 1
  },
  {
    word: "32",
    count: 1
  },
  {
    word: "漫谈",
    count: 1
  },
  {
    word: "解锁",
    count: 1
  },
  {
    word: "opencv",
    count: 1
  },
  {
    word: "锁",
    count: 1
  },
  {
    word: "好手",
    count: 1
  },
  {
    word: "30",
    count: 1
  },
  {
    word: "荐",
    count: 1
  },
  {
    word: "信条",
    count: 1
  },
  {
    word: "cpu",
    count: 1
  },
  {
    word: "这样",
    count: 1
  },
  {
    word: "100-101",
    count: 1
  },
  {
    word: "考",
    count: 1
  },
  {
    word: "大智慧",
    count: 1
  },
  {
    word: "才",
    count: 1
  },
  {
    word: "迄今为止",
    count: 1
  },
  {
    word: "规范",
    count: 1
  },
  {
    word: "最重",
    count: 1
  },
  {
    word: "128",
    count: 1
  },
  {
    word: "120",
    count: 1
  },
  {
    word: "好习惯",
    count: 1
  },
  {
    word: "增",
    count: 1
  },
  {
    word: "开发权",
    count: 1
  },
  {
    word: "45",
    count: 1
  },
  {
    word: "玩",
    count: 1
  },
  {
    word: "选中",
    count: 1
  },
  {
    word: "rspec",
    count: 1
  },
  {
    word: "百万",
    count: 1
  },
  {
    word: "rails",
    count: 1
  },
  {
    word: "199",
    count: 1
  },
  {
    word: "原",
    count: 1
  },
  {
    word: "autodesk123ddesign",
    count: 1
  },
  {
    word: "headfirstjavascript",
    count: 1
  },
  {
    word: "dna",
    count: 1
  },
  {
    word: "fps",
    count: 1
  },
  {
    word: "75",
    count: 1
  },
  {
    word: "400",
    count: 1
  },
  {
    word: "儿",
    count: 1
  },
  {
    word: "451",
    count: 1
  },
  {
    word: "啊哈",
    count: 1
  },
  {
    word: "流畅",
    count: 1
  },
  {
    word: "驾驭",
    count: 1
  },
  {
    word: "去",
    count: 1
  },
  {
    word: "一流",
    count: 1
  },
  {
    word: "spring5.0",
    count: 1
  },
  {
    word: "表",
    count: 1
  },
  {
    word: "spring",
    count: 1
  },
  {
    word: "别无所求",
    count: 1
  },
  {
    word: "5.0",
    count: 1
  },
  {
    word: "面面俱到",
    count: 1
  },
  {
    word: "概述",
    count: 1
  },
  {
    word: "分布式",
    count: 1
  },
  {
    word: "魔法书",
    count: 1
  },
  {
    word: "本色",
    count: 1
  },
  {
    word: "魔法",
    count: 1
  },
  {
    word: "最受",
    count: 1
  },
  {
    word: "架构师",
    count: 1
  },
  {
    word: "埃里克",
    count: 1
  },
  {
    word: "探索",
    count: 1
  },
  {
    word: "时",
    count: 1
  },
  {
    word: "枕边",
    count: 1
  },
  {
    word: "门",
    count: 1
  },
  {
    word: "枕",
    count: 1
  },
  {
    word: "learninghardc#",
    count: 1
  },
  {
    word: "边",
    count: 1
  },
  {
    word: "捕鱼",
    count: 1
  },
  {
    word: "之外",
    count: 1
  },
  {
    word: "二版",
    count: 1
  },
  {
    word: "功夫",
    count: 1
  },
  {
    word: "9",
    count: 1
  },
  {
    word: "精进",
    count: 1
  },
  {
    word: "子",
    count: 1
  },
  {
    word: "训练营",
    count: 1
  },
  {
    word: "03",
    count: 1
  },
  {
    word: "营",
    count: 1
  },
  {
    word: "聊天",
    count: 1
  },
  {
    word: "devops",
    count: 1
  },
  {
    word: "cocos2d-js",
    count: 1
  },
  {
    word: "fpga",
    count: 1
  },
  {
    word: "极致",
    count: 1
  },
  {
    word: "通往",
    count: 1
  },
  {
    word: "逻",
    count: 1
  },
  {
    word: "观",
    count: 1
  },
  {
    word: "访",
    count: 1
  },
  {
    word: "监控",
    count: 1
  },
  {
    word: "单元测试",
    count: 1
  },
  {
    word: "世界观",
    count: 1
  },
  {
    word: "为止",
    count: 1
  },
  {
    word: "unity3d",
    count: 1
  },
  {
    word: "化入",
    count: 1
  },
  {
    word: "flink",
    count: 1
  },
  {
    word: "炼",
    count: 1
  },
  {
    word: "pwa",
    count: 1
  },
  {
    word: "销",
    count: 1
  },
  {
    word: "scipy",
    count: 1
  },
  {
    word: "打印机",
    count: 1
  },
  {
    word: "戏剧",
    count: 1
  },
  {
    word: "unityapi",
    count: 1
  },
  {
    word: "剧本",
    count: 1
  },
  {
    word: "两周",
    count: 1
  },
  {
    word: "剧",
    count: 1
  },
  {
    word: "正则表达式",
    count: 1
  },
  {
    word: "怎么",
    count: 1
  },
  {
    word: "自传",
    count: 1
  },
  {
    word: "么",
    count: 1
  },
  {
    word: "规模",
    count: 1
  },
  {
    word: "写",
    count: 1
  },
  {
    word: "丛",
    count: 1
  },
  {
    word: "python3",
    count: 1
  },
  {
    word: "间断",
    count: 1
  },
  {
    word: "爬虫",
    count: 1
  },
  {
    word: "记",
    count: 1
  },
  {
    word: "爬",
    count: 1
  },
  {
    word: "理念",
    count: 1
  },
  {
    word: "虫",
    count: 1
  },
  {
    word: "小卡",
    count: 1
  },
  {
    word: "精简版",
    count: 1
  },
  {
    word: "机器人",
    count: 1
  },
  {
    word: "精简",
    count: 1
  },
  {
    word: "json",
    count: 1
  },
  {
    word: "卷积",
    count: 1
  },
  {
    word: "影响力",
    count: 1
  },
  {
    word: "积",
    count: 1
  },
  {
    word: "compass",
    count: 1
  },
  {
    word: "神经网络",
    count: 1
  },
  {
    word: "asp.net4.5",
    count: 1
  },
  {
    word: "神经",
    count: 1
  },
  {
    word: "合力",
    count: 1
  },
  {
    word: "英语",
    count: 1
  },
  {
    word: "浪潮",
    count: 1
  },
  {
    word: "kotlin",
    count: 1
  },
  {
    word: "全权",
    count: 1
  },
  {
    word: "oauth2",
    count: 1
  },
  {
    word: "主编",
    count: 1
  },
  {
    word: "oauth",
    count: 1
  },
  {
    word: "策",
    count: 1
  },
  {
    word: "精粹",
    count: 1
  },
  {
    word: "他",
    count: 1
  },
  {
    word: "粹",
    count: 1
  },
  {
    word: "nosql",
    count: 1
  },
  {
    word: "白话",
    count: 1
  },
  {
    word: "明了",
    count: 1
  },
  {
    word: "话机",
    count: 1
  },
  {
    word: "这个",
    count: 1
  },
  {
    word: "理论",
    count: 1
  },
  {
    word: "健康",
    count: 1
  },
  {
    word: "线",
    count: 1
  },
  {
    word: "解决",
    count: 1
  },
  {
    word: "解决方案",
    count: 1
  },
  {
    word: "准",
    count: 1
  },
  {
    word: "标准",
    count: 1
  },
  {
    word: "搭",
    count: 1
  },
  {
    word: "angularjs",
    count: 1
  },
  {
    word: "是为了",
    count: 1
  },
  {
    word: "握",
    count: 1
  },
  {
    word: "02",
    count: 1
  },
]

/*导出方法 */
module.exports = {
  //商品分类数据
  categories: categories,
  //商品搜索页面的热搜关键词数据
  hotSearchProducts: hotSearchProducts,
  //商品搜索页面的热搜关键词数据
  suggestWords: suggestWords,
}