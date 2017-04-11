// JavaScript Document

function pdsListattType(data) {
    var div;
    switch(parseInt(data.attType)) {
        case 1:
            div = '<div class="mui-input-row pdr0 arkin1"><label style="padding: 11px 15px;">' + data.title + '</label><input type="text" maxlength=' + data.attLength + ' class="tr cb2" id=' + data.field + ' placeholder="输入' + data.title + '"></div>'
            break;

        case 2:
            div = '<div class="mui-input-row pdr0 arkin1"><label style="padding: 11px 15px;">' + data.title + '</label><input type="tel" maxlength=' + data.attLength + ' class="tr cb2" id=' + data.field + ' placeholder="输入' + data.title + '"></div>'
            break;

        case 3:
            var nowDate = new Date();
            var nowDateStr = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) +  '-' + nowDate.getDate();
            div = '<div class="mui-input-row pdr0 arkin1 arkin-box" style="position:relative;" id=""><label class="timeName" style="padding: 11px 15px;">' + data.title + '</label><input type="date" id=' + data.field + ' class="tr cb2 inputBar" value="' + nowDateStr + '"><input type="text" class="inputLy cb2" value="' + nowDateStr + '"></div>'
            break;

        case 4:
            div = '<div class="mui-input-row pdr0 arkin1 add add_bottom"><label style="padding: 11px 15px;">' + data.title + '</label><textarea class="cb2 ttra" name="" cols="30" maxlength=' + data.attLength + ' id=' + data.field + ' placeholder="输入' + data.title + '"></textarea></div>'
            break;

        case 5:
             var str = '';
            for(var i=0; i<data.dropDownList.length;i++){
                str += '<option value="' + data.dropDownList[i] + '">' + data.dropDownList[i] + '</option>';
            }
            div = '<div class="mui-input-row pdr0 arkin3 address" style="position: relative;"><label style="padding: 11px 15px;">' + data.title + '</label><select name="" id=' + data.field + ' style="width: 20%;position: absolute;right:0;color: #b2b2b2;">' + str + '</select></div>';
            break;

        case 6: //图片集合;
            var html = "";
            for(var i in data.imgList) {
                if(data.imgList[i]) {
                    html += '<li class="mui-table-view-cell mui-media mui-col-xs-6"><span class="" style="position: relative;background: #fff url(../images/bujianImg.png) no-repeat scroll center 20%;background-size: 100% 100%;" id="hl-student"><p style="position: absolute;bottom:-20px;left: 0;text-align: center;width:100%; height:20px; overflow: hidden; font-size: 13px;">' + data.imgList[i].title + '</p></span><img src="" id="showimg" class="img-bg" style="border: 0;display: none;" /><input accept="image/*" type="file" maxlength=' + data.imgList[i].attLength + ' capture="camera" onfocus="this.blur()" value="拍照" class="hl-student-img" style="opacity:0;" id=' + data.imgList[i].field + '></li>';
                }
            }
            div = '<ul class="mui-table-view mui-grid-view mui-came">' + html + '</ul>';
            break;

    }
    return div;
}

//根据传过来的图片field, 显示对应的图片类型;
//var config = {
//  "stucoversimg": "hl-student",
//  "stupageimg": "hl-student-infro",
//  "customimg1": "hl-student-reg",
//  "customimg2": "hl-student-infro-hand"
//}