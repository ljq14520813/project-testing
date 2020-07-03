"use strict";

var clickId = location.href.split("?")[1].split('=')[1]; // var $mid=$('.');

var mask = $('.mask').get(0);
var small = $('#normalPic').get(0);
var big = $('#bigPic').get(0);
var bigImg = getBigImg();

function getBigImg() {
  return $('#bigPic li[class=active] img').get(0);
}

$('#littlePic').children().on('mouseenter', function () {
  var _index = $(this).index();

  $(this).addClass('selected').siblings().removeClass('selected');
  $('#normalPic').children().eq(_index).addClass('show').siblings().removeClass('show');
  $('#bigPic').children().eq(_index).addClass('active').siblings().removeClass('active'); // console.log($('#normalPic').children().eq(_index));
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
}; // $(function(){
//     $.ajax({
//         type:'get',
//         url:'../goodsDetails.json',
//         cache:false,
//         dataType:'json',
//         success:function(json){
//             console.log(11);
//             $.each(json,function (index,item){
//                 if(item.dataID==clickId){
//                     var str=`
//                             <div class="dLeft">
//                                 <div class="dInfo clearfix">
//                                     <div class="infoLeft">
//                                         <div class="normalPic">
//                                         <a href="#" class="show"><img src="../imgs/shopping1_normalImg.jpg" alt=""></a>
//                                         <a href="#"><img src="../imgs/${item.imgUrl[0]}" alt=""></a>
//                                         <a href="#"><img src="../imgs/${item.imgUrl[1]}" alt=""></a>
//                                         <a href="#"><img src="../imgs/${item.imgUrl[2]}" alt=""></a>
//                                         <a href="#"><img src="../imgs/${item.imgUrl[3]}" alt=""></a>
//                                         <a href="#"><img src="../imgs/${item.imgUrl[4]}" alt=""></a>
//                                     </div>
//                                     <ul id="littlePic" class="clearfix littlePic">
//                                         <li class="selected"><a href="#"><img src="../imgs/shopping1_littleImg.jpg" alt=""></a></li>
//                                         <li><a href="#"><img src="../imgs/${item.imgUrl[0]}" alt=""></a></li>
//                                         <li><a href="#"><img src="../imgs/${item.imgUrl[1]}" alt=""></a></li>
//                                         <li><a href="#"><img src="../imgs/${item.imgUrl[2]}" alt=""></a></li>
//                                         <li><a href="#"><img src="../imgs/${item.imgUrl[3]}" alt=""></a></li>
//                                         <li><a href="#"><img src="../imgs/${item.imgUrl[4]}" alt=""></a></li>
//                                     </ul>
//                                 </div>
//                                 <div class="infoRight">
//                                     <div class="infoRightWrap">
//                                         <div class="title">
//                                             <h3>${item.title}</h3>
//                                         </div>
//                                         <div class="brand">
//                                             <img src="../imgs/goods_brand.png" alt="">海量新品 潮流穿搭 玩趣互动
//                                         </div>
//                                         <ul class="mainInfo">
//                                             <li class="beforePriceBox">
//                                                 <span>价格</span>
//                                                 <strong><em class="rmb">￥</em><em class="rmbNum">${item.prePrice}</em></strong>
//                                             </li>
//                                             <li class="tbPrice clearfix">
//                                                 <span>淘宝价</span>
//                                                 <div class="tbCont">
//                                                     <div class="contentBox">
//                                                         <strong>￥${item.nowPrice}</strong>
//                                                         <span>新品抢先价</span>
//                                                     </div>
//                                                     <div class="borderBox"></div>
//                                                 </div>
//                                             </li>
//                                             <li class="discount">
//                                                 <span>优惠</span>
//                                                 <div class="otherDiscount">
//                                                     <div class="discountContent">
//                                                         <i class="iconfont icon-taojinbi"></i>淘金币可抵<strong>${item.discount1}</strong>元
//                                                     </div>
//                                                     <div class="dis_discount">
//                                                         <div class="box">
//                                                             <img src="../imgs/discount.png" alt="">${item.discount2}<a href="#">领取</a>
//                                                         </div>
//                                                         <div class="box">
//                                                             <img src="../imgs/discount.png" alt="">${item.discount3}<a href="#">领取</a>
//                                                         </div>
//                                                     </div>
//                                                     <div class="dis_discount">
//                                                         <div class="box">
//                                                             <img src="../imgs/localActivity.png" alt="">满158,享部分地区包邮
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                         </ul>
//                                         <div class="comment">
//                                             <a href="#" class="commentsNum"><strong>${item.comments}</strong><span>累计评论</span></a>
//                                             <a href="#" class="sell"><strong>${item.sell}</strong><span>交易成功</span></a>
//                                         </div>
//                                         <div class="line"></div>
//                                         <div class="sure">
//                                             <div class="sureWrap clearfix">
//                                                 <dl class="size clearfix">
//                                                     <dt>尺码</dt>
//                                                     <dd><a href="#">${item.size}</a></dd>
//                                                 </dl>
//                                                 <span>尺码助手</span>
//                                                 <dl class="color clearfix">
//                                                     <dt>颜色分类</dt>
//                                                     <dd><a href="#">${item.color}</a></dd>
//                                                 </dl>
//                                                 <dl class="count clearfix">
//                                                     <dt>数量</dt>
//                                                     <dd>
//                                                         <div>
//                                                             <a href="#" class="reduce" title="减1"><i class="iconfont icon-minus"></i></a>
//                                                             <input type="text" class="ipt" value="1">
//                                                             <a href="#" class="add" title="加1"><i class="iconfont icon-add"></i></a>
//                                                         </div>
//                                                         <em>(库存<i>${item.store}</i>件)</em>
//                                                     </dd>
//                                                 </dl>
//                                                 <div class="addBuy">
//                                                     <a href="#" title="加入购物车"><i class="iconfont icon-gouwuche"></i>加入购物车</a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="extra"></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     `
//                     $('.detailsBox').append(str);
//                 }
//             })
//         }
//     });
// })