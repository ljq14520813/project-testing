




(function(){
    var iconList,max,min,mask,imgCon,preImg,iconList,frist;
    var x = 0;
    var y = 0;
    var pos = 0;
    var bnList = [];
    var MASK_WIDTH = 200;
    var MIN_WIDTH = 400; 
    var MAX_WIDTH = 400;
    var IMAGE_MARGIN = 4.5;
    var IMAGE_WIDTH = 50;
    function fdj(_data,boxparent,_frist){
        iconList = _data
        frist = _frist
        createGlass(boxparent)
    }
    window.fdj=fdj;

    // 创建放大镜盒子
    function createGlass(boxparent){
        let zoom = Utils("div", {
            position: 'relative',
        });
        createMin(zoom);
        createMax(zoom);
        createCarousel(zoom);
        boxparent.appendChild(zoom);
    }


    // 放大镜 / 大小容器
    function createMin(parent){
        min = Utils("div", {
            position: "absolute",
            width:MIN_WIDTH + "px",
            height:MIN_WIDTH + "px",
            backgroundImage: `url(../imgs/${frist})`,
            backgroundSize:"cover"
            // backgroundSize: "contain",
            // backgroundRepeat:"no-repeat",
            // backgroundPosition:"center",
            // border: "1px solid #CCCCCC",
            
        });
        mask = Utils("div", {
            position: "absolute",
            width:MASK_WIDTH + "px",
            height:MASK_WIDTH + "px",
            display: "none",
            cursor:"move",
            backgroundColor: "rgba(180,160,0,0.3)",
        })
        min.appendChild(mask);
        parent.appendChild(min);
        min.addEventListener("mouseenter",mouseHandler);
    }

    // 放大镜隐藏大盒子
    function createMax(parent) {
        max = Utils("div", {
            position: "absolute",
            width: MAX_WIDTH + "px",
            height: MAX_WIDTH + "px",
            backgroundImage: `url('../imgs/${frist}')`,
            // border: "1px solid #CCCCCC",
            display: "none",
            left: MIN_WIDTH + 14 + "px",
            zIndex:1000000,
        });
        parent.appendChild(max);
    }

    // 小 - 自动轮播图
    function createCarousel(parent) {
        let div = Utils("div", {
            position: "relative",
            width: MIN_WIDTH + 2 + "px",
            height: "58px",
            top: MIN_WIDTH + 2 + "px"
        })
        let left = Utils("div", {
            width: "22px",
            height: "32px",
            top: "13px",
            // backgroundImage: "url(./img/sprite.png)",
            backgroundPositionX: "0px",
            backgroundPositionY: "-54px",
            position: "absolute",
        });
        // 复制标签 会将标签的所有标签属性完全复制
        let right = left.cloneNode(false);
        left.style.left = "0px";//先复制以后再加
        Object.assign(right.style, {
            right: "0px",
            backgroundPositionX: "-78px",
            backgroundPositionY: "0px",
        })
        bnList.push(left);
        bnList.push(right);
        div.appendChild(left);
        div.appendChild(right);

        let con = Utils("div", {
            position: "relative",
            width: "380px",
            height: "80px",
            left: "30px",
            // overflow: "hidden",
        })
        div.appendChild(con);
        createImageCon(con);
        parent.appendChild(div);
        div.addEventListener("click",clickHandler);
    }

    // 自动轮播图容器
    function createImageCon(parent) {
        let width = iconList.length * IMAGE_WIDTH + iconList.length * IMAGE_MARGIN * 2 - IMAGE_MARGIN;
        imgCon = Utils("div", {
            position: "absolute",
            width: width + "px",
            height: "80px",
            left: 0,
            top:"20px",
            transition: "all 0.5s"
        });
        for (let i = 0; i < iconList.length; i++) {
            let img = Utils("img", {
                display:"inline-block",
                width: IMAGE_WIDTH - 4 + "px",
                height: IMAGE_WIDTH - 4 + "px",
                border: `2px solid rgba(255,68,0,${i == 0 ? 1 : 0})`,
                marginLeft: `${i === 0 ? '0px' : IMAGE_MARGIN + "px"}`,
                marginRight: IMAGE_MARGIN + "px",
                // backgroundPosition:"center",
                backgroundSize:"cover",
                // backgroundRepeat:"no-repeat"
            });
            img.src = '../imgs/'+iconList[i];
            if (i === 0) preImg = img;
            imgCon.appendChild(img);
        }
        imgCon.addEventListener("mouseover", iconMouseHandler);
        parent.appendChild(imgCon);
    }

    // 轮播图的图片边框切换
    function iconMouseHandler(e) {
        if (e.target.nodeName !== "IMG") return;
        if (preImg) {
            preImg.style.border = "2px solid rgba(255,68,0,0)";
        }
        preImg = e.target;
        preImg.style.border = "2px solid rgba(255,68,0,1)"
        //    console.log( e.target.src.replace("_icon",""));
        min.style.backgroundImage = max.style.backgroundImage = `url(${e.target.src.replace(/_icon/, "")})`;
    }

    // 移动 / 事件
    function mouseHandler(e) {
        if (e.type === "mouseenter") {
            mask.style.display = max.style.display = "block"
            min.addEventListener("mouseleave", mouseHandler);
            min.addEventListener("mousemove", mouseHandler);
        } else if (e.type === "mousemove") {
            // 获取min块的相对视口位置，矩形
            move(e.clientX, e.clientY);
        } else if (e.type === "mouseleave") {
            mask.style.display = max.style.display = "none"
            min.removeEventListener("mouseleave", mouseHandler);
            min.removeEventListener("mousemove", mouseHandler);
        }
    }

    // 移动放大镜
    function move(mouseX, mouseY) {
        let rect = min.getBoundingClientRect();
        x = mouseX - MASK_WIDTH / 2 - rect.x;
        y = mouseY - MASK_WIDTH / 2 - rect.y;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > MIN_WIDTH - MASK_WIDTH) x = MIN_WIDTH - MASK_WIDTH;
        if (y > MIN_WIDTH - MASK_WIDTH) y = MIN_WIDTH - MASK_WIDTH;
        mask.style.left = x + "px";
        mask.style.top = y + "px";
        max.style.backgroundPositionX = -x * (MAX_WIDTH / MASK_WIDTH) + "px";
        max.style.backgroundPositionY = -y * (MAX_WIDTH / MASK_WIDTH) + "px";
    }

    // 轮播图左右按钮
    function clickHandler(e) {
        let index = bnList.indexOf(e.target)
        if (index < 0) return
        if (index === 0) {
            pos--;
            if (pos < 0) pos = 0;
            //    imgCon.style.left="0px";
        } else {
            // imgCon.style.left="-380px";
            pos++;
            if (pos > Math.floor(iconList.length / 5)) {
                pos = Math.floor(iconList.length / 5)
            }
        }
        if (pos === Math.floor(iconList.length / 5)) {
            imgCon.style.left = -(imgCon.offsetWidth - 380) + "px"
            console.log(imgCon.style.left = -(imgCon.offsetWidth - 380))
        } else {
            imgCon.style.left = (pos * -380) + "px";
            console.log(imgCon.style.left,pos,iconList.length)
        }

    }

    // 创建元素 / 添加样式 - 工厂模式
    function Utils(type,style){
        var elem=document.createElement(type);
        Object.assign(elem.style,style);
        return elem;
    }
})()