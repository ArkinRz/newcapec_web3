// JavaScript Document
$(function () {
    var foot_html = [
    	'<nav class="mui-bar mui-bar-tab mui-bar-bs">',
			'<a href="javascript:;" class="mui-tab-item mui-active">',
				'<span class="mui-icon sy"></span>',
				'<span class="mui-tab-label">首页</span>',
			'</a>',
			'<a href="javascript:;" class="mui-tab-item">',
				'<span class="mui-icon cp"></span>',
				'<span class="mui-tab-label">产品</span>',
			'</a>',
			'<a href="javascript:;" class="mui-tab-item">',
				'<span class="mui-icon wd"></span>',
				'<span class="mui-tab-label">我的</span>',
			'</a>',
		'</nav>'
    ];
    $("body").append(foot_html.join(""));
	
	//获取a标签;并点击然后跳转到相应页面;
	$(".mui-bar-bs a").on("touchend",function(e){
		var _index = $(this).index();
		switch ( _index ){
			case 0:
				window.location.href = "index.html";
				break;
			case 1:
				window.location.href = "ProductList.html";
				break;
			case 2:
				window.location.href = "private.html";
				break;
		}
		e.preventDefault();
	})
});



