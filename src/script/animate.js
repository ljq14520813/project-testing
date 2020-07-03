//function animate(ele,attr,target,speedtime){//根据样式的不同来决定 要做什么样式的动画 
function animate(ele,param,speedtime,callBack){//以对象的方式接收多个属性和目标值
    /*var callBack = function(){
        alert("轮到我了");
    }*/
    if(speedtime instanceof Function){
        callBack = speedtime;//如果speedtime是一个函数，
        speedtime = 20;
    }else{
        speedtime = speedtime || 20;
    }
    
    clearInterval(ele.timer);//这里删除的是私有的定时器
    ele.timer = setInterval(function(){
        var flag = true;
        for(var attr in param){
            if(attr != "zIndex"){
                var current = 0;
                if(attr === "opacity"){
                    current = getStyle(ele,attr) * 100;
                }else{
                    current = Math.ceil(parseFloat(getStyle(ele,attr)));
                }
                var speed = (param[attr] - current)/10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if(param[attr] != current){//属性没有到达 目标值时都会来这里执行
                    //只要到这里来执行了，说明最少有一个没有到达目标值。
                    flag = false;
                }
            }
            if(attr === "opacity"){
                ele.style[attr] = (current + speed)/100;
            }else if(attr === "zIndex"){
                ele.style[attr] = param[attr];
            }else{
                ele.style[attr] = current + speed + "px";
            }
        }
        if(flag){
            //所有属性都到达了目标值
            clearInterval(ele.timer);
            //到达 目标值后可以在这里执行其它的程序
            if(!!callBack){
                callBack();
            }
        }
    },speedtime);
}
function getStyle(ele,attr){
    return window.getComputedStyle ? window.getComputedStyle(ele,null)[attr] : ele.currentStyle[attr];
}