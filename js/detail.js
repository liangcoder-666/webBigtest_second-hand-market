/* ============================================================
   detail.js —— 商品详情页：按网址参数 id 显示对应商品
   ------------------------------------------------------------
   知识点：
     · location.search 读取网址参数（?id=3）
     · 数组遍历查找匹配项
     · DOM 获取元素、修改 src / innerHTML / textContent
     · 表单提交事件 onsubmit + 阻止默认行为
   ============================================================ */

/* ---------- 1. 读网址里的 id ---------- */
function getId() {
    var m = location.search.match(/[?&]id=(\d+)/);
    return m ? parseInt(m[1], 10) : 1;      // 没参数就默认显示第 1 个
}

/* ---------- 2. 在 GOODS 里找这个商品 ---------- */
function findGoods(id) {
    for (var i = 0; i < GOODS.length; i++) {
        if (GOODS[i].id === id) {
            return GOODS[i];
        }
    }
    return null;
}

/* ---------- 按分类换不同的提示语 ---------- */
var TIPS = {
    book:    "看货满意再付款，支持当面翻阅检查笔记",
    digital: "当面开机验货，确认功能正常再付款",
    bike:    "可以试骑一圈，确认车况再付款",
    dorm:    "上门看货，确认成色和功能再付款",
    clothes: "可以试穿，确认尺码和成色再付款",
    other:   "当面验货，确认无误再付款"
};

var CONDS = {
    book:    "无缺页、无破损，扉页有几页铅笔笔记",
    digital: "功能正常，外壳有轻微使用痕迹",
    bike:    "车架无磕碰，链条定期上油，刹车灵敏",
    dorm:    "功能完好，成色九成新",
    clothes: "穿过三四次，无破损无污渍",
    other:   "成色见实拍图，无重大损坏"
};

function applyTip(g) {
    var tip = document.getElementById("dTip");
    if (tip) {
        tip.innerHTML = TIPS[g.cate] || TIPS.other;
    }

    var cond = document.getElementById("dCond");
    if (cond) {
        cond.innerHTML = CONDS[g.cate] || CONDS.other;
    }

    var qq = document.getElementById("dQQ");
    if (qq) {
        qq.innerHTML = "QQ 123456789（加好友请备注“" + g.cateName + "”）";
    }
}

/* ---------- 3. 把商品信息填进页面 ---------- */
function render(g) {
    // 大图
    var img = document.getElementById("dImg");
    if (img) {
        img.src = g.img;
        img.alt = g.alt;
    }

    // 标题
    var title = document.getElementById("dTitle");
    if (title) {
        title.innerHTML = g.title;
    }

    // 标签
    var tags = document.getElementById("dTags");
    if (tags) {
        var h = "";
        for (var i = 0; i < g.tags.length; i++) {
            h += '<span class="tag">' + g.tags[i] + '</span>';
        }
        h += '<span class="tag">同校当面交易</span>';
        tags.innerHTML = h;
    }

    // 价格
    var price = document.getElementById("dPrice");
    if (price) { price.innerHTML = "￥" + g.price; }

    var old = document.getElementById("dOld");
    if (old) { old.innerHTML = "原价 ￥" + g.oldPrice; }

    // 页面标题也跟着变（浏览器标签页上显示）
    document.title = g.title + " - 校园二手交易平台";

    // 参数列表里的「分类」那一行
    var dds = document.querySelectorAll(".param-list dd");
    if (dds.length > 0) {
        dds[0].innerHTML = g.cateName;
    }
    if (dds.length > 2) {
        dds[2].innerHTML = "￥" + g.oldPrice + ".00";
    }
    if (dds.length > 3) {
        dds[3].innerHTML = g.location;
    }

    // 提示语和联系方式按分类换
    applyTip(g);
}

/* ---------- 4. 联系卖家：弹出提示 ---------- */
function bindContact(g) {
    var btn = document.getElementById("btnContact");
    if (!btn) { return; }
    btn.onclick = function () {
        var qty = document.getElementById("qty");
        var n = qty ? qty.value : 1;
        alert(
            "已复制卖家联系方式\n\n" +
            "商品：" + g.title + "\n" +
            "数量：" + n + " 件\n" +
            "价格：￥" + (g.price * n) + "\n\n" +
            "交易地点：" + g.location + "\n" +
            "提示：请在校内公共场所当面交易，不要提前转账"
        );
    };
}

/* ---------- 5. 留言：提交后真的加到列表里 ---------- */
function bindComment() {
    var form = document.getElementById("commentForm");
    if (!form) { return false; }

    form.onsubmit = function () {
        var box = document.getElementById("comment");
        var list = document.getElementById("commentList");
        var text = box ? box.value.trim() : "";

        if (text === "") {
            alert("请先写点内容再提交～");
            return false;
        }

        var d = new Date();
        var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
        var time = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) +
                   " " + pad(d.getHours()) + ":" + pad(d.getMinutes());

        var item = document.createElement("div");
        item.className = "comment";
        item.innerHTML =
            '<div class="c-head">' +
                '<span class="c-name">我</span>' +
                '<span class="c-time">' + time + '</span>' +
            '</div>' +
            '<p class="c-text">' + text + '</p>';

        if (list) {
            var ph = document.getElementById("noComment");
            if (ph) { ph.style.display = "none"; }
            list.insertBefore(item, list.firstChild);
        }
        if (box) { box.value = ""; }

        return false;      // 阻止表单真的提交（没有后端）
    };
    return true;
}

/* ---------- 6. 开工 ---------- */
(function () {
    var g = findGoods(getId());

    if (g === null) {
        var t = document.getElementById("dTitle");
        if (t) { t.innerHTML = "商品不存在"; }
        return;
    }

    render(g);
    bindContact(g);
    bindComment();
})();
