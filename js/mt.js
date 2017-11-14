/* 滚轮滚动
* @param {Object} obj
* @param {Object} upFn
* @param {Object} downFn
*/
function wheel(obj, upFn, downFn) {
   obj.onmousewheel = function(e) {
       //向下
       if(e.wheelDelta < 0) {
           downFn && downFn(e);
       } else if(e.wheelDelta > 0) {
           upFn && upFn(e);
       };
   };
   obj.addEventListener('DOMMouseScroll', function(e) {
       if(e.detail > 0) {
           downFn && downFn(e);
       } else if(e.detail < 0) {
           upFn && upFn(e);
       };
   }, false);
};

function centerEle(obj){
    obj.style.left = (document.documentElement.clientWidth - obj.offsetWidth) / 2 + 'px';
}

function addTools(){
    var scrollBox = document.querySelector('.scrollBox');
    var contentBox = scrollBox.querySelector('.content');
    var scrollToolBox = scrollBox.querySelector('.scrollTool');
    
    //滚动条
    var tool = scrollToolBox.querySelector('.scroll');
    
    //滚动条的滚动速度
    var speed = 100;
    
    
    
    
    /*
    * 1.设置滚动条高度
    * scrollH = scrollBoxH/contentH*scrollToolH
    * */
    tool.style.height = scrollBox.clientHeight/contentBox.offsetHeight*scrollToolBox.clientHeight+'px';
    
    
    //最大可滚动距离（滚动条）
    var scrollMaxH = scrollToolBox.clientHeight - tool.offsetHeight;
    
    //最大可滚动距离（内容）
    var contentMaxH = contentBox.offsetHeight-scrollBox.clientHeight;
    
    
    /*
    * 滚轮操作滚动条运动
    *
    *
    * */
    
    wheel(scrollBox,function(ev){
    
    
            //滚动条的变化
            var t = tool.offsetTop-speed;
    
    
            if(t<0){
    
                t=0;
    
            }
    
    
            contentBox.style.top = -t/scrollMaxH*contentMaxH+'px';
    
    
            tool.style.top = t +'px';
    
    
        },function(ev){
            
                    //滚动条的变化
                    var t = tool.offsetTop+speed;
            
                    if(t>scrollMaxH){
            
                        t=scrollMaxH;
            
                    }
            
                    /*
                     滚动条的可滚动距离为  H1 => scrollMaxH   已滚动距离为  h1 => t
                     *
                     *    内容可滚动距离为   H2 => contentMaxH
                     *
                    *h2 = h1/H1*H2  总公式
                    * */
            
                    contentBox.style.top = -t/scrollMaxH*contentMaxH+'px';
            
            
                    tool.style.top = t +'px';
                });
    
    
    /*
    * 拖拽控制滚动条
    *
    * */
    
    tool.onmousedown = function(ev){
    
        //鼠标点下去的位置
        var y1 = ev.clientY;
    
        var currSite = this.offsetTop;
    
        document.onmousemove = function(ev){
    
            var y2 = ev.clientY;
    
            var t = y2-y1+currSite;
    
            if(t<0){
                t=0;
            }
            if(t>scrollMaxH){
                t = scrollMaxH;
            }
    
            contentBox.style.top = -t/scrollMaxH*contentMaxH+'px';
    
            tool.style.top = t+'px';
    
            return false;
    
        };
    
    
    };
    
    document.onmouseup = function(){
    
        document.onmousemove = null;
    
    };
    
}