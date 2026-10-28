/* ============================================================
   校园二手交易平台 —— 公共脚本 main.js
   ============================================================ */

/* ------------------------------------------------------------
   功能一：回到顶部按钮
   ------------------------------------------------------------ */
// 1. 先拿到按钮元素
var backTop = document.getElementById("backTop");

// 2. 监听页面的滚动事件
window.onscroll = function () {
    // 页面往下滚了多少像素
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    // 超过 300 像素就把按钮显示出来，否则藏起来
    if (top > 300) {
        backTop.style.display = "block";
    } else {
        backTop.style.display = "none";
    }
};

// 3. 点按钮回到顶部
if (backTop) {
    backTop.onclick = function () {
        window.scrollTo(0, 0);
    };
}

/* ------------------------------------------------------------
   功能二：小屏幕下的汉堡菜单
   ------------------------------------------------------------ */
var navToggle = document.getElementById("navToggle");
var nav = document.getElementById("nav");

if (navToggle && nav) {
    navToggle.onclick = function () {
        // 有 open 这个类就展开导航，没有再点一次就收起来
        if (nav.className.indexOf("open") > -1) {
            nav.className = "nav";
        } else {
            nav.className = "nav open";
        }
    };
}

/* ------------------------------------------------------------
   功能三：导航“返回顶部”类的通用小工具函数
   ------------------------------------------------------------ */
function goTop() {
    window.scrollTo(0, 0);
}
