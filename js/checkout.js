/**
 * Created by bjwsl-001 on 2016/11/5.
 */
if (!sessionStorage['loginName']) {
  location.href = 'index.html'; //未登录的话跳转到登录页
}

//功能点1：页面加载完后，异步请求公用的页头也页尾
$(function () {
  $("div#head").load("header.php", function () {
    $("#nav div.content_auto div.nav>span").html("欢迎回来：" + sessionStorage["loginName"]);
  });
  $("div#bottom").load("footer.php");
})

/*功能点2：鼠标移入移出标题，i与span变色*/
$("ul.checkout_detail>li").on("mouseenter","p.title", function () {
  $(this).children('i').css({background:'#1D1D1D',color:"#fff"});
  $(this).children('span').css({color:'#FA6F57'});
})
$("ul.checkout_detail>li").on("mouseleave","p.title", function () {
  $(this).children('i').css({background:'#E3E3E3',color:"#999"});
  $(this).children('span').css({color:'#999'});
})

/*功能点3：点击标题，打开下个兄弟内容，并且关闭其他内容(手风琴效果)*/
$("ul.checkout_detail>li").on("click","p.title", function () {
  if($(this).hasClass("openPages")){
    $(this).removeClass("openPages").addClass("closePages");
    $(this).next().removeClass("showPages").addClass("hiddenPages");
  }
  else {
    if($(this).parent().siblings().children().hasClass("openPages")){
      $(this).parent().siblings().children().removeClass("openPages").addClass("closePages");
      $(this).parent().siblings().find(".showPages").removeClass("showPages").addClass("hiddenPages");
    }
    $(this).removeClass("closePages").addClass("openPages");
    $(this).next().removeClass("hiddenPages").addClass("showPages");
  }
})

/*功能点4：点击Continue按钮，打开下个标题中的内容，并且关闭自己的内容*/
$("ul.checkout_detail>li").on("click","button.nextContent", function () {
  var content=$(this).parent().parent().parent();
  var title=$(this).parent().parent().parent().prev();
  var nexttitle=$(this).parent().parent().parent().parent().next().children("p");
  var nextcontent=$(this).parent().parent().parent().parent().next().children("div")
  title.removeClass("openPages").addClass("closePages");
  content.removeClass("showPages").addClass("hiddenPages");
  nexttitle.removeClass("closePages").addClass("openPages");
  nextcontent.removeClass("hiddenPages").addClass("showPages");
})

/*功能点5：点击continue shopping按钮回到产品列表页*/
$("button#continue_shop").click(function () {
  location.href='productlist.html';
})

/*功能点6：根据当前登录用户名，查询其购物车内容*/
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
            <td>
              <img src="${p.pic}">
              <a href="#">${p.pname}</a>
            </td>
            <td>
              <span class="unit_price">$${p.price}</span>
            </td>
            <td>
              <div class="changeMath">
                <span>×${p.count}</span>
              </div>
            </td>
            <td>
              In Store
            </td>
         </tr>
        `
      })
      $("#shopcatTbody").html(html);
      $("div.billing_detail h2>span").html("$"+(totalPrice).toFixed(2));
      //精简购物车详情数组，编码为json字符串，赋值给input[productList]隐藏域用于表单提交
      $.each(list, function (i,p) {//只保留productId与count
        delete(p.did);
        delete(p.cartId);
        delete(p.pname);
        delete(p.price);
        delete(p.pic);
      })
      var str=JSON.stringify(list);//把JS数组编码为JSON字符串
      $("input[name=productList]").val(str);
      $("input[name=price]").val(totalPrice);
    }
  })
})

/*功能点:7：点击checkout按钮提交订单，提交成功后弹出摸态框显示订单编号并且点击确定按钮后会跳到用户中心*/
$("#go_checkout").click(function () {
  $("input[name=uname]").val(sessionStorage['loginName']);
  var data=$("#form-order").serialize();
  $("div.orderNum_model").css('display','block');
  var html="";
  $.ajax({
    type:'POST',
    url:'data/order_add.php',
    data:data,
    success: function (res) {
      html=`<p>Order submission success!<br/>Order number : <a>${res.orderNum}</a></p>
            <button id="ensure">Ensure</button>`
      if(res.msg=='succ'){
        $("div.orderNum_model").fadeIn();
        $("div.orderNum_model").html(html);
        $("div.orderNum_model").on("click","#ensure",function () {
          location.href='usercenter.html';
        })
      }
    }
  })
})