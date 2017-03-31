/*功能点0：检验当前是否已经登录*/
if (!sessionStorage['loginName']) {
  location.href = 'index.html'; //未登录的话跳转到登录页
}

//功能点1：页面加载完后，异步请求公用的页头也页尾
$(function () {
  $("div#head").load("header.php", function () {
    $("#nav div.content_auto div.nav>span").html("欢迎回来：" + sessionStorage["loginName"]);
    //如果购物车为空，显示It seems your shopping cart is empty, try looking our products.
    if ($("#shopcatTbody").html()== "") {
      $("#empty").css("display", "block");
    }

  });
  $("div#bottom").load("footer.php");
})

//功能点2：异步请求当前登录用户的购物车内容
$(function () {
  $.ajax({
    type:'POST',
    url:'data/cartlist.php',
    data:{uname:sessionStorage['loginName']},
    success:function(list){
      var html='';
      var totalPrice=0;
      $.each(list,function(i,p){
        totalPrice+=parseInt(p.price*p.count);
        html+=`
          <tr valign="middle" align="center">
						<td><img src="${p.pic}"><a href="#">${p.pname}</a></td>
					  <td>
							<span class="unit_price">$${p.price}</span>
						</td>
						<td>
							<div class="changeMath">
								<i class="reduce" data-did="${p.did}"></i>
								<span>${p.count}</span>
							  <b class="add" data-did="${p.did}"></b>
						  </div>
						</td>
						<td>
							<span class="total_prices">$${(p.count*p.price).toFixed(2)}</span>
						</td>
						<td>
							<a href="${p.did}" class="deleted"></a>
						</td>
					</tr>
        `
      })
      $("#shopcatTbody").html(html);
      $("#grandTotal").html("$"+(totalPrice).toFixed(2));
      if($("#shopcatTbody").html()!= "") {
        $("#empty").css("display", "none");
      }
    }
  })
})


/*功能点3：点击 + -按钮，修改购买数量，异步提交到服务器端*/
//客户端修改(减少)
$("#shopcatTbody").on("click", "i.reduce", reduce);
function reduce(e) {
  var $target = $(e.target);
  var span = $target.next();
  var n = span.html();
  var did=$target.attr("data-did");
  if (n > 1) {
    n--;
  }
  span.html(n);
  totalPrices(n, $target);
  //服务器端修改
  $.ajax({
    type:'POST',
    url:'data/cart_update.php',
    data:{count:n,did:did}
  })
}

//客户端修改(增加)
$("#shopcatTbody").on("click", "b.add", add);
function add(e) {
  var $target = $(e.target);
  var span = $target.prev();
  var n = span.html();
  var did=$target.attr("data-did");
  n++;
  span.html(n);
  totalPrices(n, $target);
  //服务器端修改
  $.ajax({
    type:'POST',
    url:'data/cart_update.php',
    data:{count:n,did:did}
  })
}
function totalPrices(n, target) {
  var total = target.parent().parent().next().children(".total_prices");
  var unitPrice = target.parent().parent().prev().children(".unit_price").html().slice(1);
  var subTotal = n * unitPrice;
  total.html("$" + (subTotal).toFixed(2));
  grandTotal();
}

//客户端修改(删除)
$("#shopcatTable").on( "click","tr>td:last-child a.deleted", delected);
function delected(e) {
  e.preventDefault();
  var $target = $(e.target);
  var deleted = $target.parent().parent();
  var did=$target.attr("href");
  //服务器端修改
  $.ajax({
    type:'POST',
    url:'data/cart_delete.php',
    data:{did:did},
    success:function(txt){
      if(txt=='succ'){
        deleted.remove();
        //如果购物车为空，显示It seems your shopping cart is empty, try looking our products.
        if ($("#shopcatTable>tbody>tr").length == 0) {
          $("#empty").css("display", "block");
        }
        grandTotal();
      }
      else if(txt=='err'){
        alert("删除失败");
      }
    }
  })
}
function grandTotal() {
  var price = $("#shopcatTable span.total_prices");
  var sum = 0;
  for (var i = 0; i < price.length; i++) {
    var n = Number(($(price[i]).html()).slice(1));
    sum += n;
  }
  $("#grandTotal").html("$" + (sum).toFixed(2));
}
function total() {
  /*var $unit=$("span.unit_price");
   for(var i=0;i<$unit.length;i++){
   var $total=$($unit[i]).parent().parent().find("span.total_prices");
   $total.html($($unit[i]).html());
   }*/
  var $unit = $("span.unit_price");
  $unit.each(function (i) {
    $(this).parent().parent().find("span.total_prices").html(($(this).html()));
  });
  var price = $("#shopcatTable span.total_prices");
  var sum = 0;
  for (var i = 0; i < price.length; i++) {
    var n = Number(($(price[i]).html()).slice(1));
    sum += n;
  }
  $("#grandTotal").html("$" + sum);
}
$(total());

//点击提交订单按钮，进入checkout
$("#Grand_Total button").click(function () {
  location.href='checkout.html';
})