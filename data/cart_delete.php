<?php
    header('Content-Type:text/plain;charset=UTF-8');
    $did=$_REQUEST['did'];

    /*连接数据库*/
    include("config.php");
    $conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
    //SQL1:设置编码方式
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);

    //SQL2:根据did在数据库中删除did行数据
    $sql="DELETE FROM shopping_cart_detail WHERE did='$did'";
    $res=mysqli_query($conn,$sql);
    if($res){
        echo 'succ';
    }
    else {
        echo 'err';
    }