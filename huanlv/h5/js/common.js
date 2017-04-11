// JavaScript Document

//公共方法函数类库;
/**
post提交
参数:
aPostPath:提交服务端的路径
aRequestData:提交参数，json形式
aSuccessFunc:成功回调函数
aErrorFunc:失败回调函数
aTimeOut:【可选】超时时间，默认30秒，毫秒为单位
*/

var apiVersion = "v2.0";
var devName = "webApp";
//var CONST_SERVER_DOMAIN = 'http://192.168.0.81:8080/site/';
//内网
// var CONST_SERVER_DOMAIN = 'http://192.168.0.200:8085/site-admin-' + apiVersion + '/site/';
//预发布
//var CONST_SERVER_DOMAIN = 'https://prem.huanlvjinfu.cn/site-admin-' + apiVersion + '/site/';
//外网
var CONST_SERVER_DOMAIN = 'https://app.huanlvjinfu.cn/site-admin-' + apiVersion + '/site/';



function httpAjax(ajaxType, aPostPath, aRequestData, aSuccessFunc, aErrorFunc, aTimeOut){
	
	$.ajax({
			type: ajaxType,
			url: CONST_SERVER_DOMAIN+aPostPath,//"ztuserv/api/query.action",
			dataType:"json",
			data:aRequestData,
			timeout:aTimeOut == null?15*1000:aTimeOut,
			beforeSend:function(){
			   $("body").append("<div class='atimeout'><div class='loader'><div class='loader-inner ball-pulse'><div></div><div></div><div></div></div></div><br/><br/><br/>加载中...</div>")
			},
			success:aSuccessFunc,
			error:aErrorFunc,
			complete:function(){
				   $(".atimeout").remove();
				},
			});
}
/*超时提示*/
function aTimeOut(){
	  $(".atimeout").remove();
	  $("body").append("<div class='zhezhao'><div class='contact_zhezhao'><p>提示</p><span>网络请求错误请尝试重新连接...</span><div class='clear'></div><a class='clickhidden' onclick=''>确定</a></div>");
}
/*获取地址url参数*/
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

//判断是否为点击
var startX, startY, endX, endY, tx=0,ty=0,isClick = false;
$("body").bind("touchstart", function (e) {
    isClick = true;
    tx = e.originalEvent.changedTouches[0].pageX,
    ty = e.originalEvent.changedTouches[0].pageY;
}).bind("touchend", function (e) {
    mx = e.originalEvent.changedTouches[0].pageX,
    my = e.originalEvent.changedTouches[0].pageY;
    if (Math.abs(mx - tx) > 5 || Math.abs(my - ty) > 5) isClick = false;
    //console.log("end:" + isClick);
});

//获取随机数;
function randomNum(num){
    var str = "";
    for(var i = 0;i < num; i++){
        str += Math.floor(Math.random()*9);
    }
    return str;
}

//MD5加密;
function md5seri(obj){
    var str = 'QSFETTUGBVNEREWR';
    for(var i in obj){
        str+= ';'+ i + ':' +obj[i];
    }
    return str;
}

// 公共弹框  popupbox
$(".popupbox_cancel").click(function(){
    $(".popupbox").hide();
})
$(".popupbox_ok").click(function(){
    $(".popupbox").hide();
})
$('.bg').bind('touchmove',function(e){
    e.preventDefault();
    return false;
});

//转向登录页并把跳转的页面地址带过去,方便用户登录后跳回其位置;
function gotologin(flag) {
	/*_
    var url = window.location;
	//alert( getCookie("mobile") );
	//alert( getLoginStatus() );
    if (getcache("mobile") == null && getCookie("mobile") == null) {
		//alert( 456 );
		if(flag){
			window.location = "login.html"	
		}else{
        	window.location = "login.html?url=" + url;
		}
		return false;
    } else if( getcache("mobile") == "" && typeof getCookie("mobile") == 'undefined' ){
		if(flag){
			window.location = "login.html";
		}else{
			window.location = "login.html?url=" + url;
		}
		return false;
	}else{
	    return true;
	}
	_*/
}
//返回当前登录状态
function getLoginStatus() {
//	if( isSessionStorageSupported() ){
//		return getcache("mobile");
//	}else{
//		return getCookie("mobile");
//	}
	if(getCookie("mobile")){
		return getCookie("mobile");
	}
	if(getcache("mobile")){
		return getcache("mobile");
	}
}
//将用户名记录在本地
function setLocal(k,v) {
    try {
        localStorage.setItem(k, v);
    } catch (e) {
    }
}
//读取本地用户名信息
function getLocal(k) {
    return localStorage.getItem(k);
}

