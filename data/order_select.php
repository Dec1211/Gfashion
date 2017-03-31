<?php
    /*接收客户端提交的用户名，查询出改用户所有的订单，以JSON格式返回给客户端*/
    header("Content-Type:application/json;charset=UTF-8");

    $uname=$_REQUEST['uname'];

    /*连接数据库*/
    include("config.php");
    $conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
    //SQL1:设置编码方式
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);

    //SQL2:根据用户名查询用户编号
    $sql="SELECT uid FROM shopping_user WHERE uname='$uname'";
    $res=mysqli_query($conn,$sql);
    $uid=mysqli_fetch_assoc($res)['uid'];

    //SQL3：根据用户编号查询其对应的订单
    $sql="SELECT * FROM shopping_order WHERE userId='$uid'";
    $res=mysqli_query($conn,$sql);
    $orderList=mysqli_fetch_all($res,MYSQLI_ASSOC);

    //遍历每一个订单对象，添加一个新的属性：productList
    foreach($orderList as $i=>$o){
        $oid=$orderList[$i]['oid'];
        //SQL4：根据当前的订单编号查询出它所购买的产品
        $sql="SELECT pid,pname,price,pic FROM shopping_product WHERE pid IN (SELECT productId FROM shopping_order_detail WHERE orderId='$oid')";
        $res=mysqli_query($conn,$sql);
        $plist=mysqli_fetch_all($res,MYSQLI_ASSOC);
        $orderList[$i]['productList']=$plist;
    }

    //把PHP数组编码为JSON字符串，输出给客户端
    echo json_encode($orderList);
