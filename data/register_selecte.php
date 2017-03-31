<?php
    header("Content-Type:text/plain;charset=UTF-8");
    $uname=$_REQUEST["uname"];
    include("config.php");
    $conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql="SELECT uname FROM shopping_user WHERE uname='$uname'";
    $res=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($res);
    if($row){
        echo 'find';
    }
    else {
        echo 'no-find';
    }