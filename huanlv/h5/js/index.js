/**
 * Created by w on 2016/5/26.
 */
$(document).ready(function(){
    $("#regAgree").change(function(){
        if($(this).is(":checked")){
            $(".regLogin p.agreement").removeClass("checkedOff").addClass("checkedOn");
        }else{
            $(".regLogin p.agreement").removeClass("checkedOn").addClass("checkedOff");
        }
        $(".regLogin .list label input").trigger("keyup");
    })
    $(".regLogin .list label input")/*.focus(function(){
        $(this).parents().parents(".list").removeClass("normal").addClass("onFocus");
    }).blur(function(){
        $(this).parents().parents(".list").removeClass("onFocus").addClass("normal");
    })*/.keyup(function(){
        var oI = $(this).parents("label").next("i");
        if($(this).is("#regPass")){
            if(/^[a-zA-Z0-9]{6,20}$/.test($(this).val())){
                oI.removeClass("error").addClass("success");
            }else {
                oI.removeClass("success").addClass("error");
            }
        }
        if($(this).is("#regpassConfirm")){
            if($(this).val() == $("#regPass").val() && /^[a-zA-Z0-9]{6,20}$/.test($("#regPass").val())
            ){
                oI.removeClass("error").addClass("success");
            }else {
                oI.removeClass("success").addClass("error");

            }
        }
        /*登录密码*/
        if($(this).is("#logPass")){
            if(/^[a-zA-Z0-9]{6,20}$/.test($(this).val())){
                oI.removeClass("error").addClass("success");
            }else {
                oI.removeClass("success").addClass("error");

            }
        }
        /*重置密码页面*/
        if($(this).is("#resetPass")){
            if(/^[a-zA-Z0-9]{6,20}$/.test($(this).val())){
                oI.removeClass("error").addClass("success");
            }else {
                oI.removeClass("success").addClass("error");
            }
        }
        if($(this).is("#resetConfirm")){
            if($(this).val() == $("#resetPass").val()){
                oI.removeClass("error").addClass("success");
            }else {
                oI.removeClass("success").addClass("error");

            }
        }
        var isAll = $(".regLogin .list label input").map(function(){
            return $(this).val() != "";
        });
        if(isAll.indexOf(false) == -1 && $("#regAgree").is(":checked")){
            $("#regSubmit").removeAttr('disabled').removeClass("disable").addClass("enable");
        }else {
            $("#regSubmit").attr("disabled","disabled").removeClass("enable").addClass("disable");
        }
    });

    /*注册页面*/
    var ranNum = randomNum(8);
    var regsrcImg ='http://192.168.0.153:8080/site/captcha/'+ranNum;
    $("#regImgValide").attr("src",regsrcImg).tap(function(){
        ranNum = randomNum(8);
        regsrcImg ='http://192.168.0.153:8080/site/captcha/'+ranNum;
        $(this).attr("src",regsrcImg);
    });
   $("#regGetMess").tap(function(){
        /!*if(!regValideMess()) return;*!/
        var self = this;
        var param = {};
        param["sessionId"] = ranNum;
        param["picCode"] = $.trim($("#regImgCode").val());
        param["mobile"] = $.trim($("#regPhone").val());
        param["apiVersion"] = '1.1.1';
        param["md5Sign"] =hex_md5(md5seri(param)).toUpperCase();
        $.post("http://192.168.0.153:8080/site/common/sendSms",param,function(result){
            var regmesJson = JSON.parse(result);
            alert(regmesJson);
            slideDownAlert("发送短信成功!");
            console.log(regmesJson);
            console.log(regmesJson.state);
            console.log(regmesJson.msg);
            alert(regmesJson.state);
                if(regmesJson.state == "S"){
                    settime(self);
                    slideDownAlert("发送短信成功!");
                }else if(regmesJson.state == "F") {
                    alert(regmesJson.state);
                    slideDownAlert(regmesJson.msg);
                    setTimeout(function(){
                        ranNum = randomNum(8);
                        regsrcImg ='http://192.168.0.153:8080/site/captcha/'+ranNum;
                        $("#regImgValide").attr("src",regsrcImg);
                    },500);
                }
        });
    });
    $("#regSubmit").tap(function(){
        var regData = {};
        regData["mobile"] = $.trim($("#regPhone").val());
        regData["sessionId"] = ranNum;
        regData["smsCode"] = $.trim($("#regPhoneCode").val());
        regData["picCode"] = $.trim($("#regImgCode").val());
        regData["userPasswd"] = $.trim($("#regPass").val());
        regData["apiVersion"] = '1.1.1';
        regData["devName"] = 'html5';
        regData["md5Sign"] =hex_md5(md5seri(regData)).toUpperCase();
        if( $(this).attr("disabled") == false && regValide()){
            $.post("http://192.168.0.153:8080/site/user/userRegs",regData,function(result){
                var regJson = JSON.parse(result);
                if(regJson.state == "S"){ //注册成功
                    slideDownAlert("注册成功！");
                }else if(regJson.state == "F"){
                    slideDownAlert(regJson.msg);
                    ranNum = randomNum(8);
                    regsrcImg ='http://192.168.0.153:8080/site/captcha/'+ranNum;
                    $("#regImgValide").attr("src",regsrcImg);
                }
            });
        }
        return false;
    });
    /*登录页面*/
    var logranNum = randomNum(8);
    var logregsrcImg ='http://192.168.0.153:8080/site/captcha/'+logranNum;
    $("#retImgValide").attr("src",logregsrcImg).tap(function(){
        logranNum = randomNum(8);
        logregsrcImg ='http://192.168.0.153:8080/site/captcha/'+logranNum;
        $(this).attr("src",logregsrcImg);
    });
    $("#logSubmit").tap(function(){
        if(logValide()){
            var logData = {};
            logData["mobile"] = $.trim($("#logPhone").val());
            logData["sessionId"] = logranNum;
            logData["picCode"] = $.trim($("#logImgCode").val());
            logData["apiVersion"] = '1.1.1';
            logData["devName"] = 'html5';
            logData["userPasswd"] = $.trim($("#logPass").val());
            logData["md5Sign"] =hex_md5(md5seri(logData)).toUpperCase();

            $.post("http://192.168.0.153:8080/site/user/login",logData,function(result){
                var regJson = JSON.parse(result);
                console.log(regJson);
                console.log(regJson.state);
                console.log(regJson.msg);
                if(regJson.state == "S"){ //登录成功
                    slideDownAlert("登录成功！");
                }else if(regJson.state == "F"){
                    slideDownAlert(regJson.msg);
                    logranNum = randomNum(8);
                    logregsrcImg ='http://192.168.0.153:8080/site/captcha/'+logranNum;
                    $("#logImgValide").attr("src",logregsrcImg);
                }
            });

        }
    });
    /*找回密码页面*/
    var retranNum = randomNum(8);
    var retregsrcImg ='http://192.168.0.153:8080/site/captcha/'+retranNum;
    $("#retImgValide").attr("src",retregsrcImg).tap(function(){
        retranNum = randomNum(8);
        retregsrcImg ='http://192.168.0.153:8080/site/captcha/'+retranNum;
        $(this).attr("src",retregsrcImg);
    });
    $("#retGetMess").click(function(){
        if(!retrievemsgValide()) return;
        var self = this;
        var retData = {};
        retData["sessionId"] = retranNum;
        retData["picCode"] = $("#retrImgCode").val();
        retData["mobile"] = $("#retrPhone").val();
        retData["apiVersion"] = '1.1.1';
        retData["md5Sign"] =hex_md5(md5seri(retData)).toUpperCase();
        $.post("http://192.168.0.153:8080/site/common/sendSms",retData,function(result,state,b){
            var retmesJson = JSON.parse(result);
            console.log(retmesJson);
            console.log(retmesJson.state);
            console.log(retmesJson.msg);
			
            if(retmesJson.state == "S"){
                settime(self);
                slideDownAlert(retmesJson.msg);
            }else if(retmesJson.state == "F"){
                slideDownAlert("图片验证码错误！");
                setTimeout(function(){
                    retranNum = randomNum(8);
                    retregsrcImg ='http://192.168.0.153:8080/site/captcha/'+retranNum;
                    $("#retImgValide").attr("src",retregsrcImg);
                },500);

            }
        });
    });
    var retData;
    $("#retrieveSubmit").tap(function(){
        if(retrieveValide()){
            retData = {};
            retData["mobile"] = $.trim($("#retrPhone").val());
            retData["sessionId"] = retranNum;
            retData["picCode"] = $.trim($("#retrImgCode").val());
            retData["smsCode"] = $.trim($("#retrPhoneCode").val());
            retData["apiVersion"] = '1.1.1';
            retData["devName"] = 'html5';
            retData["md5Sign"] =hex_md5(md5seri(retData)).toUpperCase();
            $.post("http://192.168.0.153:8080/site/user/validMobile",retData,function(result){
                var retJson = JSON.parse(result);
                console.log(retJson);
                console.log(retJson.state);
                console.log(retJson.msg);
                if(retJson.state == "S"){ //成功 下一步
                    window.location.href="http://localhost:8081/%E6%AC%A2%E6%97%85%E6%96%B0%E9%A1%B9%E7%9B%AE/h5/html/ResetPass.html";
                    $("#resetPhoneNum").html(retData["mobile"]);
                }else if(retJson.state == "F"){
                    slideDownAlert(retJson.msg);
                    retranNum = randomNum(8);
                    retregsrcImg ='http://192.168.0.153:8080/site/captcha/'+retranNum;
                    $("#retImgValide").attr("src",retregsrcImg).val("");
                }
            });
        }
    });
    /*重置密码页面*/
    $("#resetSubmit").tap(function(){
        if(resetValide()){
            var resetData = {};
            resetData["mobile"] = $.trim(retData["mobile"]);
            resetData["apiVersion"] = '1.1.1';
            resetData["userPasswd"] = $.trim($("#resetPass").val());
            resetData["devName"] = 'html5';
            resetData["md5Sign"] =hex_md5(md5seri(resetData)).toUpperCase();
            $.post("http://192.168.0.153:8080/site/user/validMobile",resetData,function(result){
                var resetJson = JSON.parse(result);
                console.log(resetJson);
                console.log(resetJson.state);
                console.log(resetJson.msg);
                if(resetJson.state == "S"){ //成功 下一步

                }else if(resetJson.state == "F"){
                    slideDownAlert(resetJson.msg);
                }
            });
        }
    });
});
var Phone= /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,
    imgreg = /[0-9]{4}/,
    phonereg = /[0-9]{6}/;
