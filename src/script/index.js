var index=0;
var tIndex=0;
var $img_list=$('#banner_img_list');
var $nav_list=$('#banner_nav_list');
var $banner_arrow=$('.banner_arrow');
var $tmImgList=$('#tianmao_img_list');
var $tmNavList=$('#tianmao_nav_list');
var $tmArrow=$('.tianmao_arrow');
var $tmNum=$('.tmNum');
var noticeTimer=null;
// var notice_this=null;

$nav_list.children().on('click',function(){
    index=$(this).index();
    // console.log($(this).index());
    $img_list.animate({left:-520*index},400);
    $nav_list.children().eq((index===5?0:index)).addClass('active').siblings().removeClass('active');
})
$('#qrClose').on('click',function(){
    $(this).parent().css("display","none");
})
// $('.main_list').children().hover(function(){
//     $(this).addClass('on').siblings().removeClass('on');
// },function(){
//     $('.main_list')
// })
$('.notice_hb').children().hover(function(){
    var _this=$(this);
    noticeTimer=setTimeout(function(){
        // _this.children().children().addClass('active').parent().siblings().children().removeClass('active');
        _this.children().addClass('active').parent().siblings().children().removeClass('active');
        $('.notice_cb ul').eq((_this).index()).addClass('show').siblings().removeClass('show');
    },600)
},function(){
    clearTimeout(noticeTimer);
})



// $('.notice_hb').children().on('mouseenter',function(){
//     notice_this=$(this);
//     noticeTimer=setTimeout(function(){
//         _this.addClass('active').siblings().removeClass('active');
//     },600)
// })

function autoPlay(){
    if(index===5){
        index=1;
        $img_list.css("left",0);
        // $img_list.attr('style','left:0px');
    }else{
        index++;
    }
    $img_list.animate({left:-520*index},400);
    $nav_list.children().eq((index===5?0:index)).addClass('active').siblings().removeClass('active');
}
function bannerIn(){
    clearInterval(banner_timer);
    $banner_arrow.animate({opacity:0.7},500);
}
function bannerOut(){
    banner_timer=setInterval(autoPlay,8000);
    $banner_arrow.animate({opacity:0},500);
}
function btnToLeft(){
    // if(index==5){
    //     index=0;
    //     $img_list.attr("style","left:0px");
    // }
    if(index==0){
        index=4;
        $img_list.attr("style","left:-2600px");
    }else{
        index--;
    }
    $nav_list.children().eq(index).addClass('active').siblings().removeClass('active');
    $img_list.animate({left:-520*index},200);
}
function btnToRight(){
    if(index==5){
        index=1;
        $img_list.attr("style","left:0px");
    }else{
        index++;
    }
    $nav_list.children().eq((index===5?0:index)).addClass('active').siblings().removeClass('active');
    $img_list.animate({left:-520*index},200);
}



var banner_timer=setInterval(autoPlay,8000);
$('.auto_banner').on('mouseenter',bannerIn);
$('.auto_banner').on('mouseleave',bannerOut);
$('.toLeft').on('click',btnToLeft);
$('.toRight').on('click',btnToRight);





function tmAutoPlay(){
    if(tIndex===6){
        tIndex=1;
        $tmImgList.css("left",0);
        // $tmImgList.attr('style','left:0px');
    }else{
        tIndex++;
    }
    $tmNum.text(((tIndex===6?0:tIndex)+1));
    $tmImgList.animate({left:-520*tIndex},400);
    $tmNavList.children().eq((tIndex===6?0:tIndex)).addClass('selected').siblings().removeClass('selected');
}
function tmIn(){
    clearInterval(tmTimer);
    $tmArrow.animate({opacity:0.7},500);
}
function tmOut(){
    tmTimer=setInterval(tmAutoPlay,5000);
    $tmArrow.animate({opacity:0},500);
}
function tmLeft(){
    if(tIndex==0){
        tIndex=5;
        $tmImgList.attr("style","left:-3120px");
    }else{
        tIndex--;
    }
    $tmNum.text(((tIndex===6?0:tIndex)+1));
    $tmNavList.children().eq(tIndex).addClass('selected').siblings().removeClass('selected');
    $tmImgList.animate({left:-520*tIndex},200);
}
function tmRight(){
    if(tIndex==6){
        tIndex=1;
        $tmImgList.attr("style","left:0px");
    }else{
        tIndex++;
    }
    $tmNum.text(((tIndex===6?0:tIndex)+1));
    $tmNavList.children().eq((tIndex===6?0:tIndex)).addClass('selected').siblings().removeClass('selected');
    $tmImgList.animate({left:-520*tIndex},200);
}

var tmTimer=setInterval(tmAutoPlay,5000);
$('.tianmao_pic').on('mouseenter',tmIn);
$('.tianmao_pic').on('mouseleave',tmOut);
$('.TMLeft').on('click',tmLeft);
$('.TMRight').on('click',tmRight);

$(function(){
    function mainList_load(json){
        $.each(json,function(index,item){
            var str=`<li><a href="#">${item.cb1}</a>/<a href="#">${item.cb2}</a>/<a href="#">${item.cb3}</a><i class="iconfont icon-youjiantou"></i></li>`;
            $('.main_list').append(str);
        })
    }
    function goods_load(json){
        $.each(json,function(index,item){
            var str=`<li> <a href="./goodsDetails.html?dataID=${item.dataID}"><div class="goods_img_wrap"><img src="${item.url}" alt="" class="goods_img"></div><div class="goods_info"><h4>${item.title}</h4><p>${item.info}</p><p class="saygood"><i class="iconfont icon-xiaolian"></i><i class="g_num">${item.saygood}</i> 人说好</p></div></a></li>`;
            $('.goods_list').append(str);
        })
    }
    function shopping_load(json){
        $.each(json,function(index,item){
            var str=`<li><a href="./goodsDetails.html?dataID=${item.dataID}"><div class="shopping_img_wrap"><img src="${item.url}" alt=""></div><div class="shopping_info"><p class="shopping_subtitle"><i class="iconfont icon-yinhao"></i>${item.title}</p><div class="shopping_member"><div class="member_img_wrap"><img src="../imgs/member_item.jpg" alt=""></div><p class="member_name">${item.name}</p></div></div></a></li>`;
            $('.shopping_list').append(str);
        })
    }
    (function(){
        $.ajax({
            type:'get',
            url:'../mainlist.json',
            cache:false,
            dataType:'json',
            success:function(json){
                mainList_load(json);
            }
        })
        $.ajax({
            type:'get',
            url:'../goods.json',
            cache:false,
            dataType:'json',
            success:function(json){
                goods_load(json);
            }
        })
        $.ajax({
            type:'get',
            url:'../shopping.json',
            cache:false,
            dataType:'json',
            success:function(json){
                shopping_load(json);
            }
        })
    })();
})
