/* ============================================================
   list.js —— 商品列表页：筛选 / 排序 / 分页 / 渲染
   ------------------------------------------------------------
   知识点：
     · 数组 filter / sort / slice（教材 P216 起）
     · 字符串 indexOf（教材 P216）
     · DOM 获取元素与修改 innerHTML（教材 P257）
     · location.search 读取网址参数
     · 模板字符串拼接 HTML
   ============================================================ */

// 每页显示几条
var PAGE_SIZE = 4;

/* ------------------------------------------------------------
   1. 读取网址参数，比如 list.html?cate=book&page=2&kw=高数
   ------------------------------------------------------------ */
function getParam(name, def) {
    var m = location.search.match(new RegExp("[?&]" + name + "=([^&]*)"));
    if (m === null) {
        return def === undefined ? "" : def;
    }
    return decodeURIComponent(m[1].replace(/\+/g, " "));
}

/* ------------------------------------------------------------
   2. 筛选 + 排序
   ------------------------------------------------------------ */
function filterGoods() {
    var cate = getParam("cate");
    var kw = getParam("kw").trim();
    var sort = getParam("sort", "default");
    var result = [];

    // 逐个判断要不要保留
    for (var i = 0; i < GOODS.length; i++) {
        var g = GOODS[i];
        if (cate !== "" && g.cate !== cate) {
            continue;                      // 分类对不上，跳过
        }
        if (kw !== "" && g.title.indexOf(kw) === -1) {
            continue;                      // 关键词没命中，跳过
        }
        result.push(g);
    }

    // 排序
    if (sort === "priceAsc") {
        result.sort(function (a, b) { return a.price - b.price; });
    } else if (sort === "priceDesc") {
        result.sort(function (a, b) { return b.price - a.price; });
    } else if (sort === "newest") {
        result.sort(function (a, b) { return b.id - a.id; });
    }
    return result;
}

/* ------------------------------------------------------------
   3. 渲染商品卡片
   ------------------------------------------------------------ */
function renderCards(list) {
    var box = document.getElementById("goodsList");
    var html = "";

    for (var i = 0; i < list.length; i++) {
        var g = list[i];
        var tags = "";
        for (var j = 0; j < g.tags.length; j++) {
            tags += '<span class="tag">' + g.tags[j] + '</span>';
        }
        var link = "detail.html?id=" + g.id;

        html += '<div class="card">' +
                    '<a href="' + link + '"><img class="card-img" src="' + g.img + '" alt="' + g.alt + '"></a>' +
                    '<div class="card-body">' +
                        '<div class="card-title"><a href="' + link + '">' + g.title + '</a></div>' +
                        tags +
                        '<div class="card-meta">' +
                            '<span class="card-price">￥' + g.price +
                            '<small> 原价 ￥' + g.oldPrice + '</small></span>' +
                            '<span>' + g.location + '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>';
    }

    if (html === "") {
        html = '<p style="grid-column:1/-1;text-align:center;padding:40px 0;color:#7a6a55;">' +
               '没有找到符合条件的商品，换个分类或关键词试试</p>';
    }
    box.innerHTML = html;
}

/* ------------------------------------------------------------
   4. 渲染分页
   ------------------------------------------------------------ */
function renderPager(total) {
    var pager = document.getElementById("pager");
    var pages = Math.ceil(total / PAGE_SIZE);
    var cur = parseInt(getParam("page", "1"), 10) || 1;

    if (pages <= 1) {
        pager.innerHTML = "";
        return;
    }

    // 当前页面地址（去掉 page 参数），拼新链接用
    var base = location.pathname.split("/").pop();
    var qs = location.search.replace(/[?&]page=\d+/, "");
    var sep = qs === "" ? "?" : "&";
    if (qs !== "" && qs.charAt(0) !== "?") { qs = "?" + qs; sep = "&"; }

    var html = "";
    var prev = cur > 1 ? cur - 1 : 1;
    html += '<a href="' + base + qs + sep + 'page=' + prev + '">上一页</a>';

    for (var i = 1; i <= pages; i++) {
        html += '<a href="' + base + qs + sep + 'page=' + i + '"' +
                (i === cur ? ' class="on"' : '') + '>' + i + '</a>';
    }

    var next = cur < pages ? cur + 1 : pages;
    html += '<a href="' + base + qs + sep + 'page=' + next + '">下一页</a>';

    pager.innerHTML = html;
}

/* ------------------------------------------------------------
   5. 开工
   ------------------------------------------------------------ */
(function () {
    var all = filterGoods();
    var page = parseInt(getParam("page", "1"), 10) || 1;

    // 页码越界的话拉回第一页
    var pages = Math.ceil(all.length / PAGE_SIZE) || 1;
    if (page < 1) { page = 1; }
    if (page > pages) { page = pages; }

    var start = (page - 1) * PAGE_SIZE;
    renderCards(all.slice(start, start + PAGE_SIZE));
    renderPager(all.length);

    // 让下拉框显示当前选中的分类、排序
    var selCate = document.querySelector('select[name="cate"]');
    if (selCate && getParam("cate") !== "") {
        selCate.value = getParam("cate");
    }
    var selSort = document.querySelector('select[name="sort"]');
    if (selSort && getParam("sort") !== "") {
        selSort.value = getParam("sort");
    }

    // 更新"共找到 N 件商品"那句提示
    var cnt = document.querySelector(".page-head span");
    if (cnt) {
        cnt.innerHTML = "共找到 " + all.length + " 件商品 · 同校当面交易更放心";
    }
})();
