// 首页内容
$.ajax({
    "url": 'http://h6.duchengjiu.top/shop/api_goods.php?'+"&page="+1+"&pagesize="+50,
    // "url": 'http://lc.shudong.wang/api_goods.php',
    "type": "GET",
    "dataType": "json",
    "success": function(response){
        //处理返回的数据
        var listTwo = document.getElementById('list-two');
        for(var i=0; i<response.data.length; i++){
            var obj = response.data[i];
            var lines = document.createElement('li');
            var afe =  document.createElement('div');
            var afes = document.createElement('div');
            var afespan = document.createElement('span');
            var aDeta = document.createElement('a');
            var spans = document.createElement('span');
            var imgs = document.createElement('img');
            var span = document.createElement('span');
            var buy = document.createElement('span');
            aDeta.href = 'detail.html?goods_id='+ obj.goods_id;
            lines.className = "lines";
            if(i%5 === 4){
                lines.className += " Lis";
            }
            afe.className = 'afe';
            afes.className = 'afes';
            afespan.className = 'afespan';
            spans.className = 'spans';
            span.className = 'spana';
            buy.className = 'buy';
            spans.innerText = response.data[i].goods_name;
            imgs.src = response.data[i].goods_thumb;
            span.innerText = "¥" + response.data[i].price;
            buy.innerText = "立即抢购";
            afes.innerText = "礼券抵扣¥7.2";
            listTwo.appendChild(lines);
            lines.appendChild(aDeta);
            aDeta.appendChild(afe);
            afe.appendChild(afes);
            afe.appendChild(afespan);
            aDeta.appendChild(imgs);
            aDeta.appendChild(spans);
            // aDeta.appendChild(ops);
            aDeta.appendChild(span);
            aDeta.appendChild(buy);

        }
        console.log(response);
    },
    "error": function(message) {
        console.log(message);
    }
});

// 轮播
var $lis = $('#banner ul li');
var idx = 0;
$('#rgtBtn').click(function () {
    pictureChange();
    changeCircle();
})
$("#leftBtn").click(function () {
    if ($lis.eq(idx).is(":animated")){
        return;
    }
    $lis.eq(idx).fadeOut(1000);
    idx--;
    if(idx < 0){
        idx = $lis.length - 1;
    }
    $lis.eq(idx).fadeIn(1000);
    changeCircle();
})
function pictureChange() {
    if ($lis.eq(idx).is(':animated')) {
        return;
    }
    $lis.eq(idx).fadeOut(1000);
    idx++;
    if (idx > $lis.length - 1) {
        idx = 0;
    }
    $lis.eq(idx).fadeIn(1000);
}

var cirs = document.getElementById('cir');
var cir = cirs.getElementsByTagName('li');
// for(var i=0;i<imgleng;i++){
//     cir[i].index=i;
//     cir[i].onclick=function () {
//         $l.eq(idx).fadeOut(1000);
//         $lis.eq(idx).fadeIn(1000);
//         changeCircle();
//     }
// }
function changeCircle(){
    for(var i=0;i<cir.length;i++){
        cir[i].className="";
    }
    cir[idx].className="crr";
}
var timer = 0;
function start() {
    timer = setInterval(function () {
        pictureChange();
        changeCircle();
    },1000);
}
start();
$('#imgslist').mouseenter(function () {
    clearInterval(timer);
});
$('#imgslist').mouseleave(function () {
    start();
});
