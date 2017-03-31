<?php
 /*根据客户端提交的页面编号，向客户端分页输出产品列表*/
 header('Content-Type:application/json;charset=UTF-8');

 //接收客户端提交的数据
 $pageNum=$_REQUEST['pageNum'];
 $pageSize=$_REQUEST['pageSize'];
 $chose=$_REQUEST['chose'];

 /*将要向客户端输出的分页对象*/
 $pager=[
    'recordCount'=>0,//总记录数
    'pageSize'=>intval($pageSize),//页面大小
    'pageCount'=>0,//总页数
    'pageNum'=>intval($pageNum),//当前页号
    'data'=>null
 ];

 /*连接数据库*/
 include("config.php");
 $conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
 //SQL1:设置编码方式
 $sql="SET NAMES UTF8";
 mysqli_query($conn,$sql);

 //SQL2：获取总记录数，并计算总页数
 $sql='SELECT COUNT(*) FROM shopping_product';
 $res=mysqli_query($conn,$sql);
 $row=mysqli_fetch_assoc($res);
 $pager['recordCount']=intval($row['COUNT(*)']);
 $pager['pageCount']=ceil(($pager['recordCount'])/$pager['pageSize']);//计算总页数

 //SQL3：获取当前指定页中的记录
 $start=($pager['pageNum']-1)*$pager['pageSize'];//从哪一行开始读取记录
 $count=$pager['pageSize'];//读取都少行

 if($chose=='price'){
   $sql="SELECT * FROM shopping_product order by $chose LIMIT $start,$count";
   $res=mysqli_query($conn,$sql);
 }
 else{
   $sql="SELECT * FROM shopping_product order by $chose desc LIMIT $start,$count";
   $res=mysqli_query($conn,$sql);
 }


 //读取所有产品的记录
 $pager['data']=mysqli_fetch_all($res,MYSQLI_ASSOC);

 //把分页对象编码为JSON字符串并输出
 echo json_encode($pager);