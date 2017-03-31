SET NAMES UTF8;
DROP DATABASE IF EXISTS gfashion;
CREATE DATABASE gfashion CHARSET=UTF8;
USE gfashion;

CREATE TABLE shopping_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32)
);

INSERT INTO shopping_user VALUES(1,"root","123456");

CREATE TABLE shopping_product(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	pname VARCHAR(255),
	price VARCHAR(255),
	pic VARCHAR(255),
	sales FLOAT,
	review FLOAT,
	style VARCHAR(255),
	smImg VARCHAR(255),
	mdImg VARCHAR(255),
	mxImg VARCHAR(255)
);
INSERT INTO shopping_product VALUES
(1,"Aigle Men's Searock Raincoat",310.00,"images/productList/000095-0014_2_t.jpg",100,50,"man","images/productDetail/000095-0014_2_x.jpg","images/productDetail/000095-0014_2_t.jpg","images/productDetail/1_t.jpg"),
(2,"INCEPTOS ORCI HAC LIBERO",110.00,"images/productList/000312-2259_1_t.jpg",1210,4576,"shoes","images/productDetail/000312-2259_1_x.jpg","images/productDetail/000312-2259_1_t.jpg","images/productDetail/2_t.jpg"),
(3,"Love & Lies Women's May Dress",421.00,"images/productList/103314-0735_1_t.jpg",170,761,"women","images/productDetail/103314-0735_1_x.jpg","images/productDetail/103314-0735_1_t.jpg","images/productDetail/3_t.jpg"),
(4,"Wood Wood Women's Rosa Dress",325.00,"images/productList/103314-0735_2_t.jpg",1640,57,"women","images/productDetail/103314-0735_2_x.jpg","images/productDetail/103314-0735_2_t.jpg","images/productDetail/4_t.jpg"),
(5,"Noa Noa Women's Merino Dress",264.00,"images/productList/104331-0014_1_t.jpg",1100,510,"women","images/productDetail/104331-0014_1_x.jpg","images/productDetail/104331-0014_1_t.jpg","images/productDetail/5_t.jpg"),
(6,"Kaporal Men's Nayo Jacket",278.00,"images/productList/105797-1056_1_t.jpg",107,205,"man","images/productDetail/105797-1056_1_x.jpg","images/productDetail/105797-1056_1_t.jpg","images/productDetail/6_t.jpg"),
(7,"Derhy Women's Boogie Dress",312.00,"images/productList/116796-0001_1_t.jpg",154,576,"women","images/productDetail/116796-0001_1_x.jpg","images/productDetail/116796-0001_1_t.jpg","images/productDetail/7_t.jpg"),
(8,"Tommy Hilfiger Men's Down Parka Coat",673.00,"images/productList/217360-0014_1_t.jpg",110,501,"man","images/productDetail/217360-0014_1_x.jpg","images/productDetail/217360-0014_1_t.jpg","images/productDetail/8_t.jpg"),
(9,"Blend Men's 20701480 Jacket",135.00,"images/productList/217365-0014_1_t.jpg",167,576,"man","images/productDetail/217365-0014_1_x.jpg","images/productDetail/217365-0014_1_t.jpg","images/productDetail/9_t.jpg"),
(10,"Wood Wood Women's Rita Trouser",673.00,"images/productList/220008-0054_1_t.jpg",176,5434,"women","images/productDetail/220008-0054_1_x.jpg","images/productDetail/220008-0054_1_t.jpg","images/productDetail/10_t.jpg"),
(11,"INCEPTOS ORCI HAC LIBERO",135.00,"images/productList/255615-0014_1_t.jpg",5434,204,"cap","images/productDetail/255615-0014_1_x.jpg","images/productDetail/255615-0014_1_t.jpg","images/productDetail/11_t.jpg"),
(12,"CINQUE Women's Cilaila Coat",264.00,"images/productList/256479-0014_1_t.jpg",27,271,"women","images/productDetail/256479-0014_1_x.jpg","images/productDetail/256479-0014_1_t.jpg","images/productDetail/12_t.jpg"),
(13,"CINQUE Men's Cishuffle Jacket",572.00,"images/productList/271865-0286_1_t.jpg",286,210,"man","images/productDetail/271865-0286_1_x.jpg","images/productDetail/271865-0286_1_t.jpg","images/productDetail/13_t.jpg"),
(14,"CINQUE Men's Cioxford Coat",315.00,"images/productList/271866-0014_1_t.jpg",2057,201,"man","images/productDetail271866-0014_1_x.jpg","images/productDetail/271866-0014_1_t.jpg","images/productDetail/14_t.jpg"),
(15,"minimum Women's Chanella Dress",457.00,"images/productList/278638-0083_1_t.jpg",576,571,"women","images/productDetail/278638-0083_1_x.jpg","images/productDetail/278638-0083_1_t.jpg","images/productDetail/15_t.jpg"),
(16,"Filippa K Women's Plissã Skirt",426.00,"images/productList/430041-0014_1_t.jpg",2757,416,"women","images/productDetail/430041-0014_1_x.jpg","images/productDetail/430041-0014_1_t.jpg","images/productDetail/16_t.jpg"),
(17,"ICHI Women's Merci LS2 Jumper",793.00,"images/productList/582120-0029_1_t.jpg",2104,271,"women","images/productDetail/582120-0029_1_x.jpg","images/productDetail/582120-0029_1_t.jpg","images/productDetail/17_t.jpg"),
(18,"ICHI Women's Sebba JA Coat",164.00,"images/productList/589550-0014_1_t.jpg",1272,304,"women","images/productDetail/589550-0014_1_x.jpg","images/productDetail/589550-0014_1_t.jpg","images/productDetail/18_t.jpg"),
(19,"Kaporal Men's Naruk Jacket",168.00,"images/productList/634082-0014_1_t.jpg",112,721,"man","images/productDetail/634082-0014_1_x.jpg","images/productDetail/634082-0014_1_t.jpg","images/productDetail/19_t.jpg"),
(20,"Kaporal Men's Nono Jacket",421.00,"images/productList/677326-0014_1_t.jpg",75,341,"man","images/productDetail/677326-0014_1_x.jpg","images/productDetail/677326-0014_1_t.jpg","images/productDetail/20_t.jpg"),
(21,"Blend Women's Ibea Ja Jacket",357.00,"images/productList/714384-0014_1_t.jpg",167,670,"women","images/productDetail/714384-0014_1_x.jpg","images/productDetail/714384-0014_1_t.jpg","images/productDetail/21_t.jpg"),
(22,"Kaporal Men's Booky Jacket",247.00,"images/productList/803500-6989_1_t.jpg",5674,721,"man","images/productDetail/803500-6989_1_x.jpg","images/productDetail/803500-6989_1_t.jpg","images/productDetail/22_t.jpg"),
(23,"G-STAR Men's Avier Jacket",514.00,"images/productList/a.jpg",343,127,"man","images/productDetail/000095-0014_2_x.jpg","images/productDetail/000095-0014_2_t.jpg","images/productDetail/1_t.jpg"),
(24,"INCEPTOS ORCI HAC LIBERO",761.00,"images/productList/b.jpg",543,3543,"shoes","images/productDetail/000312-2259_1_x.jpg","images/productDetail//000312-2259_1_t.jpg","images/productDetail/2_t.jpg"),
(25,"Gestuz Women's Tula Sun Hat",576.00,"images/productList/c.jpg",476,721,"women","images/productDetail/103314-0735_1_x.jpg","images/productDetail//103314-0735_1_t.jpg","images/productDetail/3_t.jpg"),
(27,"ICHI Women's 20101795 Coat",544.00,"images/productList/d.jpg",379,754,"women","images/productDetail/103314-0735_2_x.jpg","images/productDetail/103314-0735_2_t.jpg","images/productDetail/4_t.jpg"),
(28,"Selected Women's Kaia Coat",571.00,"images/productList/e.jpg",372,45,"women","images/productDetail/104331-0014_1_x.jpg","images/productDetail/104331-0014_1_t.jpg","images/productDetail/5_t.jpg"),
(29,"minimum Men's Wexford Jacket",156.00,"images/productList/f.jpg",764,371,"man","images/productDetail/105797-1056_1_x.jpg","images/productDetail/105797-1056_1_t.jpg","images/productDetail/6_t.jpg"),
(30,"Yumi Women's Wide Leg Trouser",775.00,"images/productList/g.jpg",378,378,"women","images/productDetail/116796-0001_1_x.jpg","images/productDetail/116796-0001_1_t.jpg","images/productDetail/7_t.jpg"),
(31,"Blend Men's 20702206 AZ Jacket",737.00,"images/productList/h.jpg",146,457,"man","images/productDetail/217360-0014_1_x.jpg","images/productDetail/217360-0014_1_t.jpg","images/productDetail/8_t.jpg"),
(32,"s.Oliver Men's Jacke Jacket",120.00,"images/productList/i.jpg",892,786,"man","images/productDetail/217365-0014_1_x.jpg","images/productDetail/217365-0014_1_t.jpg","images/productDetail/9_t.jpg"),
(33,"Gestuz Women's Daya Skirt",475.00,"images/productList/j.jpg",304,4237,"women","images/productDetail/220008-0054_1_x.jpg","images/productDetail/220008-0054_1_t.jpg","images/productDetail/10_t.jpg"),
(34,"INCEPTOS ORCI HAC LIBERO",146.00,"images/productList/k.jpg",576,3781,"cap","images/productDetail/255615-0014_1_x.jpg","images/productDetail/255615-0014_1_t.jpg","images/productDetail/11_t.jpg"),
(35,"Moves Women's Nizita Regular Dresses",725.00,"images/productList/l.jpg",1785,72,"women","images/productDetail/256479-0014_1_x.jpg","images/productDetail/256479-0014_1_t.jpg","images/productDetail/12_t.jpg"),
(36,"Dickies Men's Curtis Coat",572.00,"images/productList/m.jpg",56,567,"man","images/productDetail/271865-0286_1_x.jpg","images/productDetail/271865-0286_1_t.jpg","images/productDetail/13_t.jpg"),
(37,"Mexx Men's MX3024692 Jacket",561.00,"images/productList/n.jpg",537,378,"man","images/productDetail271866-0014_1_x.jpg","images/productDetail/271866-0014_1_t.jpg","images/productDetail/14_t.jpg"),
(38,"New Look Women's Rib Roll Neck Dress",576.00,"images/productList/o.jpg",457,546,"women","images/productDetail/278638-0083_1_x.jpg","images/productDetail/278638-0083_1_t.jpg","images/productDetail/15_t.jpg"),
(39,"Filippa K Women's Button Tunic Dress",713.00,"images/productList/p.jpg",286,47,"women","images/productDetail/430041-0014_1_x.jpg","images/productDetail/430041-0014_1_t.jpg","images/productDetail/16_t.jpg"),
(40,"SELECTED FEMME Women's Sfkia Scarf",347.00,"images/productList/q.jpg",640,876,"women","images/productDetail/582120-0029_1_x.jpg","images/productDetail/582120-0029_1_t.jpg","images/productDetail/17_t.jpg"),
(41,"Sandwich Women's Jersey Medium Dress",842.00,"images/productList/r.jpg",575,467,"women","images/productDetail/589550-0014_1_x.jpg","images/productDetail/589550-0014_1_t.jpg","images/productDetail/18_t.jpg"),
(42,"Schott NYC Men's 2190J Quilted Jacket",641.00,"images/productList/s.jpg",684,386,"man","images/productDetail/634082-0014_1_x.jpg","images/productDetail/634082-0014_1_t.jpg","images/productDetail/19_t.jpg"),
(43,"Schott NYC Men's Pilot Jacket",751.00,"images/productList/t.jpg",3787,237,"man","images/productDetail/677326-0014_1_x.jpg","images/productDetail/677326-0014_1_t.jpg","images/productDetail/20_t.jpg"),
(44,"FINDERS Women's Every Chance Trouser",467.00,"images/productList/u.jpg",585,214,"women","images/productDetail/714384-0014_1_x.jpg","images/productDetail/714384-0014_1_t.jpg","images/productDetail/21_t.jpg"),
(45,"Bench Men's Inquire Coat",940.00,"images/productList/v.jpg",684,299,"man","images/productDetail/803500-6989_1_x.jpg","images/productDetail/803500-6989_1_t.jpg","images/productDetail/22_t.jpg");

