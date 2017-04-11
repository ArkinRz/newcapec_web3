var check_pass_word='';var passwords = $('#password').get(0);
    var div = '\
    <div id="key" style="position:absolute;background-color:#A8A8A8;width:99.5%;bottom:0px;">\
        <ul id="keyboard" style="font-size:20px;margin:2px -2px 1px 2px">\
            <li class="symbol"><span class="off">1</span></li>\
            <li class="symbol"><span class="off">2</span></li>\
            <li class="symbol btn_number_"><span class="off">3</span></li>\
            <li class="tab"><span class="off">4</span></li>\
            <li class="symbol"><span class="off">5</span></li>\
            <li class="symbol btn_number_"><span class="off">6</span></li>\
            <li class="tab"><span class="off">7</span></li>\
            <li class="symbol"><span class="off">8</span></li>\
            <li class="symbol btn_number_"><span class="off">9</span></li>\
            <li class="cancle btn_number_"></li>\
            <li class="symbol"><span class="off">0</span></li>\
            <li class="delete lastitem"><span class="mui-icon mui-icon-arrowthinleft"></span></li>\
        </ul>\
    </div>\
    ';
    var character,index=0;  
    $("input.pass").attr("disabled",true);  
    $("#password").attr("disabled",true);
    //$("#keyboardDIV").html(div);
    
    $('#keyboard li').on("touchstart", function(){
        if ($(this).hasClass('delete')) {
         //    console.log(index);
            // $(passwords.elements[index%6]).val('');
            // if($(passwords.elements[0]).val()==''){
            //  index = 0;
            // }

         //    for(var i= 0,len=passwords.elements.length;len>=i;len--){
         //        if($(passwords.elements[len]).val()!=''){
         //            $(passwords.elements[len]).val('');
         //            break;
         //        }
         //    }
         //    index--;
         //    if(index <=0){
         //        index = 0;
         //    }
            index = 0;
            for(var len= 0;len<=passwords.elements.length;len++){
                if($(passwords.elements[len]).val()!=''){
                    $(passwords.elements[len]).val('');
                }
            }
            return false;
        }
        if ($(this).hasClass('cancle')) {
            parentDialog.close();
            return false;
        }
        if ($(this).hasClass('symbol') || $(this).hasClass('tab')){
            character = $(this).text();
            $(passwords.elements[index%6]).val(character);
            index++;
            if($(passwords.elements[5]).val()!=''){
                index = 5;
            }  
        //    console.log('++'+ index);
        // for(var i= 0,len=passwords.elements.length;i<len;i++){
        //     if($(passwords.elements[i]).val()== null ||$(passwords.elements[i]).val()==undefined||$(passwords.elements[i]).val()==''){
        //         $(passwords.elements[i]).val(character);
        //         break;
        //     }
        // }
            if($(passwords.elements[5]).val()!='') {
                var temp_rePass_word = '';
                for (var i = 0; i < passwords.elements.length; i++) {
                    temp_rePass_word += $(passwords.elements[i]).val();
                }
                check_pass_word = temp_rePass_word;
                // $("#key").hide();
                console.log(check_pass_word);

                // 绑卡输入密码验证
                if( window.bankAddCheckSecurityCode && bankAddCheckSecurityCode()){
                    bankAddCheckSecurityCode();
                }
                // 这个是下单需要输入密码的时候的验证 
                if( window.OrderSecurityCode && OrderSecurityCode()){
                	OrderSecurityCode();
                }
                // 这个是另一个需要输入密码的时候的验证 
                if( window.FUNxxx2 && FUNxxx2()){
                    FUNxxx2();
                }
        
                
            }
        }
        return false;
    });
    
    $('#keyboard li').on("touchend",function(e){
        e.preventDefault();
    },false)
    

function classPassBox(){
    $(".pop-password").animate({bottom:"-360px"})
    setTimeout(options,200)
}
// $(".popup-password .bg").click(function(){
//     $(".pop-password").animate({bottom:"-360px"})
//     setTimeout(options,200)
// })
function options(){
    $(".popup-password").fadeOut(200);
}

$(".password_p").click(function(){
    index = 0;
    for(var len= 0;len<=passwords.elements.length;len++){
        if($(passwords.elements[len]).val()!=''){
            $(passwords.elements[len]).val('');
        }
    }
})
//图片切换
function imageSliderChange(imgBoxId,sliderBarId,thisImgIndex,len){
    var clientWidth = document.documentElement.clientWidth;//屏幕宽度
    var touchMoveSpeed = 0;//手指滑动速度
    var startT = 0,endT = 0;//手指滑动开始时间与结束时间
    //var len = $('#'+imgBoxId+' li').length;//图片个数
    $('#'+imgBoxId+' li').width(clientWidth);
    $('#'+imgBoxId).width(clientWidth*len);
    sliderBarId&&$('#'+sliderBarId+' li').width(clientWidth/len);
    var pageIndex = thisImgIndex;
    var prePoxX = pageIndex * clientWidth,endX = 0,moveDis = 0,isTouchMove = false;
    //初始化sliderBar位置
    sliderBarId&&$('#'+sliderBarId+' .active').removeClass('active');
    sliderBarId&&$('#'+sliderBarId+' li').eq(pageIndex).addClass('active');
    $('#'+imgBoxId).css({transform : 'translate(-' + pageIndex * clientWidth + 'px,-50%)'});
    $('#'+imgBoxId).bind('touchstart',function(e){
        var startX = e.originalEvent.touches[0].clientX;
        startT = new Date();//开始时间
        $('#'+imgBoxId).bind('touchmove',function(e){
            isTouchMove = true;
            endX = e.originalEvent.touches[0].clientX;
            moveDis = prePoxX + startX - endX;
            
            if(moveDis <= 0){//范围限定
                moveDis = 0;
            }else if(moveDis >= (len-1)*clientWidth){
                moveDis = (len-1)*clientWidth;
            }
            $(this).css({transform : 'translate(-' + moveDis + 'px,-50%)'});
            return false;
        });
        $('#'+imgBoxId).bind('touchend',function(e){
            if(!isTouchMove) return;
            endT = new Date();//结束时间
            touchMoveSpeed = Math.abs(startX - endX)/(endT-startT);//手指滑动速度
            isTouchMove = false;
            if((pageIndex*clientWidth - moveDis) > clientWidth/3){//满足切换条件 显示上一页
                pageIndex--;
            }else if((moveDis - pageIndex*clientWidth) > clientWidth/3){//满足切换条件 显示下一页
                pageIndex++;
            }else if(touchMoveSpeed > 1.0&&(pageIndex*clientWidth - moveDis) >0){//根据手指滑动速度判断切换
                pageIndex--;
            }else if(touchMoveSpeed > 1.0&&(moveDis - pageIndex*clientWidth) >0){
                pageIndex++;
            }
            if(pageIndex <= 0){
                pageIndex = 0;
            }
            if(pageIndex >= len - 1){
                pageIndex = len - 1;
            }
            //console.log(pageIndex);
            var transX = pageIndex * clientWidth;
            prePoxX = transX;
            $(this).css({transform : 'translate(-' + transX + 'px,-50%)'});
            sliderBarId&&$('#'+sliderBarId+' .active').removeClass('active');
            sliderBarId&&$('#'+sliderBarId+' li').eq(pageIndex).addClass('active');
        });
        return false;
    });
}