function regValide(){
    var oPhone = $("#regPhone").val(),
        oImgCode = $("#regImgCode").val(),
        oPhoneCode = $("#regPhoneCode").val(),
        oPass = $("#regPass").val(),
        oPassC = $("#regpassConfirm").val();
    console.log(oImgCode);
    console.log(oPhoneCode);
    if(oPhone == ""){
        slideDownAlert("请输入手机号");
        return false;
    }else if(!Phone.test(oPhone)){
        slideDownAlert("手机号码不正确");
        return false;
    }
    if(oImgCode == ""){
        slideDownAlert("请输入图片验证码");
        return false;
    }else if(!imgreg.test(oImgCode)){
        slideDownAlert("请输入正确图片验证码");
        return false;
    }
    if(oPhoneCode == ""){
        slideDownAlert("请输入手机验证码");
        return false;
    }else if(!phonereg.test(oPhoneCode)){
        slideDownAlert("请输入正确手机验证码");
        return false;
    }
    if(oPass == ""){
        slideDownAlert("请输入密码");
        return false;
    }else if(!/^[a-zA-Z0-9]{6,20}$/.test(oPass)){
        slideDownAlert("密码为6-20位数字或字母");
        return false;
    }
    if(oPassC == ""){
        slideDownAlert("请确认密码");
        return false;
    }else if(oPass !== oPassC){
        slideDownAlert("密码输入不一致");
        return false;
    }
    return true;
}
function regValideMess(){
    var oPhone = $("#regPhone").val(),
        oImgCode = $("#regImgCode").val();
    if(oPhone == ""){
        slideDownAlert("请输入手机号");
        return false;
    }else if(!Phone.test(oPhone)){
        slideDownAlert("手机号码不正确");
        return false;
    }
    if(oImgCode == ""){
        slideDownAlert("请输入图片验证码");
        return false;
    }else if(!imgreg.test(oImgCode)){
        slideDownAlert("请输入正确图片验证码");
        return false;
    }
    return true;
}
function logValide(){
    var oPhone = $("#logPhone").val(),
        oImgCode = $("#logImgCode").val(),
        oPass = $("#logPass").val();
    if(oPhone == ""){
        slideDownAlert("请输入手机号");
        return false;
    }else if(!Phone.test(oPhone)){
        slideDownAlert("手机号码不正确");
        return false;
    }


    if(oPass == ""){
        slideDownAlert("请输入密码");
        return false;
    }else if(!/^[a-zA-Z0-9]{6,20}$/.test(oPass)){
        slideDownAlert("密码为6-20位数字或字母");
        return false;
    }
    if(oImgCode == ""){
        slideDownAlert("请输入图片验证码");
        return false;
    }else if(!imgreg.test(oImgCode)){
        slideDownAlert("请输入正确图片验证码");
        return false;
    }
    return true;
}
function retrieveValide(){
    var oPhone = $("#retrPhone").val(),
        oImgCode = $("#retrImgCode").val(),
        oPhoneCode = $("#retrPhoneCode").val();
    if(oPhone == ""){
        slideDownAlert("请输入手机号");
        return false;
    }else if(!Phone.test(oPhone)){
        slideDownAlert("手机号码不正确");
        return false;
    }
    if(oImgCode == ""){
        slideDownAlert("请输入图片验证码");
        return false;
    }else if(!imgreg.test(oImgCode)){
        slideDownAlert("请输入正确图片验证码");
        return false;
    }
    if(oPhoneCode == ""){
        slideDownAlert("请输入手机验证码");
        return false;
    }else if(!phonereg.test(oPhoneCode)){
        slideDownAlert("请输入正确手机验证码");
        return false;
    }
    return true;
}
function resetValide(){
    var  oPass = $("#resetPass").val(),
        oPassC = $("#resetConfirm").val();
    if(oPass == ""){
        slideDownAlert("请输入密码");
        return false;
    }else if(!/^[a-zA-Z0-9]{6,20}$/.test(oPass)){
        slideDownAlert("密码为6-20位数字或字母");
        return false;
    }
    if(oPassC == ""){
        slideDownAlert("请确认密码");
        return false;
    }else if(oPass !== oPassC){
        slideDownAlert("密码输入不一致");
        return false;
    }
    return true;
}
function retrievemsgValide(){
    var oPhone = $("#retrPhone").val(),
        oImgCode = $("#retrImgCode").val();
    if(oPhone == ""){
        slideDownAlert("请输入手机号");
        return false;
    }else if(!Phone.test(oPhone)){
        slideDownAlert("手机号码不正确");
        return false;
    }
    if(oImgCode == ""){
        slideDownAlert("请输入图片验证码");
        return false;
    }else if(!imgreg.test(oImgCode)){
        slideDownAlert("请输入正确图片验证码");
        return false;
    }
    return true;
}

