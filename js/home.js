/*功能点0：检验当前是否已经登录*/
if(!sessionStorage['loginName']){
  location.href = 'index.html'; //未登录的话跳转到登录页
}

//功能点1：页面加载完后，异步请求公用的页头也页尾
$(function(){
  $("div#head").load("header.php",function(){
    $("#nav div.content_auto div.nav>span").html("欢迎回来："+sessionStorage["loginName"]);
  });
  $("div#bottom").load("footer.php");
})

//功能点2：div翻转
/*$("ul.baner>li").hover(function(){
  $(this).find("div.info").stop().animate({width:0},100,function(){
    $(this).hide().next().show();
    $(this).next().animate({width:"100%"},100);
  })
},function(){
  $(this).find("div.infoo").stop().animate({width:0},100,function(){
    $(this).hide().prev().show();
    $(this).prev().animate({width:"100%"},100);
  })
})*/

//功能点3：男士专区遮罩层
$(document).ready(function(){
  $("ul.msingle_p").on("mouseenter",".img",function(){
    $(this).addClass("hover");
  })
  $("ul.msingle_p").on("mouseleave",".img",function(){
    $(this).removeClass("hover");
  })
});

//功能点4：男士专区衣服移动
var move={
  moved:0,//保存左移的li个数
  WIDTH:223,//保存每个li的宽度
  MAXli:5,//在ul中可出现的li个数
  MAX:2,//保存可左移的最多li个数
  init:function(){
    //this.MAX=$("ul.msingle_p>li").length-this.MAXli;
    $(".arrivals").on("click","span",this.move.bind(this));
  },
  move:function(e){//移动一次
    var $target=$(e.target);
    var btnClass=$target.attr("id");
    if(btnClass.indexOf("disable")==-1){
      this.moved+=(btnClass=="m_right")?-1:1;
      $("ul.msingle_p").animate({"left":this.moved*this.WIDTH},250);
    }
    this.check();
  },
  check:function(){
    var left=$("span[id^=m_left]");
    var right=$("span[id^=m_right]");
    if(this.moved==0){
      left.attr("id","m_left_disable");
    }
    else if(this.moved==-this.MAX){
      right.attr("id","m_right_disable");
    }
    else {
      left.attr("id","m_left");
      right.attr("id","m_right");
    }
  }
}
move.init();

//功能点5：异步加载男装产品图，产品价格
$(function(){
  var style='man';
  $.ajax({
    type:'POST',
    url:'data/common.php',
    data:{style:style},
    success: function (obj) {
      var html='';
      $.each(obj,function(i,p){
        html+=`
          <li>
            <div class="container">
              <div class="effects clearfix">
                <div class="img">
                  <img src="${p.pic}" alt=""/>
                  <div class="overlay">
                    <a href="#" class="expand" data-cart="${p.pid}">+</a>
                  </div>
                </div>
              </div>
            </div>
            <h3>${p.pname}</h3>
            <b>$ ${p.price}</b>
          </li>
        `
      })
      $("ul.msingle_p").html(html);
    }
  })
})

//功能点6：点击男士图片上的添加购物车，将商品添加入购物车
$("ul.msingle_p").on("click","a.expand",function(e){
  e.preventDefault();
  sessionStorage['pid']=$(this).attr('data-cart');
  $.ajax({
    type:'POST',
    url:'data/cart_add.php',
    data:{uname:sessionStorage['loginName'],pid:sessionStorage['pid']},
    success: function () {
      $("#cart_model").fadeIn();
      $("#ensure").click(function(){
        $("#cart_model").fadeOut();
      })
    }
  })
})
