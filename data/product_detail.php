<?php
   /*根据客户端提交的页面编号，向客户端分页输出产品列表*/
    header('Content-Type:application/json;charset=UTF-8');

    //接收客户端提交的数据
    $pid=$_REQUEST['pid'];

    /*连接数据库*/
    include("config.php");
    $conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
    //SQL1:设置编码方式
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);
    //SQL2:根据传入的pid在shopping_product中查找对应的名字、价格和图片
    $sql="SELECT pname,price,smImg,mdImg,mxImg FROM shopping_product WHERE pid=$pid";
    $res=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($res);
    echo json_encode($row);
