//每个页面都需要用到的动画JS

//功能点1：遮罩层显示隐藏
$("ul.single_p").on("mouseenter","li>img",function(){
  $(this).siblings("div.cover_box").fadeIn();
})
$("ul.single_p").on("mouseleave","li",function(){
  $(this).find("div.cover_box").fadeOut();
})

//功能点2：鼠标移到a上div显示
$("div#head").on("mouseenter","a.nexShow",function(){
  $(this).animate({paddingBottom:"26px"},250);
  $("#manplace").stop().animate({height:"330px"},200);
})
$("div#head").on("mouseleave","a.nexShow",function(){
  $(this).animate({paddingBottom:"7px"},250);
  $("#manplace").stop().animate({height:"0"},200);
})
$("div#head").on("mousemove","div.coverProduce",function(){
  $(this).stop().css("height","330px");
})
$("div#head").on("mouseleave","div.coverProduce",function(){
  $("#manplace").stop().animate({height:"0"},200);
})

//功能点3：女士专区衣服移动
var move={
  moved:0,//保存左移的li个数
  WIDTH:285,//保存每个li的宽度
  MAXli:4,//在ul中可出现的li个数
  MAX:3,//保存可左移的最多li个数
  init:function(){
    //this.MAX=$("ul.single_p>li").length-this.MAXli;
    $(".special_p").on("click","span",this.move.bind(this));
  },
  move:function(e){//移动一次
    var $target=$(e.target);
    var btnClass=$target.attr("class");
    if(btnClass.indexOf("disable")==-1){
      this.moved+=(btnClass=="p_right")?-1:1;
      $("ul.single_p").animate({"left":this.moved*this.WIDTH},250);
      //console.log(this.moved);
    }
    this.check();
  },
  check:function(){
    var left=$("span[class^=p_left]");
    var right=$("span[class^=p_right]");
    if(this.moved==0){
      left.attr("class","p_left_disable");
    }
    else if(this.moved==-this.MAX){
      right.attr("class","p_right_disable");
    }
    else {
      left.attr("class","p_left");
      right.attr("class","p_right");
    }
  }
}
move.init();

//功能点4：页面滚动到500，返回顶部图标按钮出现
$(window).scroll(function(){
  if($(this).scrollTop()>=500){
    $("div#to_top").fadeIn();
  }
  else{
    $("div#to_top").fadeOut();
  }
});

//功能点5：点击购物车图标跳转到购物车页面
$("#head").on("click","a#go_cart",function(e){
  e.preventDefault();
  location.href="cart.html";
})

//功能点5-1：点击个人中心图标跳转到个人中心页面
$("#head").on("click","a#go_center",function(e){
  e.preventDefault();
  location.href="usercenter.html";
})

//功能点6：点击HOME可以返回主页
$("div#head").on("click","a#home",function(e){
  e.preventDefault();
  location.href="home.html";
})

//功能点7：点击产品放大镜可以跳转到产品详情页
$("ul.single_p").on("click",'h1.pro_refer',function(){
  sessionStorage['pid']=$(this).attr("data-detail");
  location.href="product_detail.html";
})

//功能点8：点击按钮，悠悠回到顶部
$("div#bottom").on("click","div#to_top>a",function(e){
  e.preventDefault();
  $("html,body").animate({scrollTop:0},1000);
})

//功能点9：异步加载女装产品图，产品价格
$(function(){
  var style='women';
  $.ajax({
    type:'POST',
    url:'data/common.php',
    data:{style:style},
    success: function (obj) {
      var html='';
      $.each(obj,function(i,p){
        html+=`
          <li>
            <img src="${p.pic}" alt=""/>
            <h3>${p.pname}</h3>
            <b>$ ${p.price}</b>
            <p><a href="#" class="lf">+收藏</a><a href="#" class="rf">+加入购物车</a></p>
            <div class="cover_box">
              <h1 class="pro_refer" data-detail="${p.pid}"></h1>
              <h4 data-cart="${p.pid}" class="add_cart"></h4>
            </div>
          </li>
        `
      })
      $("ul.single_p").html(html);
    }
  })
})

//功能10：点击go to shopping按钮去到productlist页面
$("#head").on("click","#go_to_shopping",function(){
  location.href="productlist.html";
})

//功能11：鼠标移入show_more div，show_more背景变色，文字变色，边框变色，鼠标移出恢复原样
$("#bottom").on("mouseenter","#show_more", function () {
  $(this).css({'background':'#000','color':'#FA6F57'});
  $(this).find("b").css({'borderColor':'#FA6F57','color':'#FA6F57'});
})
$("#bottom").on("mouseleave","#show_more", function () {
  $(this).css({'background':'#1F1F1F','color':'#919191'});
  $(this).find("b").css({'borderColor':'#919191','color':'#919191'});
})

//功能12：点击遮罩层上的购物车图标，可将商品加入购物车
$("ul.single_p").on("click","h4.add_cart",function(){
  sessionStorage['pid']=$(this).attr('data-cart');
  $.ajax({
    type:'POST',
    url:'data/cart_add.php',
    data:{uname:sessionStorage['loginName'],pid:sessionStorage['pid']},
    success: function () {
      $("#cart_model").fadeIn();
      $("#ensure").click(function(){
        $("#cart_model").fadeOut();
        //点击确定后，立即更新购物车DOM树
        updateCart();
      })
    }
  })
})

function updateCart(){
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
}
