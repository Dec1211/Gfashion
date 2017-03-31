<?php
    header('Content-Type:application/json;charset=UTF-8');
    $uname=$_REQUEST['uname'];

    /*连接数据库*/
    include("config.php");
    $conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
    //SQL1:设置编码方式
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);

    //SQL2:根据用户名查询用户编号，再根据用户编号查询购物车编号
    $sql="SELECT cid FROM shopping_cart WHERE userId=(SELECT uid FROM shopping_user WHERE uname='$uname')";
    $res=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($res);
    $cid=$row['cid'];

    //SQL3:根据购物车编号查询出其中的产品
    $sql="SELECT did,cartId,productId,count,pname,price,pic FROM shopping_cart_detail,shopping_product WHERE cartId='$cid' AND productId=pid";
    $res=mysqli_query($conn,$sql);
    $list=mysqli_fetch_all($res,MYSQLI_ASSOC);

    echo json_encode($list);