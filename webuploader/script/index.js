// 轮播
var carousel = document.querySelector('#carousel');
var imageLis = document.querySelectorAll('#carousel .imagesList li');
var circleLis = document.querySelectorAll('#circles li');

var idx = 0;//当前中间图片
var next = 1;//下一张图
var prev = imageLis.length - 1;//上一张
var timer = setInterval(function(){
    showNext();
}, 3000);
//批量给小圆点绑定touch事件
for (var i = 0; i < circleLis.length; i++) {
    (function(i){
        circleLis[i].addEventListener('touchstart', function(){
            clearInterval(timer);
            setCurrentImage(i);//设置当前应该显示第几张
        }, false);
    })(i);
}
function setCurrentImage(_idx) {
    idx = _idx;
    prev = idx - 1;
    if (prev === -1) {
        prev = imageLis.length - 1;
    }
    next = idx + 1;
    if (next > imageLis.length - 1) {
        next = 0;
    }

    init(); //设置一下当前的图片合适的位置和小圆点合适的位置

    clearInterval(timer);
    timer = setInterval(function(){
        showNext();
    }, 3000);
}


var windowWidth;
init();
window.onresize = init;

function init() {
    windowWidth = document.documentElement.clientWidth;
    carousel.style.height =  windowWidth / (640 / 284) + 'px';

    for (var i = 0; i < imageLis.length; i++) {
        imageLis[i].style.webkitTransform = "translateX(" + windowWidth + 'px)';
    }

    changepic();
    setPoint();
}

//事件监听
carousel.addEventListener('touchstart', touchstartHandler, false);
carousel.addEventListener('touchmove', touchmoveHandler, false);
carousel.addEventListener('touchend', touchendHandler, false);

var startX, startTime;
function touchstartHandler(event) {
    event.preventDefault();
    clearInterval(timer);
    //记录偏移值
    startX = event.touches[0].clientX;
    console.log(startX);
    //记录时间戳
    startTime = new Date();
    console.log(startTime);
    imageLis[prev].style.transition = "none";
    imageLis[idx].style.transition = "none";
    imageLis[next].style.transition = "none";
}
function touchmoveHandler (event) {
    event.preventDefault();
    //得到坐标x
    var clientX = event.touches[0].clientX;
    console.log(clientX - startX);
    //改变图片的位置
    imageLis[idx].style.webkitTransform = "translateX(" + (clientX - startX) + 'px)';
    imageLis[next].style.webkitTransform = "translateX(" + (windowWidth + (clientX - startX)) + 'px)';
    imageLis[prev].style.webkitTransform = "translateX(" + (-windowWidth + (clientX - startX)) + 'px)';
}
function touchendHandler(event) {
    event.preventDefault();
    //判断滑动是否成功
    var distance = event.changedTouches[0].clientX - startX;
    console.log(distance);
    var time = new Date() - startTime;
    console.log(time);

    if (distance >= windowWidth/2 || (distance > 30 && time < 300)) {
        showPrev();
    } else if (distance <= -windowWidth/2 || (distance < -30 && time < 300)) {
        showNext();
    } else {
        //绝对值不到windowWidth/2
        console.log('不成功');

        //移动
        imageLis[prev].style.webkitTransform = "translateX(" + -windowWidth + 'px)';
        imageLis[idx].style.webkitTransform = "translateX(0px)";
        imageLis[next].style.webkitTransform = "translateX(" + windowWidth + 'px)';

        imageLis[prev].style.transition = "all 0.3s ease 0s";
        imageLis[next].style.transition = "all 0.3s ease 0s";
        imageLis[idx].style.transition = "all 0.3s ease 0s";
    }

    clearInterval(timer);
    timer = setInterval(function(){
        showNext();
    }, 3000);
}

function showPrev() {
    next = idx;
    idx = prev;
    prev--;
    if (prev < 0) {
        prev = imageLis.length - 1;
    }
    changepic();
    setPoint();
    imageLis[prev].style.transition = "none";
    imageLis[next].style.transition = "all 0.3s ease 0s";
    imageLis[idx].style.transition = "all 0.3s ease 0s";
}
function showNext() {
    console.log('向左滑动成功');
    //先改变信号量
    prev = idx;
    idx = next;
    next++;
    if (next > imageLis.length - 1) {
        next = 0;
    }
    changepic();
    setPoint();
    imageLis[prev].style.transition = "all 0.3s ease 0s";
    imageLis[idx].style.transition = "all 0.3s ease 0s";
    imageLis[next].style.transition = "none";
}
function changepic() {
    imageLis[idx].style.webkitTransform = "translateX(0px)";
    imageLis[next].style.webkitTransform = "translateX(" + windowWidth + 'px)';
    imageLis[prev].style.webkitTransform = "translateX(" + -windowWidth + 'px)';
}
function setPoint() {
    for (var i = 0; i < circleLis.length; i++) {
        circleLis[i].className = '';
    }
    circleLis[idx].className = 'cur';
}
// 导航
var navCont = document.querySelector('#navCont');
var navxhr = new XMLHttpRequest();
navxhr.onreadystatechange = function (){
    if (navxhr.readyState == 4 && navxhr.status == 200){
        var obj = JSON.parse(navxhr.responseText);
        var html = '';
        for(var i=0; i<obj.data.length;i++) {
            var objs = obj.data[i];
            html += '<li class="navigation"><a href="classify.html?goods_id='
                + objs.cat_id +'">' + objs.cat_name + '</a></li>';
            navCont.innerHTML = html;
        }
    }
}
navxhr.open('GET','http://h6.duchengjiu.top/shop/api_cat.php');
navxhr.send();
// 中间内容
var hostCont = document.querySelector('#hostCont');
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function (){
    if (xhr.readyState == 4 && xhr.status == 200){
        var obj = JSON.parse(xhr.responseText);
        var html = '';
        for(var i=0; i<obj.data.length;i++) {
            var objs = obj.data[i];
            html += '<li class="host-list"><a href="details.html?cat_id='
                + objs.cat_id+'"><img src="'+ objs.goods_thumb
                +'"><p><span>￥'+ objs.price +'</span></p></a></li>';
            hostCont.innerHTML = html;
        }
    }
}
xhr.open('GET','http://h6.duchengjiu.top/shop/api_goods.php?'+"&page="+1+"&pagesize="+10)
xhr.send();
// 推荐内容
var recCont = document.querySelector("#recCont")
var recxhr = new XMLHttpRequest();
recxhr.onreadystatechange = function (){
    if (recxhr.readyState == 4 && recxhr.status == 200){
        var obj = JSON.parse(recxhr.responseText);
        var html = '';
        for(var i=0; i<obj.data.length;i++) {
            var objs = obj.data[i];
            console.log(objs);
            html += '<li class="rec-list"><a href="details.html?cat_id='
                + objs.cat_id
                + '"><img src="'
                + objs.goods_thumb
                + '"><span class="rec-name">'
                + objs.goods_name +'</span><p><span class="rec-mo">￥'
                + objs.price
                + '</span><span class="rec-dd">当当自营</span></p></a></li>';
            recCont.innerHTML = html;
        }
    }
}
recxhr.open('GET','http://h6.duchengjiu.top/shop/api_goods.php?'+"&page="+3+"&pagesize="+50)
recxhr.send();
