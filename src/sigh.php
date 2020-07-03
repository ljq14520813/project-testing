<?php

header('Content-Type:text/html;charset=utf-8');

$user=$_REQUEST['user'];
$psd=$_REQUEST['psd'];
$type=$_REQUEST['type'];


if($type&&$user&&$psd){
    $link=mysqli_connect('localhost','root','root','new');
    if(!$link){
        die('连接失败'.mysqli_connect_error());
    }
    mysqli_set_charset($link,'utf-8');
    $sql_find="select * from table1 where user='$user' and psd='$psd'";
    $sql_insert="insert into table1(user,psd)values('$user','$psd')";
    if($type==='add'){
        $res_find=mysqli_query($link,$sql_find);
        if(count(mysqli_fetch_all($res_find))>0){
            echo '{"error":1,"msg":"账号已存在，无法重新注册"}';
        }else{
            $res_insert=mysqli_query($link,$sql_insert);
            if($res_insert){
                echo '{"error":0,"msg":"注册成功"}';
            }else{
                echo '{"error":-1,"msg":"注册失败"}';
            }
        }
    }else if($type==='login'){
        $res_find=mysqli_query($link,$sql_find);
        if(count(mysqli_fetch_all($res_find))>0){
            echo '{"error":0,"msg":"登录成功"}';
        }else{
            die('{"error":1,"msg":"账号或密码错误"}');
        }
    }else{
        die('{"error":-1,"msg":"参数错误"}');
    }
    mysqli_close($link);
}else{
    echo '{"error":1,"msg":"账号密码不正确"}';
}


?>