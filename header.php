<?php
    header('Content-Type:text/html;charset=UTF-8');
?>

<nav id="nav">
			<div class="content_auto">
				<p class="lf">
					<u></u>
					<b>+444 (100) 1234</b>
					<i>(周一 —— 周五: 09.00 - 21.00)</i>
				</p>
				<div class="nav rf">
					<span class="lf"></span>
					<div class="lf">
						<form>
							<input name="txtSerch" type="test" placeholder="搜索" title="请输入此字段。"/>
						</form>
					</div>
					<p class="lf">
						<a href="#" id="go_center"></a>
					</p>
					<p class="lf">
						<a href="#" id="go_cart"></a>
					</p>
				</div>
			</div>
		</nav>
		<header id="header">
			<div class="content_auto">
				<!-- logo -->
				<a href="#" class="lf"></a>
				<div class="rf">
					<!-- 选择国家和货币 -->
					<div class="country_money">
						<ul class="rf">
							<li>
								<a href="#">CHN</a>
							</li>
							<li>
								<a href="#" class="change_color">EN</a>
							</li>
							<li>
								<a href="#" class="change_color">DE</a>
							</li>
							<li>
								<a href="#">￥</a>
							</li>
							<li>
								<a href="#" class="change_color">$</a>
							</li>
							<li>
								<a href="#" class="change_color">€</a>
							</li>
						</ul>
					</div>
					<!-- 我的账单、心愿单、结账、退出 -->
					<div class="my_manage rf">
						<ul>
							<li>
								<a href="#">我的账单</a>
							</li>
							<li>
								<a href="#">收藏夹</a>
							</li>
							<li>
								<a href="#">结账</a>
							</li>
							<li>
								<a href="#">退出</a>
							</li>
						</ul>
					</div>
				</div>
				<!-- 主页、女人馆、男人馆、新品选购、店铺、联系我们、买我！ -->
				<ul id="navigation">
					<li>
						<a href="home.html" id="home" class="change_color active">主页</a>
					</li>
					<li>
						<a href="productlist.html" class="change_color">潮流馆</a>
					</li>
					<li>
						<a href="productlist.html" class="change_color nexShow" data-aos="fade-down">男人装</a>
						<div id="manplace" class="coverProduce">
							<ul class="clothing lf">
								<li>CLOTHING</li>
								<li><a href="#"> Casual Wear</a></li>
								<li><a href="#"> Evening Wear</a></li>
								<li><a href="#"> Formal Attire</a></li>
								<li><a href="#"> Womens Jeans</a></li>
								<li><a href="#"> Mens Jean</a></li>
								<li><a href="#"> Fall Styles</a></li>
							</ul>
							<ul class="accessories lf">
								<li>ACCESSORIES</li>
								<li><a href="#"> Casual Wear</a></li>
								<li><a href="#"> Evening Wear</a></li>
								<li><a href="#"> Formal Attire</a></li>
								<li><a href="#"> Womens Jeans</a></li>
								<li><a href="#"> Mens Jean</a></li>
								<li><a href="#"> Fall Styles</a></li>
							</ul>
							<ul class="brands lf">
								<li>BRANDS</li>
								<li><a href="#"> Casual Wear</a></li>
								<li><a href="#"> Evening Wear</a></li>
								<li><a href="#"> Formal Attire</a></li>
								<li><a href="#"> Womens Jeans</a></li>
								<li><a href="#"> Mens Jean</a></li>
								<li><a href="#"> Fall Styles</a></li>
							</ul>
							<div class="lf">
								<img src="images/index/slide1.jpg">
								<h3>FEATURED PRODUCTS</h3>
								<p>Lorem ipsum dolor sit, consectetur adipiscing elit. Etiam neque velit, blandit sed scelerisque.</p>
								<button id="go_to_shopping">go to show→</button>
							</div>
						</div>
					</li>
					<li>
						<a href="productlist.html" class="change_color">新品选购</a>
					</li>
					<li>
						<a href="productlist.html" class="change_color">店铺</a>
					</li>
					<li>
						<a href="productlist.html" class="change_color">联系我们</a>
					</li>
					<li>
						<a href="productlist.html" class="change_color">关于我们</a>
					</li>
				</ul>
			</div>
		</header>