CREATE TABLE shopping_cart(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	userId INT
);
INSERT INTO shopping_cart VALUES(100,1);

CREATE TABLE shopping_cart_detail(
	did INT PRIMARY KEY AUTO_INCREMENT,
	cartId INT,
  productId INT,
  count INT
);
/*INSERT INTO shopping_cart_detail VALUES
(1, 100, 10, 3),
(2, 100, 15, 1),
(3, 100, 18, 2);*/

/**订单信息表**/
CREATE TABLE shopping_order(
	oid INT PRIMARY KEY AUTO_INCREMENT, #订单序号
	orderNum INT,#订单编号，10位随机数
	rcvName VARCHAR(32),#接收人姓名
	rcvEmail VARCHAR(255),#接收人email
	rcvPhone VARCHAR(32),#接收人电话
	rcvAddress VARCHAR(255),#接收人地址
	price FLOAT(10,2),#订单金额
	payment INT,#付款方式 1-PAYPAL 2-Ecpsse 3-MoneyGram
	delivery INT,#配送方式 1-UPS 2-Fedex 3-DHL
	orderTime BIGINT,#下单时间
	status INT,#订单状态 1-To be paid 2-Received goods 3-Already closed
	userId INT #用户编号
);

/**订单详情表**/
CREATE TABLE shopping_order_detail(
	did INT PRIMARY KEY AUTO_INCREMENT,
	orderId INT,#订单编号
	productId INT,#产品编号
	count INT #购买数量
);
/*INSERT INTO shopping_order_detail VALUES
(1,101,10,3),
(2,101,15,1),
(3,101,18,2);*/