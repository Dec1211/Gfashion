/*功能点0：检验当前是否已经登录*/
if(!sessionStorage['loginName']){
  location.href = 'index.html'; //未登录的话跳转到登录页
}

//功能点1：页面加载完后，异步请求公用的页头也页尾
$(function(){
  $("div#head").load("header.php",function(){
    $("#nav div.content_auto div.nav>span").html("欢迎回来："+sessionStorage["loginName"]);
    //页面加载完成把默认页码传入数据库
    loadProductByPage(1,6,'sales');
    sessionStorage['chose']='sales';
  });
  $("div#bottom").load("footer.php");
})

//功能点2：显示隐藏遮罩层
$("div.produce_list>ul").on("mouseenter","div.pro_photo",function(){
  $(this).find("div.pro_cover").fadeIn();
  $("div.move").stop().animate({left:'30px'},250);
})
$("div.produce_list>ul").on("mouseleave","div.pro_photo",function(){
  $(this).find("div.pro_cover").fadeOut();
  $("div.move").stop().animate({left:'10px'},250);
})

//功能点3：点击a实现内容排序(按price/sales/review排序),并让a的背景变为橙色字体变为白色
$("ul.top_left").on("click","a",function(e){
  e.preventDefault();
  var chose=$(this).attr("data-chose");
  var pageSize=$("div.top_middle>select").val();
  sessionStorage['chose']=chose;
  loadProductByPage(1,pageSize,chose);
  $(this).addClass("checked").parent().siblings().children(".checked").removeClass("checked");
})

var pageSize=6;
//功能点4：选择列表商品个数6/9个
$("div.top_middle>select").change(function () {
  pageSize=$(this).val();
  var pageNum=sessionStorage['pageNum'];
  var chose=sessionStorage['chose'];
  loadProductByPage(pageNum,pageSize,chose);
})

//功能点5：用户点击分页条中的页号时，实现数据的异步加载
$("ol.pager").on("click","a",function(e){
  e.preventDefault();
  //获取要跳转的页号
  var chose=sessionStorage["chose"]
  var pageCount=parseInt(sessionStorage["pageCount"]);
  var pageNum=$(this).attr("href");
  pagerCorrelation(pageNum,pageCount,chose);
})

//功能点6：上下翻页
$("ul.top_right").on("click","a",function(e){
  e.preventDefault();
  var move=$(this).attr("data-move");
  var pageCount=parseInt(sessionStorage["pageCount"]);
  var pageNum=sessionStorage['pageNum'];
  var chose=sessionStorage["chose"];
  if(move=="left"&&pageNum>1){
    pageNum--;
  }
  else if(move=="right"&&pageNum<pageCount){
    pageNum++;
  }
  pagerCorrelation(pageNum,pageCount,chose);
})

//实现上下翻页和下部选择页数的关联
function pagerCorrelation(pageNum,pageCount,chose){
  if(pageNum==pageCount){
    $("a[data-move=right]").addClass("disabled");
  }
  else {
    $("a[data-move=right]").removeClass("disabled");
  }
  if(pageNum==1){
    $("a[data-move=left]").addClass("disabled");
  }
  else {
    $("a[data-move=left]").removeClass("disabled");
  }
  loadProductByPage(pageNum,pageSize,chose);
}