//删除本地永久缓存;
function removeLocal(key){
	localStorage.removeItem(key);
}
//读取缓存
function getcache(key) {
    if (sessionStorage[key])
        return sessionStorage.getItem(key);
    else
        return "";
}
//更改缓存
function setcache(key, v) {
    sessionStorage.setItem(key, v);
}
//删除缓存
function removecache(key) {
    sessionStorage.removeItem(key);
}
//记录当前登录状态
function saveLoginStatus(username) {
    setcache("mobile", username);
}
//退出登录状态
function loginOut() {
	
    // httpAjax("get","../", aRequestData, aSuccessFunc, aErrorFunc, aTimeOut);
	//function aSuccessFunc(data) {
        //if (data.state == "S") {
			removeLocal("userId");
			removeLocal( "userName");
            removeLocal( "IDCard");
            removecache("mobile");
			delCookie("mobile");
			delCookie("userId");
			delCookie("userName");
			delCookie("IDCard");
			$("#userName").html("");
			$("#timeHello").html("");
            window.location = "index.html";
        /*} else {
            removecache("username");
            window.location = "index.html";
        }*/
    //}
}
function isWeiXin(){ 
    var ua = window.navigator.userAgent.toLowerCase(); 
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
        return true; 
    }else{ 
        return false; 
    }
}

//设置cookie;
function setCookie(key, value, t) {
	var oDate = new Date();
	oDate.setDate( oDate.getDate() + t );
	document.cookie = key + '=' + encodeURI(value) + ';expires=' + oDate.toGMTString();
}
//获取cookie;
function getCookie(key) {
	var arr1 = document.cookie.split('; ');
	for (var i=0; i<arr1.length; i++) {
		var arr2 = arr1[i].split('=');
		if ( arr2[0] == key ) {
			return decodeURI(arr2[1]);
		}
	}
}
//删除cookies
function delCookie(key) {
	setCookie(key, '', -1);
}

//文本框只能输入数字，并屏蔽输入法和粘贴
$.fn.numeral = function () {
	$(this).css("ime-mode", "disabled");
	this.bind("keypress", function (e) {
		var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE    
		if (navigator.userAgent.indexOf("Firefox") > 0 && (e.keyCode === 8 || e.keyCode === 9))  //火狐下不能使用退格键和tab   
			return;
		return code >= 48 && code <= 57;
	});
	this.bind("blur", function () {
		if (this.value.indexOf(".") > 0) {
			this.value = "";
			this.focus();
		} else if (isNaN(this.value)) {
			this.value = "";
			this.focus();
		}
	});
	this.bind("keyup", function () {
		if (this.value.indexOf(".") > 0) {
			this.value = "";
			this.focus();
		} else if (isNaN(this.value)) {
			this.value = "";
			this.focus();
		}
	});
	//this.bind("paste", function () {
//		var s = clipboardData.getData('text');
//		if (!/\D/.test(s));
//		value = s.replace(/^0*/, '');
//		return false;
//	});
	this.bind("dragenter", function () {
		return false;
	});
}
//数字格式化方法;
function FormatMoney(s, n) {  
	n = n > 0 && n <= 20 ? n : 2;  
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];  
	t = "";  
	for (i = 0; i < l.length; i++) {  
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
	}  
	return t.split("").reverse().join("") + "." + r;  
}

