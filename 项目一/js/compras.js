 $(function(){
        $.ajax({
            "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem('token'),
            "type": "GET",
            "dataType": "json",
            "success": function(response) {
                console.log(response);
                if (response.data.length > 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        var obj = response.data[i];
                        obj.subtotal = parseInt(obj.goods_price)*parseInt(obj.goods_number);
                        var tr = '<ul data-id="'+obj.goods_id+'">\
                  <li class="txt-one" style="width: 100px;">\
                    <input type="checkbox" class="chkbox" id="chec" checked="true">\
                  </li>\
                  <li class="txt-two"><img src="'+obj.goods_thumb+'" />'+obj.goods_name+'</li>\
                  <li class="txt-three"><span class="operate minus" id="minus-'+obj.goods_id+'">-</span><input type="text" value="'+obj.goods_number+'" class="goods_number" /> <span class="plus"'+obj.goods_id+'>+</span></li>\
                  <li class="txt-four">'+obj.goods_price+'</li>\
                  <li class="txt-five" id="subtotal'+obj.goods_id+'">'+obj.subtotal+'</li>\
                  <li class="txt-six" id="date">删除</li>\
                </ul>';
                        $('#shoppingcarList').append($(tr));
                    }
                    var goods_id = '';
                    $('ul').click(function (event) {
                        console.log(event);
                        event  = event || window.event;
                        var target = event.target || event.srcElement;
                        if (target.innerText == "+"){
                            var oNumber = $(target).prev();
                            var number = oNumber.val();
                            if(++number>10){
                                number=10;
                            }
                            oNumber.val(number);
                            var price = parseInt($(event.target).parent().next().text());
                            console.log(price);
                            var oSubtotal = $(event.target).parent().next().next();
                            console.log(oSubtotal);
                            var subtotal = price * number;
                            oSubtotal.text(subtotal);
                            showSum();
                            return;
                        }
                        if (target.innerText == "-"){
                            var oNumber = $(target).next();
                            var number = oNumber.val();
                            if(--number<0){
                                number=0;
                            }
                            oNumber.val(number);
                            var price = parseInt($(event.target).parent().next().text());
                            console.log(price);
                            var oSubtotal = $(event.target).parent().next().next();
                            console.log(oSubtotal);
                            var subtotal = price * number;
                            oSubtotal.text(subtotal);
                            showSum();
                             goods_id = $(event.target).parent().attr('data-id');
                            return;
                        }
                        if(target.innerText === "删除"){
                            var us = $(event.target)[0].parentNode;
                            goods_id = $(event.target).parent().attr('data-id');
                            console.log(us);
                            $("#shoppingcarList")[0].removeChild(us);
                            $.ajax({
                                "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
                                "type":"POST",
                                "data":{
                                    "goods_id":goods_id,
                                    "number":0
                                },
                                "dataType":"json",
                                "success":function (response) {
                                    console.log(response);
                                }
                            })
                        }
                        if(target.id === 'selectAll'){
                            var selected = target.checked;
                            var checkboxs = document.getElementsByClassName('chkbox');
                            for (var i = 0; i < checkboxs.length; i++){
                                checkboxs[i].checked = selected;
                            }
                            showSum();
                        }
                    })
                    showSum();
                }
            }
        });
    });
$('date').click(function (event) {
    event=event||window.event
})
 function checkSelectAll() {
     var goods_count = $('input:checkbox').filter('[class = "chkbox"]').length;
     if($('input:checkbox').filter('[class = "chkbox"]').filter(":checked").length !== goods_count) {
         $('#selectAll').prop('checked', false);
     } else {
         $('#selectAll').prop('checked', true);
     }
 }
function showSum() {
    var trs = $('#shoppingcarList ul:gt(0)');
    var sum = 0;
    for (var i = 0; i < trs.length; i++) {
        var ul = trs[i];
        //判断一下当前行的选中框是否选中，如果选中则计算到总价中;
        if ($(ul).children("li:first").children("input:checkbox").is(':checked')) {
            sum += parseInt($(ul).children('li:eq(4)').text());
        }
    }
    $('#payMoneyTxt').text(sum);
}
$('#checkouBtn').click(function () {
    location.href='address.html';
})