//分页加载商品数据，并动态创建分页
function loadProductByPage(pageNum,pageSize,chose){
  $.ajax({
    type: 'POST',
    url: 'data/pager.php',
    data:{pageNum:pageNum,pageSize:pageSize,chose:chose},
    success: function (pager) {
      //遍历读取到分页器对象，拼接HTML，追加到DOM树
      var html='';
      sessionStorage["pageCount"]=pager.pageCount;
      sessionStorage["pageNum"]=pager.pageNum;
      $.each(pager.data, function (i,p) {
        html+=`
          <li>
            <div class="pro_single">
              <div class="pro_photo">
                <img src="${p.pic}" alt=""/>
                <div class="pro_cover">
                  <div class="move">
                    <h1 data-detail="${p.pid}"></h1>
                    <h4 data-cart="${p.pid}"></h4>
                  </div>
                </div>
              </div>
              <div class="pro_single_detail">
                <h3 data-detail="${p.pid}">${p.pname}</h3>
                <p>$ ${p.price}</p>
                <a href="#" class="lf">+ 收藏</a>
                <a href="#" class="rf">+ 添加购物车</a>
              </div>
            </div>
          </li>
        `;
      })
      $("div.produce_list>ul").html(html);
      //根据返回的分页数据，动态创建分页条内容
      var html='';
      if(`${pager.pageNum-2}`>0&&`${pager.pageNum+1}`<`${pager.pageCount}`) {
        html+=`
					<li><a href="${pager.pageNum-2}">${pager.pageNum-2}</a></li>
					<li><a href="${pager.pageNum-1}">${pager.pageNum-1}</a></li>
					<li><a href="#" class="active">${pager.pageNum}</a></li>
					<li><a href="${pager.pageNum+1}">${pager.pageNum+1}</a></li>
					<li><a href="${pager.pageNum+2}">${pager.pageNum+2}</a></li>
				`;
      }
      else if(`${pager.pageNum}`==1){
        html+=`
					<li><a href="#" class="active">${pager.pageNum}</a></li>
					<li><a href="${pager.pageNum+1}">${pager.pageNum+1}</a></li>
					<li><a href="${pager.pageNum+2}">${pager.pageNum+2}</a></li>
					<li><a href="${pager.pageNum+3}">${pager.pageNum+3}</a></li>
					<li><a href="${pager.pageNum+4}">${pager.pageNum+4}</a></li>
				`;
      }
      else if(`${pager.pageNum}`==2){
        html+=`
					<li><a href="${pager.pageNum-1}">${pager.pageNum-1}</a></li>
					<li><a href="#" class="active">${pager.pageNum}</a></li>
					<li><a href="${pager.pageNum+1}">${pager.pageNum+1}</a></li>
					<li><a href="${pager.pageNum+2}">${pager.pageNum+2}</a></li>
					<li><a href="${pager.pageNum+3}">${pager.pageNum+3}</a></li>
				`;
      }
      else if(`${pager.pageNum}`==`${pager.pageCount}`){
        html+=`
					<li><a href="${pager.pageNum-4}">${pager.pageNum-4}</a></li>
					<li><a href="${pager.pageNum-3}">${pager.pageNum-3}</a></li>
					<li><a href="${pager.pageNum-2}">${pager.pageNum-2}</a></li>
					<li><a href="${pager.pageNum-1}">${pager.pageNum-1}</a></li>
					<li><a href="#" class="active">${pager.pageNum}</a></li>
				`;
      }
      else if(`${pager.pageNum}`==`${pager.pageCount-1}`){
        html+=`
					<li><a href="${pager.pageNum-3}">${pager.pageNum-3}</a></li>
					<li><a href="${pager.pageNum-2}">${pager.pageNum-2}</a></li>
					<li><a href="${pager.pageNum-1}">${pager.pageNum-1}</a></li>
					<li><a href="#" class="active">${pager.pageNum}</a></li>
					<li><a href="${pager.pageNum+1}">${pager.pageNum+1}</a></li>
				`;
      }
      $('ol.pager').html(html);
    }
  })
}

//功能点7：点击放大镜可以进入商品详情页，并传去数据
$("div.produce_list>ul").on("click","div.move>h1", function () {
  jump($(this));
})

//功能点8：点击商品名称可以进入商品详情页，并传去数据
$("div.produce_list>ul").on("click","div.pro_single_detail>h3", function () {
  jump($(this));
})

//实现点击放大镜、商品名可以进入商品详情页，并传去数据
function jump(pid){
  sessionStorage['pid']=pid.attr("data-detail");
  location.href="product_detail.html";
}

//功能点9：点击加入购物车可以实现数据库增加购物数量
$("div.produce_list>ul").on("click","div.move>h4",function(){
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
