<?php
    header("Content-Type:text/plain;charset=UTF-8");
    @$uname=$_REQUEST["uname"];
    @$upwd=$_REQUEST['upwd'];
    if(!$uname||!$upwd){//若客户未提交必须的数据
        echo "{}";
        return;//退出当前PHP页面的执行
    }
    include("config.php");
    $conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql="INSERT INTO shopping_user VALUES(NULL,'$uname','$upwd')";
    $res=mysqli_query($conn,$sql);
    if($res){
        echo 'ok';
    }