"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//ajax函数1.0版

/*
function sb(type,url,data,success){
    var xhr=new XMLHttpRequest();
    if(type.toLowerCase()==='get'){
        xhr.open(type,url+'?'+data+'&_='+Date.now(),true);
        xhr.send(null);
    }else if(type.toLowerCase()==='post'){
        xhr.open(type,url+'?'+data,true)
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    }else{
        alert('目前只支持get/post请求');
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status>=200&&xhr.status<300){
                success(xhr.responseText);
            }else{
                error(xhr.status);//传回失败码
            }
        }
    }
}
*/
//ajax函数2.0，将所有形参放在对象里

/*
function sb(options){
    var xhr=new XMLHttpRequest();
    if(options.type.toLowerCase()==='get'){
        xhr.open(options.type,options.url+'?'+options.data+'&_='+Date.now(),true);
        xhr.send(null);
    }else if(options.type.toLowerCase()==='post'){
        xhr.open(options.type,options.url+'?'+options.data,true)
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(options.data);
    }else{
        alert('目前只支持get/post请求');
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status>=200&&xhr.status<300){
                options.success(xhr.responseText);
            }else{
                options.error(xhr.status);//传回失败码
            }
        }
    }
}
*/
//ajax函数3.0，让data数据可以用对象的形式传。
function ajax(options) {
  var xhr = new XMLHttpRequest();
  var data = '';

  if (typeof options.data === 'string') {
    data = options.data;
  }

  if (_typeof(options.data) === 'object' && options.data !== null && options.data.constructor === Object) {
    //把对象转成字符串。{abc:123,ddd:777}转为'abc=123&ddd=777'
    for (var key in options.data) {
      data += key + '=' + options.data[key] + '&';
    }

    data = data.substring(0, data.length - 1);
  }

  if (options.type.toLowerCase() === 'get') {
    xhr.open(options.type, options.url + '?' + data + '&_=' + Date.now(), true);
    xhr.send(null);
  } else if (options.type.toLowerCase() === 'post') {
    xhr.open(options.type, options.url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
  } else {
    alert('目前只支持get/post请求');
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        options.success(xhr.responseText);
      } else {
        options.error(xhr.status); //传回失败码
      }
    }
  };
}