function slideDownAlert(mess){
    if($("#slideDownAlert p").text() !== null) return;
    var odiv = $("<div><p></p><span></span></div>").attr("id","slideDownAlert");
    odiv.children("p").html(mess);
    $("body").append(odiv);
    odiv.animate({
        " -webkit-transform":"translateY(0rem)"
    },300);
    var timer = setTimeout(function(){
        odiv.remove();
    },3000);
    odiv.children("span").on("touchend",function(event){
        odiv.animate({
            " -webkit-transform":"translateY(-100%)"
        },300,function(){
            odiv.remove();
            clearTimeout(timer);
        });
        event.preventDefault();
    });
}

var countdown=60;
function settime(val) {
    if (countdown == 0) {
        val.removeAttribute("disabled");
        val.value="获取";
        countdown = 60;
    } else {
        val.setAttribute("disabled", "disablde");
        val.value= countdown + "s";
        countdown--;
        timer = setTimeout(function() {
            settime(val)
        },1000)
    }
}
function md5seri(obj){
    var str = 'QSFETTUGBVNEREWR';
    for(var i in obj){
        str+= ';'+ i + ':' +obj[i];
    }
    return str;
}
function randomNum(num){
    var str = "";
    for(var i = 0;i < num; i++){
        if(i == "md5Sign") continue;
        str += Math.floor(Math.random()*9);
    }
    return str;
}