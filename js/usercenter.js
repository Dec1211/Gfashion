/**
 * Created by bjwsl-001 on 2016/11/10.
 */
/*为所有的Date对象添加一个新的成员方法，转换为形如y-m-d h:m:s*/
Date.prototype.stringify=function(){
  var s=this.getFullYear()+'-';
  s+=(this.getMonth()+1)+'-';
  s+=this.getDate()+' ';
  s+=this.getHours()+':';
  s+=this.getMinutes()+':';
  s+=this.getSeconds();
  return s;
}

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

//功能点2：为附加导航中的项添加事件监听，进行内容切换
$("div.order_top>ul>li").click(function () {
  //修改li的.active的位置
  $(this).addClass("active").siblings(".active").removeClass("active");
  //修改右侧主体中的div的.acitve的位置
  var i=$("div.order_top>ul>li").index($(this));
  var div=$("div.chose_list>div:eq("+i+")");
  div.addClass("active").siblings(".active").removeClass("active");
})

//功能点3：异步请求当前登录用户的所有订单
$(function(){
  $.ajax({
    type:'POST',
    url:'data/order_select.php',
    data:{uname:sessionStorage['loginName']},
    success:function(orderList){
      var html='';
      $.each(orderList, function (i,orther) {
        html+=`
          <li>
            <div class="status">
              <p>${orther.status=='1'?'已付款':(orther.status=='2'?'待收货':'取消订单')}</p>
              <ul class="lf">
                <li class="orderTime">${orther.orderTime}</li>
                <li>${orther.rcvName}</li>
                <li>订单编号：${orther.orderNum}</li>
                <li>${orther.payment=='1'?'支付方式':(orther.payment=='2'?'Ecpsse':'MoneyGram')}</li>
              </ul>
              <span class="rf">订单总价：<b>$${orther.price}</b></span>
            </div>
            <div class="goods_list">
               <ul class="lf">`
                $.each(orther.productList,function(j,pro){
                  html+=`
                   <li class="order_pro">
                      <img src="${pro.pic}" alt="" class="lf"/>
                      <p class="lf">
                        <b>${pro.pname}</b><br/>
                        <span>$${pro.price}</span>
                      </p>
                   </li>
                  `
                })
               html+=`</ul>
               <div class="btn_look_detail rf">
                  <ul>
                    <li>商品</li>
                    <li>评价</li>
                    <li>购买</li>
                  </ul>
                </div>
            </div>
          </li>
        `
        $("div.order_list>ul").html(html);
      })
      //把所有的日期对应的数字转换为年月日格式
      var orderTime=$("li.orderTime");
      orderTime.each(function (i,timer) {
        var num=timer.innerHTML;
        var str=new Date(parseInt(num)).stringify();
        timer.innerHTML=str;
      });
    }
  })
})
