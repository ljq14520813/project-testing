"use strict";

var $btn = $('#btn');
var $user = $('#user');
var $psd = $('#psd');

function btnRegister() {
  console.log(111);
  $.ajax({
    type: 'get',
    url: '../sigh.php',
    dataType: 'json',
    data: {
      type: "add",
      user: $user.val(),
      psd: $psd.val()
    },
    cache: false,
    //不使用缓存
    success: function success(json) {
      console.log(111);

      if (json.error === 0) {
        alert('注册成功');
        location.href = './login.html';
      } else {
        alert('注册失败');
        $user.val('');
        $psd.val('');
      }
    },
    error: function error() {
      alert('请求失败');
    }
  });
}

$btn.on('click', btnRegister);