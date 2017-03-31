<?php
    header("Content-Type:text/plain;charset=UTF-8");
    $uname=$_REQUEST["uname"];
    $upwd=$_REQUEST["upwd"];
    include("config.php");
    $conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql="SELECT uid FROM shopping_user WHERE uname='$uname' AND upwd='$upwd'";
    $res=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($res);
    if($row){
        echo 'succ';
    }
    else{
        echo 'err';
    }