var goods_id = $.getQueryString('goods_id');
var boxCont = document.querySelector('.box-cont');
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if(xhr.readyState == 4 && xhr.status == 200) {
        var obj = JSON.parse(xhr.responseText);
        console.log(obj);
        var html = '';
        var objs = obj.data[0];
        console.log(objs);
        html += '<div class="rec-list"><img src="'
            + objs.goods_thumb
            + '"><span class="rec-name">'
            + objs.goods_name +'</span><p class="desc">'
            +  objs.goods_desc +'</p><p class="rec-mo">￥'
            + objs.price
            + '</p><p class="rec-dd"><span>当当自营</span></p><p class="rate"><span class="rate-m">满额减</span><span class="rate-j">满￥100.00减￥50.00</span></p></div>';
        boxCont.innerHTML = html;
    }
}
xhr.open('GET','http://h6.duchengjiu.top/shop/api_goods.php?goods_id='+ goods_id);
xhr.send();

$('.car').click(function () {
    if(!localStorage.token) {
        location.href = 'login.html#callbackurl='+localStorage.href;
        return;
    }
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
        "type":"POST",
        "data":{
            "goods_id":goods_id,
            "number":1
        },
        "dataType":"json",
        "success":function (response) {
            alert('成功加入购物车');
        }
    })
})