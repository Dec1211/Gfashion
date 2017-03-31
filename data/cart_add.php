<?php
    header('Content-Type:application/json;charset=UTF-8');
    @$uname=$_REQUEST['uname'];
    @$pid=$_REQUEST['pid'];
    if(!$uname||!$pid){//若客户未提交必须的数据
    	echo "{}";
    	return;//退出当前PHP页面的执行
    }

    /*连接数据库*/
    include("config.php");
    $conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
    //SQL1:设置编码方式
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $product_detail=[
        'msg'=>null,
        'uid'=>0,
        'cid'=>0,
        'pid'=>intval($pid),
        'count'=>0
    ];

    //SQL2:根据username查询uid
    $sql="SELECT uid FROM shopping_user WHERE uname='$uname'";
    $row=mysqli_fetch_assoc(mysqli_query($conn,$sql));
    $uid=intval($row['uid']);
    $product_detail['uid']=$uid;

    //SLQ3:根据用户编号查询购物车编号
    $sql="SELECT cid FROM shopping_cart WHERE userId='$uid'";
    $row=mysqli_fetch_assoc(mysqli_query($conn,$sql));
    if($row){//对应的用户已有购物车
        $cid=$row['cid'];
    }
    else{//对应的用户没有购物车
        //SQL4：购物车表中插入一行记录
        $sql="INSERT INTO shopping_cart VALUES(NULL,'{$uid}')";
        $res=mysqli_query($conn,$sql);
        $cid=mysqli_insert_id($conn);
    }
    $cid=intval($cid);
    $product_detail['cid']=$cid;

    //SQL5:根据购物车编号和产品编号，查询是否已经购买过产品
    $sql="SELECT * FROM shopping_cart_detail WHERE cartID='{$cid}' AND productId='{$pid}'";
    $row=mysqli_fetch_assoc(mysqli_query($conn,$sql));
    if($row){//已经购买过该产品
        $count=$row['count'];
        $count++;
        //SQL6:修改购买数量
        $sql="UPDATE shopping_cart_detail SET count='$count' WHERE cartId='$cid' AND productId='$pid'";
        mysqli_query($conn,$sql);
        $product_detail['count']=$count;
    }
    else {//没有购买过该产品
        //SQL7:插入一行购买记录
        $sql="INSERT INTO shopping_cart_detail VALUES(NULL,'$cid','$pid',1)";
        mysqli_query($conn,$sql);
        $count=1;
    }
    $product_detail['count']=$count;

    echo json_encode($product_detail);



