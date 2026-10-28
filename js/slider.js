/* ============================================================
   首页巨幕图片切换 slider.js
   ============================================================ */

// 1. 拿到所有需要的元素
var slides = document.querySelectorAll(".banner-item");   // 三张巨幕图
var dots = document.querySelectorAll("#dots span");       // 右下角小圆点
var arrowLeft = document.getElementById("arrowLeft");
var arrowRight = document.getElementById("arrowRight");

var current = 0;          // 当前显示第几张（从 0 开始）

/* ------------------------------------------------------------
   核心函数：显示第 n 张
   ------------------------------------------------------------ */
function showSlide(n) {
    // 处理越界：到最后一张再往后就回到第一张
    if (n >= slides.length) {
        n = 0;
    }
    if (n < 0) {
        n = slides.length - 1;
    }
    current = n;

    // 循环把所有图的 on 类去掉，再给第 n 张加上
    for (var i = 0; i < slides.length; i++) {
        slides[i].className = "banner-item";
        if (dots[i]) {
            dots[i].className = "";
        }
    }
    slides[current].className = "banner-item on";
    if (dots[current]) {
        dots[current].className = "on";
    }
}

/* ------------------------------------------------------------
   手动切换：左右箭头
   ------------------------------------------------------------ */
if (arrowLeft) {
    arrowLeft.onclick = function () {
        showSlide(current - 1);
    };
}
if (arrowRight) {
    arrowRight.onclick = function () {
        showSlide(current + 1);
    };
}

/* ------------------------------------------------------------
   手动切换：右下角小圆点（用闭包记住它是第几个）
   ------------------------------------------------------------ */
for (var k = 0; k < dots.length; k++) {
    (function (index) {
        dots[index].onclick = function () {
            showSlide(index);
        };
    })(k);
}

/* ------------------------------------------------------------
   启动：默认显示第一张（不自动播放，只有点击箭头或圆点才换图）
   ------------------------------------------------------------ */
if (slides.length > 0) {
    showSlide(0);
}
