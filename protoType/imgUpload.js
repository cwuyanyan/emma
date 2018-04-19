// sessionStorage.imgArr = ""; //默认为空的imgUrl
// sessionStorage.i = 0; //计算该添加图片第几个
var imgArr = new Array(); //空的数组
function imgSubmit() {
    $("#imgForm").ajaxSubmit({
        //定义返回JSON数据，还包括xml和script格式
        dataType: 'json',
        //表单提交前做表单验证
        beforeSubmit: function () {
            var filepath = $("#imgSend").val();
            var extStart = filepath.lastIndexOf(".");
            var ext = filepath.substring(extStart, filepath.length).toUpperCase();
            if (ext != ".PNG" && ext != ".JPG") {
                console.log('文件类型错误')
            }
        },
        success: function (res) {
            console.log(res)
            if (res.status == 1) {
                console.log('上传失败');
                console.log(res);
            } else {
                //存储返回的图片地址
                // imgArr.push(res.data);
                imgArr.push(api.url + '/' + res.list);
                //展示已经上传的图片
                $('.imgBox').append('<div class="img" id="img' + imgArr.length + '"><img src="' +
                    imgArr[imgArr.length] + '" alt="" style="width: 100%"></div>');
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function imgBoxClose() {
    $.ajax({
        url: api.url + '/check/updateCheckImg',
        type: "post",
        dataType: 'json',
        data: {
            caseId: 1, //病例Id
            checkHospId: 1, //医院Id
            imgUrl: imgArr.join(',') //图片地址
        },
        success: function (res) {
            if (res.code == 200) {
                alert('提交成功')
            } else {
                alert('发生的错误啊')
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    $('#alertBoxBg').css('display', 'none')
}

//第二个上传

var imgArr1 = new Array(); //空的数组
function imgSubmit1() {
    $("#imgForm1").ajaxSubmit({
        //定义返回JSON数据，还包括xml和script格式
        dataType: 'json',
        //表单提交前做表单验证
        beforeSubmit: function () {
            var filepath = $("#imgSend1").val();
            var extStart = filepath.lastIndexOf(".");
            var ext = filepath.substring(extStart, filepath.length).toUpperCase();
            if (ext != ".PNG" && ext != ".JPG") {
                console.log('文件类型错误')
            }
        },
        success: function (res) {
            console.log(res)
            if (res.status == 1) {
                console.log('上传失败');
                console.log(res);
            } else {
                //存储返回的图片地址
                // imgArr.push(res.data);
                imgArr1.push(api.url + '/' + res.list);
                //展示已经上传的图片
                $('.imgBox').append('<div class="img" id="img' + imgArr1.length + '"><img src="' +
                    imgArr1[imgArr1.length] + '" alt="" style="width: 100%"></div>');
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function imgBoxClose1() {
    $.ajax({
        url: api.url + '/check/updateCheckImg',
        type: "post",
        dataType: 'json',
        data: {
            caseId: 1, //病例Id
            checkHospId: 1, //医院Id
            imgUrl: imgArr1.join(',') //图片地址
        },
        success: function (res) {
            if (res.code == 200) {
                imgArr1 = [];
                alert('提交成功')
            } else {
                alert('发生的错误啊')
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    $('#alertBoxBg1').css('display', 'none')
}