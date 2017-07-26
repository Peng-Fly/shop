$(function () {
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem('token'),
        "type":"GET",
        "dataType":"json",
        "success":function (response) {
            console.log(response);
            var html = '';
            if (response.data.length > 0) {
                for (var i = 0;i<response.data.length;i++){
                    var obj = response.data[i];
                    obj.subtotal = parseInt(obj.goods_price)*parseInt(obj.goods_number);

                    html+='<div class="cars-conter" data-id="'
                        + obj.goods_id
                        +'"><div class="kuang"><input type="checkbox" class="ans"></div><img src="'
                        + obj.goods_thumb
                        +'"><div class="carts-cont"><p class="conter">'
                        + obj.goods_name
                        +'</p><p class="cart-mo">'
                        + obj.goods_price
                        +'</p><span>x1</span><div  class="delete" id="'+ obj.goods_id +'">删除</div></div></div>';
                    var section = document.querySelector('section');
                    section.innerHTML = html;
                }
                $('.ans').click(function(){
                    showOn();
                })
            }
        }
    })
})
// 判断复选框是否被选中

function showOn() {
    var trs = document.querySelectorAll('.ans');
    // console.log(trs);
    for (var i=0; i<trs.length; i++){
        var tr = trs[i];
        if ($(tr).is(':checked')){
            $(tr).parent('div').css('background-image',
                'url(./images/tuijian.png)');
        }else if($(tr).not(':checked')){
            $(tr).parent('div').css('background-image',
                'url(./images/kuang.png)');
        }
    }
}