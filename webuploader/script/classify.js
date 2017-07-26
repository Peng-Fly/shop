//导航
var classNav = document.querySelector("#classNav");
var xhrNav = new XMLHttpRequest();
xhrNav.onreadystatechange = function () {
    if (xhrNav.readyState == 4 && xhrNav.status == 200) {
        var obj = JSON.parse(xhrNav.responseText);
        var html = '';
        for (var i= 0; i<obj.data.length;i++) {
            var objs = obj.data[i];
            html += '<li class="navigation" data-id="'+objs.cat_id+'"><a href="classify.html?cat_id='
                + objs.cat_id +'">' + objs.cat_name + '</a></li>';
            classNav.innerHTML = html;
        }
    }
}
xhrNav.open('GET','http://h6.duchengjiu.top/shop/api_cat.php');
xhrNav.send();

//内容区
var cat_id = $.getQueryString('cat_id');
var conter = document.querySelector("#xhrCont");
var xhrCont = new XMLHttpRequest();
xhrCont.onreadystatechange = function () {
    if (xhrCont.readyState == 4 && xhrCont.status == 200) {
        var obj = JSON.parse(xhrCont.responseText);
        console.log(obj);
        var html = '';
        if (obj.data.length === 0){
            var oHl = document.createElement('h5');
            oHl.innerText = "当前暂无商品！";
            conter.appendChild(oHl);
            return;
        }
        for (var i=0;i<obj.data.length;i++) {
            var objs = obj.data[i];
            html += '<li class="rec-list"><a href="details.html?goods_id='
                + objs.goods_id
                + '"><img src="'
                + objs.goods_thumb
                + '"><span class="rec-name">'
                + objs.goods_name +'</span><p><span class="rec-mo">￥'
                + objs.price
                + '</span><span class="rec-dd">当当自营</span></p></a></li>';
            conter.innerHTML = html;
        }
    }
}
xhrCont.open('GET','http://h6.duchengjiu.top/shop/api_goods.php?cat_id='+ cat_id + "&page="+1);
xhrCont.send();
//搜索转跳
$('.sou').click(function () {
    location.href = 'search.html';
})
