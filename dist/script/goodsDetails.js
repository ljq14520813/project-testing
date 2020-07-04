"use strict";

var clickId = location.href.split("?")[1].split('=')[1];

function getDOM(item) {
  var strimg1 = "<a href=\"#\" class=\"show\"><img src=\"../imgs/".concat(item.imgUrl2.split(',')[0], "\" alt=\"\"></a>");
  var strimg2 = "<li class=\"selected\"><a href=\"#\"><img src=\"../imgs/".concat(item.imgUrl.split(',')[0], "\" alt=\"\"></a></li>");
  var strimg3 = "<li class=\"active\"><img src=\"../imgs/".concat(item.imgUrl3.split(',')[0], "\" alt=\"\"></li>");
  var mask = '<div class="mask"></div>';

  for (var i = 1, len = item.imgUrl.split(',').length; i < len; i++) {
    strimg1 += "<a href=\"#\"><img src=\"../imgs/".concat(item.imgUrl2.split(',')[i], "\" alt=\"\"></a>");
    strimg2 += "<li><a href=\"#\"><img src=\"../imgs/".concat(item.imgUrl.split(',')[i], "\" alt=\"\"></a></li>");
    strimg3 += "<li><img src=\"../imgs/".concat(item.imgUrl3.split(',')[i], "\" alt=\"\"></li>");
  }

  $('#normalPic').append(strimg1).append(mask);
  $('#littlePic').append(strimg2);
  $('#bigPic').append(strimg3);
  $('.infoRightWrap .title h3').text(item.title);
  $('.rmbNum').text(item.prePrice);
  $('.nowNum').text(item.nowPrice);
  $('#discountContent strong').text(item.discount);
  $('#box1').text(item.discount2);
  $('#box2').text(item.discount3);
  $('.c_comment').text(item.comments);
  $('.c_sell').text(item.sell);
  $('.size dd a').text(item.size);
  $('.color dd a').text(item.color);
  $('#store').text(item.store);
}

function getBigImg() {
  return $('#bigPic li[class=active] img').get(0);
}

function getBind() {
  var mask = $('.mask').get(0);
  var small = $('#normalPic').get(0); // var big=$('#bigPic').get(0);
  // var bigImg=getBigImg();

  $('#littlePic').children().on('mouseenter', function () {
    var _index = $(this).index();

    $(this).addClass('selected').siblings().removeClass('selected');
    $('#normalPic').children().eq(_index).addClass('show').siblings().removeClass('show');
    $('#bigPic').children().eq(_index).addClass('active').siblings().removeClass('active');
  });
  $('#normalPic').on('mouseenter', function () {
    $('.mask').css("display", "block");
    $('#bigPic').css("display", "block");
  });
  $('#normalPic').on('mouseleave', function () {
    $('.mask').css("display", "none");
    $('#bigPic').css("display", "none");
  });

  small.onmousemove = function (eve) {
    var e = eve || event;
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    var rect = small.getBoundingClientRect();
    var x = mouseX - 200 / 2 - rect.x;
    var y = mouseY - 200 / 2 - rect.y;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > 400 - 200) x = 400 - 200;
    if (y > 400 - 200) y = 400 - 200;
    mask.style.left = x + "px";
    mask.style.top = y + "px";
    getBigImg().style.left = -x * (400 / 200) + "px";
    getBigImg().style.top = -y * (400 / 200) + "px";
  };
}

$(function () {
  $.ajax({
    type: 'get',
    url: '../goodsDetails.json',
    cache: false,
    dataType: 'json',
    success: function success(json) {
      console.log(11);
      $.each(json, function (index, item) {
        if (item.dataID == clickId) {
          console.log(11);
          new Promise(function (resolve, reject) {
            getDOM(item);
            resolve();
          }).then(function () {
            getBind();
          });
        }
      });
    },
    error: function error(err) {
      console.log('错误');
    }
  });
});