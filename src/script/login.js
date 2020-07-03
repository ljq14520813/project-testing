var $btn=$('#btn');
var $user=$('#user');
var $psd=$('#psd');
function btnLogin(){
    $.ajax({
        type:'get',
        url:'../sigh.php',
        dataType:'json',
        data:{
            type:"login",
            user:$user.val(),
            psd:$psd.val()
        },
        cache:false, //不使用缓存
        success:function (json){
            if(json.error===0){
                location.href='./index.html'
            }else{
                alert('账号或密码错误');
                $user.val('');
                $psd.val('');
            }
        },
        error:function (){
            alert('请求失败');
        }
    })
}
$btn.on('click',btnLogin);