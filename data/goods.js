/* ============================================================
   商品数据 goods.js
   ------------------------------------------------------------
   8 个闲置商品的数据集中放在这里，由 JS 读取后动态生成页面
   这样列表页、详情页都用同一份数据，改一处全站生效
   ============================================================ */

var GOODS = [
    {
        id: 1,
        title: "高等数学（第七版）上下册 九成新",
        price: 25.0,
        oldPrice: 68.0,
        cate: "book",
        cateName: "教材书籍",
        tags: ["教材书籍", "可小刀"],
        location: "图书馆交易",
        img: "images/goods1.jpg",
        alt: "高等数学教材"
    },
    {
        id: 2,
        title: "罗技无线鼠标 M185 用了半年 功能正常",
        price: 35.0,
        oldPrice: 89.0,
        cate: "digital",
        cateName: "数码电子",
        tags: ["数码电子"],
        location: "当面交易",
        img: "images/goods2.jpg",
        alt: "罗技无线鼠标"
    },
    {
        id: 3,
        title: "捷安特山地车 21 速 毕业出 送车锁",
        price: 260.0,
        oldPrice: 980.0,
        cate: "bike",
        cateName: "代步工具",
        tags: ["代步工具", "毕业甩卖"],
        location: "宿舍楼下交易",
        img: "images/goods3.jpg",
        alt: "捷安特山地自行车"
    },
    {
        id: 4,
        title: "宿舍护眼台灯 三档调光 带 USB 充电口",
        price: 18.0,
        oldPrice: 49.0,
        cate: "dorm",
        cateName: "宿舍用品",
        tags: ["宿舍用品"],
        location: "当面交易",
        img: "images/goods4.jpg",
        alt: "宿舍护眼台灯"
    },
    {
        id: 5,
        title: "黑爵机械键盘 青轴 87 键 送拔键器",
        price: 88.0,
        oldPrice: 199.0,
        cate: "digital",
        cateName: "数码电子",
        tags: ["数码电子", "可小刀"],
        location: "当面交易",
        img: "images/goods5.jpg",
        alt: "黑爵机械键盘"
    },
    {
        id: 6,
        title: "英语四六级真题全套 含听力音频 有笔记",
        price: 15.0,
        oldPrice: 45.0,
        cate: "book",
        cateName: "教材书籍",
        tags: ["教材书籍", "可小刀"],
        location: "当面交易",
        img: "images/goods6.jpg",
        alt: "英语四六级真题资料"
    },
    {
        id: 7,
        title: "宿舍迷你小冰箱 20L 静音款 搬宿舍出",
        price: 120.0,
        oldPrice: 299.0,
        cate: "dorm",
        cateName: "宿舍用品",
        tags: ["宿舍用品"],
        location: "自提",
        img: "images/goods7.jpg",
        alt: "宿舍迷你小冰箱"
    },
    {
        id: 8,
        title: "耐克运动鞋 42 码 只穿过三四次",
        price: 150.0,
        oldPrice: 499.0,
        cate: "clothes",
        cateName: "服装鞋帽",
        tags: ["服装鞋帽", "可小刀"],
        location: "当面交易",
        img: "images/goods8.jpg",
        alt: "耐克运动鞋"
    },
];
