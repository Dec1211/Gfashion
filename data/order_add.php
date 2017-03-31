<?php
    /*接收客户端提交的订单信息，保存入订单表和订单详情表*/
    header("Content-Type:application/json;charset=UTF-8");
    $orderNum=rand(1000000000,10000000000);
    $rcvName=$_REQUEST['rcvName']; //接收人姓名
    $rcvEmail=$_REQUEST['rcvEmail'];//接收人邮箱
    $rcvPhone=$_REQUEST['rcvPhone'];//接收人电话
    $rcvAddress=$_REQUEST['rcvAddress'];//接收人地址
    $price=$_REQUEST['price'];
    $payment=$_REQUEST['payment'];
    $delivery=$_REQUEST['delivery'];
    $orderTime=time()*1000;//服务器端当前系统时间
    $status=1;//刚生成的订单状态都是等待付款 To be paid
    $uname=$_REQUEST['uname'];
    $productList=$_REQUEST['productList'];//客户端提交的json字符串
    $productList=json_decode($productList);//把JSON字符串解码为PHP为对象数组

    /*连接数据库*/
    include("config.php");
    $conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
    //SQL1:设置编码方式
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);

    //SQL2:根据用户名查询用户编号
    $sql="SELECT uid FROM shopping_user WHERE uname='$uname'";
    $res=mysqli_query($conn,$sql);
    $userId=mysqli_fetch_assoc($res)['uid'];

    //SQL3：向订单表中插入一行记录，得到自增的订单编号
    $sql="INSERT INTO shopping_order VALUES(NULL,'$orderNum','$rcvName','$rcvEmail','$rcvPhone','$rcvAddress','$price','$payment','$delivery','$orderTime','$status','$userId')";
    $res=mysqli_query($conn,$sql);
    $oid=mysqli_insert_id($conn);

    //SQL4：循环执行————向订单详情表中插入数据
    foreach($productList as $p){
        $pid=$p->productId;//获取PHP对象的属性：用->
        $count=$p->count;
        $sql="INSERT INTO shopping_order_detail VALUES(NULL,'$oid','$pid','$count')";
        mysqli_query($conn,$sql);
    }

    //创建要输出给客户端的数据
    $output=[];
    if($oid){//执行成功
        $output['msg']='succ';
        $output['oid']=$oid;
        $output['orderNum']=$orderNum;
    }
    else {//执行失败
        $output['msg']='err';
    }

    echo json_encode($output);