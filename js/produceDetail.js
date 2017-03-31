/*内容切换*/
/*产品详情页*/

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

/*功能点2：选择对应标题切换对应内容*/
function change_content(){
	var $title=$("div.prdIntroduce>ul>li");
	var $content=$("div.prdIntroduce>div");
	$title.each(function(i){
		$(this).click(function(){
			$(this).attr("id","show_content").siblings("#show_content").attr("id","");
			$content.eq(i).show().siblings("div").hide();
		})
	})
}
change_content();

/*功能点3：放大镜系列功能*/
var zoom={
   MAXLEFT:170,
   MAXTOP:130,//保存mask可移动的最大坐标
   MLSIZE:130,
   MTSIZE:170,//保存mask的大小
   init:function(){
      //为id为icon_list添加鼠标进入代理，仅li下的img可响应事件，处理函数为changeImgs
      $("div#show_yy").on("click","div.show_y>ul>li img",this.changeImgs);
      //为id为superMask的div添加鼠标进入事件，设置id为mask的div显示，继续为其绑定鼠标移出事件，设置id为mask的div隐藏
		 	$("div#show_yy").on("mousemove","div#superMask",this.toggle);
		 	$("div#show_yy").on("mouseout","div#superMask",this.hiddenPhoto);
		  $("div#show_yy").on("mousemove","div#superMask",this.moveMask.bind(this));
		 	$("div#show_yy").on("mouseout","div#superMask",this.minPhoto);
      /*$("#superMask").hover(this.toggle,this.toggle).mousemove(this.moveMask.bind(this)).mouseout(this.minPhoto);*/
   },
	 hiddenPhoto:function(){
		 $("#mask").hide();
	 },
   toggle:function(){
      $("#mask").show();
      //获得mImg的src
	  var src=$("div.show_y>p").css("backgroundImage");
	  var i=src.indexOf('images');
	  var Src=src.slice(i);
	  var j=Src.lastIndexOf("jpg");
	  var s=Src.slice(0,j+3);
	  var d=Src.lastIndexOf(".");
      var newSrc=s.slice(0,d-1)+"o"+s.slice(d);
      $("div.show_y>p").css("backgroundImage","url("+newSrc+")");
   },
    moveMask:function(e){
        //获得鼠标相对于父元素的x
        var x=e.offsetX;
        //获得鼠标相对于父元素的y
        var y=e.offsetY;
        //计算mask的left为x-MSIZE/2
        var left=x-this.MLSIZE/2;
        //计算mask的top为y-MSIZE/2
        var top=y-this.MTSIZE/2;
        //如果left越界，改回边界值
        //left= left<0?0:left>this.MAXLEFT?this.MAXLEFT:left;
        //如果top越界，改回边界值
        top= top<0?0:top>this.MAXLEFT?this.MAXLEFT:top;
		left= left<0?0:left>this.MAXTOP?this.MAXTOP:left;
        //设置id为mask的元素的left为left，top为top
        $("#mask").css({
            left:left,
            top:top
        })
        //设置id为largeDiv的背景图片位置
        $("div.show_y>p").css("backgroundPosition",-left*1425/170+"px "+-top*1900/210+"px");
    },
    changeImgs:function(e){//根据小图片更换中图片路径
		  e.preventDefault();
        //获得目标元素的src属性，保存在变量src中
        var src=$(e.target).attr("src");  
        //查找src中最后一个.的位置i
        var i=src.lastIndexOf(".");
        //设置id为mImg的元素的src为：
        $("div.show_y>p").css("backgroundImage","url("+src.slice(0,i-1)+"x"+src.slice(i)+")");
        //src从刚开头-i拼上-m 拼上src从i到结尾
        //$("#largeDiv").css("background","url("+src.slice(0,i)+"-l"+src.slice(i)+")")
    },
	minPhoto:function(){
	  var src=$("div.show_y>p").css("backgroundImage");
	  var i=src.indexOf('images');
	  var Src=src.slice(i);
	  var j=Src.lastIndexOf("jpg");
	  var s=Src.slice(0,j+3);
	  var d=Src.lastIndexOf(".");
      var newSrc=s.slice(0,d-1)+"x"+s.slice(d);
      $("div.show_y>p").css({"backgroundImage":"url("+newSrc+")","backgroundPosition":"0 0"});
	}
}
zoom.init();

/*功能点4：接收商品id，根据id将详情页改成对应产品*/
$(function () {
    var pid=sessionStorage['pid'];
    $.ajax({
        type:'POST',
        url:'data/product_detail.php',
        data:{pid:pid},
        success: function (obj) {
            var html='';
            html=`
            	<div id="mask"></div>
							<div id="superMask"></div>
							<div class="show_y lf">
								<p class="lf" style="background-image:url('${obj.smImg}')"></p>
								<ul>
									<li>
										<a href="#"><img src="${obj.mdImg}"></a>
									</li>
									<li>
										<a href="#"><img src="${obj.mxImg}"></a>
									</li>
								</ul>
							</div>
							<div class="lf sexy">
								<h1>${obj.pname}</h1>
								<div class="jieshao">
									<ul class="star">
										<li>$ ${obj.price}</li>
										<li></li>
									</ul>
									<ul class="versace">
										<li><span>品牌:</span><span>Versace</span></li>
										<li><span>是否有货:</span><span>有货</span></li>
										<li><span>产品编码:</span><span>GF-123456</span></li>
									</ul>
									<h4>描述:</h4>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio atque possimus obcaecati facere harum in odit ab aspernatur itaque dolor debitis accusamus ea tempora iure molestiae libero sapiente nihil! Ullam?</p>
									<form class="choseDetail">
										<ul class="lf">
											<li>
												<h4>颜色:</h4>
											</li>
											<li>
												<select name="sleColor" id="sleColor">
													<option>--请选择--</option>
													<option>黑色</option>
													<option>青色</option>
												</select>
											</li>
										</ul>
										<ul class="lf">
											<li>
												<h4>尺码:</h4>
											</li>
											<li>
												<select name="sleColor" id="SIZE">
													<option>--请选择--</option>
													<option>X-small</option>
													<option>small</option>
												</select>
											</li>
										</ul>
									</form>
									<h6>
										<button id="add_to_cart">Add to Cart</button>
										<a href="#">+ 收藏</a>
										<a href="#">+ 添加购物车</a>
									</h6>
								</div>
							</div>
            `
            $("div#show_yy").html(html);
        }
    })
})

/*功能点5：点击加入购物车可以实现数据库增加购物数量*/
$("div.sexy").on("click","#add_to_cart", function () {
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
