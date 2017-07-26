var searchBtn = document.querySelector('.dian');
if (searchBtn){
    searchBtn.addEventListener('click',function () {
        var searchText = document.querySelector('#searchText').value;
        location.href = 'search.html?search_text='+searchText;
    })
}

var searchTxt = $.getQueryString('search_text');
console.log(searchTxt);

    var oSearchText = document.getElementById('searchText');
oSearchText.value = searchTxt;
serchGoods();
var souCont = document.querySelector('#souCont');

function serchGoods() {
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_goods.php?search_text="+searchTxt,
        "type":"GET",
        "dataType":"json",
        "success":function (response) {
            if(searchTxt == null){
                var htmls = ""
                htmls += '<div class="host"><h4>热门搜索</h4><a href="search.html?search_text=家居">家居</a><a href="search.html?search_text=文具">文具</a><a href="search.html?search_text=书">书</a><a href="search.html?search_text=美食">美食</a><a href="search.html?search_text=驱蚊">驱蚊</a><a href="search.html?search_text=热水壶">热水壶</a><a href="search.html?search_text=杯">杯</a><a href="search.html?search_text=音箱">音箱</a></div>';
                souCont.innerHTML=htmls;
                return;
            }else if(response.data.length == 0){
                var oh = document.createElement('h5');
                oh.innerHTML = "暂无此搜索！";
                souCont.appendChild(oh);
                return;
            }
            var html = "";
            for(var i =0;i<response.data.length;i++){
                var obj = response.data[i];
                html += '<li class="rec-list"><a href="details.html?goods_id='
                    + obj.goods_id
                    + '"><img src="'
                    + obj.goods_thumb
                    + '"><span class="rec-name">'
                    + obj.goods_name +'</span><p><span class="rec-mo">￥'
                    + obj.price
                    + '</span><span class="rec-dd">当当自营</span></p></a></li>';
                souCont.innerHTML = html;
            }
        }

    })
}