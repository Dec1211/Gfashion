<?php
    /*更新购物车*/
    header('Content-Type:text/plain;charset=UTF-8');
    $count=$_REQUEST['count'];
    $did=$_REQUEST['did'];

    /*连接数据库*/
    include("config.php");
    $conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
    //SQL1:设置编码方式
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);

    //SQL2:通过编号更新商品数量
    $sql="UPDATE shopping_cart_detail SET count='$count' WHERE did='$did'";
    $res=mysqli_query($conn,$sql);
    if($res){
        echo 'succ';
    }
    else {
        echo 'err';
    }