//判断浏览器是否支持sessionStorage的方法:
function isSessionStorageSupported() {
    var testKey = 'test',
        storage = window.sessionStorage;
    try {
        storage.setItem(testKey, 'testValue');
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}

//替换富文本正则方法;
function removeHTMLTag(str) {
	str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
	str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
	str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
	str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
	return str;
}

//手机号码验证规则;
var reg = /^1(3[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{8}$/;
//邮箱验证
function checkEmail(str){
    var re = /^\w+((-\w+)|(.\w+))\@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
    if(re.test(str)) return true;
    return false;
}
//国内固话电话验证 2-5位  - 7-8位
function checkTel(str){
    var re = /^\d{2,5}-\d{7,8}$/;
    if(re.test(str)) return true;
    return false;
}
//银行卡验证
function checkBankCard(str){
    var re = /^\d{16,21}$/;
    if(re.test(str)) return true;
    return false;
}
//客服电话
var telNumber = 4008516977;
//弹窗提示
var popupTIPS = {
    "tips1" : "期待中...",
    "tips2" : "请重试",
    "tips3" : "请将数据补全",
    "tips4" : "正在加载...",
    "tips5" : "请先完善个人信息",
    "tips6" : "请等待认证通过",
    "tips7" : "您未通过认证",
    "tips8" : "请绑定银行卡",
    "tips9" : "请输入收到的短信",
    "tips10" : "请输入手机号",
    "tips11" : "系统忙，请稍后再试。",
    "tips12" : "未认证",
    "tips13" : "未完成",
    "tips14" : "审核中",
    "tips15" : "已认证",
    "tips16" : "未通过",
    "tips17" : "请先完成个人信息",
    "tips18" : "请先点亮运营商",
    "tips19" : "请先验证学籍信息",
    "tips20" : "请重新拍照上传图片",
    "tips21" : "识别中，请稍候",
    "tips22" : "请将资料补齐后再操作",
    "tips23" : "请选择身份证正面照片",
    "tips24" : "请选择身份证反面照片",
    "tips25" : "请重新拍照上传图片",
    "tips26" : "该身份证已注册",
    "tips27" : "请先拍摄身份证正面照片",
    "tips28" : "请先拍摄身份证反面照片",
    "tips29" : "请将资料补齐后再操作",
    "tips30" : "请选择银行卡",
    "tips31" : "银行卡卡号不能为空",
    "tips32" : "手机号码不能为空",
    "tips33" : "图片验证码不能为空",
    "tips34" : "请拍摄银行卡正面照片",
    "tips35" : "欢旅金服支付协议未勾选",
    "tips36" : "短信验证码不能为空",
    "tips37" : "信息未填写完成",
    "tips38" : "您所填写的手机号码有误",
    "tips39" : "您所填写的身份证号码有误",
    "tips40" : "您所填写的邮箱有误",
    "tips41" : "您所填写的区号有误",
    "tips42" : "请正确输入图片验证码",
    "tips43" : "请正确输入短信验证码",
    "tips44" : "请输入11位手机号码",
    "tips45" : "身份证号码不能为空",
    "tips46" : "网络请求错误请尝试重新连接",
    "tips47" : "同意欢旅金服服务协议未勾选",
    "tips48" : "安全码不能为空",
    "tips49" : "输入6位安全码（只包含数字）",
    "tips50" : "确认安全码不能为空",
    "tips51" : "两次安全码输入不一致",
    "tips52" : "输入6位原密码（只包含数字）",
    "tips53" : "输入6位新密码（只包含数字）",
    "tips54" : "请确认新密码",
    "tips55" : "确认密码与新密码不一致",
    "tips56" : "运营商服务密码不能为空，请重新输入",
    "tips57" : "运营商服务密码为6位，请重新输入",
    "tips58" : "运营商服务密码有误，请重新输入",
    "tips59" : "联通用户无需输入短信验证码",
    "tips60" : "请求出错，请重新获取",
    "tips61" : "运营商短信验证码不能为空，请重新输入",
    "tips62" : "运营商短信验证码为6位，请重新输入",
    "tips63" : "学信网帐号密码不能为空",
    "tips64" : "敬请期待！",
    "tips65" : "您所填写的固话号码有误"
}
//蒙版滑动事件禁止穿透
$('#tipsBox').bind('touchmove',function(){
    return false;
});