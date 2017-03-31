<?php
    /*根据客户端提交的页面编号，向客户端分页输出产品列表*/
    header('Content-Type:application/json;charset=UTF-8');

    //接收客户端提交的数据
    $style=$_REQUEST['style'];

    /*连接数据库*/
    include("config.php");
    $conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
    //SQL1:设置编码方式
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);
    //SQL2:根据传入的style在shopping_product中查找对应的编号、名字、价格和图片
    $sql="SELECT pid,pname,price,pic FROM shopping_product WHERE style='$style' LIMIT 3,7 ";
    $res=mysqli_query($conn,$sql);
    $row=mysqli_fetch_all($res,MYSQLI_ASSOC);
    echo json_encode($row);
