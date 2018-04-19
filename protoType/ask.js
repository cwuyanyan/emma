// 问诊
function askQus() {
    var searchKey = $('#searchKey').val();
    $.ajax({
        url: api.url + '/inquiry/getallsymptom',
        type: "post",
        dataType: 'json',
        data: {
            symptom: searchKey
        },
        success: function (res) {
            if (res.code == 200) {
                secondBtn(res.list);
            } else {
                firstBtn(res.list);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}


// 生成可点击的病因
function firstBtn(arr) {
    var askBox = $('#askBox');
    var html = '';
    arr.forEach(element => {
        html += '<div class="btn btn-default btnQus" style="margin: 5px">' + element + '</div>'
    });
    $('#askBox').append(html)
}


//添加点击事件 (身体部位)
$("#askBox").on("click", ".btnQus", function () {
    var qus = $(this).text();
    //   生成主诉内容
    var userTold = $('#user_told');
    var str = userTold.val() + qus + ',';
    userTold.val(str);
    //   填入搜索框
    $('#searchKey').val(qus);
    //从新搜索
    askQus();
    //销毁病症
    $("#askBox").empty()
});


//第二次病因展示
function secondBtn(obj) {
    var askBox = $('#askBox');
    var html = '';
    for (var key in obj) {
        html += '<div class="btn btn-default btnQus2" style="margin: 5px" data-id=' + obj[key] + ' >' + key + '</div>'
    }
    $('#askBox').append(html)
}
//添加点击事件 (身体部位)
$("#askBox").on("click", ".btnQus2", function () {
    var qus = $(this).text();
    //   生成主诉内容
    var userTold = $('#user_told');
    var str = userTold.val() + qus + ',';
    userTold.val(str);
    //访问startSession
    startSession($(this).attr('data-id'))
    //销毁病症
    $("#askBox").empty()
});

//第三次病因查询
function startSession(key) {
    $.ajax({
        url: api.url + '/inquiry/startsession',
        type: "post",
        dataType: 'json',
        data: {
            symptomId: key
        },
        success: function (res) {
            if (res.code == 200) {
                savesid(res.list.sid)
            } else {
                alert('发生的错误啊')
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

//必须调用的
function savesid(sid) {
    $.ajax({
        url: api.url + '/inquiry/savesid',
        type: "post",
        dataType: 'json',
        data: {
            sid: sid
        },
        success: function (res) {
            console.log(res)
            console.log(sid)
            if (res.code == 200) {
                fetchquestion(sid, 0)
            } else {
                alert('发生的错误啊')
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}


//第四次病因查询
function fetchquestion(sid, params) {
    var data = {}
    if (!params) {
        data = {
            sid: sid
        }
    } else {
        data = {
            sid: sid,
            questionId: params.questionId,
            answers: params.answers
        }
    }
    $.ajax({
        url: api.url + '/inquiry/fetchquestion',
        type: "post",
        dataType: 'json',
        data: data,
        success: function (res) {
            if (res.code == 200) {
                fetchquestionBtn(sid, res.list)
            } else {
                alert('发生的错误啊')
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

//第四次病因选择按钮
function fetchquestionBtn(sid, obj) {
    var html = "";
    var qusType = obj.nodeType == "Question" ? 1 : 0;
    var qusSelectType = obj.questionType == "SingleSelection" ? 1 : 0;
    var ansObj = obj.answers;
    //   生成选择(单双选)
    if (obj.questionType == "SingleSelection") { //   单选
        html += '<div class="col-lg-12" data-qusId="' + obj.questionId + '">' + obj.questionText + '</div>';
        html += '<div class="col-lg-12 singleSelect" style="margin-top: 20px">';
        for (var i in ansObj) {
            html += '<input type="radio" name="singleSelect" value="' + ansObj[i].answerId + '" id="singleSelect' + i + '"><label for="singleSelect' + i + '" style="margin-right:10px">' + ansObj[i].answerText + '</label>';
        }
        html += '</div>';
        html += '<div class="btnBox col-lg-12 text-right" style="margin-top: 20px;">';
        html += '<div class="btn btn-success btnAskSelect" data-qusId=' + obj.questionId + ' data-qusText="' + obj.questionText + '" data-selectType=' + qusSelectType + ' data-sid=' + sid + ' data-qusAsk=' + qusType + '>提交</div>';
        html += '</div>';
    } else if (obj.questionType == "MultiSelection") { //多选
        html += '<div class="col-lg-12" data-qusId="' + obj.questionId + '">' + obj.questionText + '</div>';
        html += '<div class="col-lg-12 singleSelect" style="margin-top: 20px">';
        for (var i in ansObj) {
            html += '<input type="checkbox" name="moreSelect" value="' + ansObj[i].answerId + '" id="moreSelect' + i + '"><label for="moreSelect' + i + '" style="margin-right:10px">' + ansObj[i].answerText + '</label>';
        }
        html += '</div>';
        html += '<div class="btnBox col-lg-12 text-right" style="margin-top: 20px;">';
        html += '<div class="btn btn-success btnAskSelect" data-qusId=' + obj.questionId + ' data-qusText="' + obj.questionText + '" data-selectType=' + qusSelectType + ' data-sid=' + sid + ' data-qusAsk=' + qusType + '>提交</div>';
        html += '</div>';
    }

    //出来了结果
    if (obj.nodeType == "Conclusion") {
        var ansArr = obj.conclusions;
        var str = "";
        for (var i = 0, len = ansArr.length; i < len; i++) {
            str += "情况" + (i / 1 + 1) + ":\n";
            str += "病情:" + ansArr[i].title + ":\n";
            str += "详述:" + ansArr[i].content + ":\n";
            str += "建议:" + ansArr[i].actionLabel + ":\n";
        }
        $('#user_diagnose').val(str)
    }
    //添加按钮
    $("#askBox").append(html);
}

//添加点击事件 (身体部位)
$("#askBox").on("click", ".btnAskSelect", function () {
    var qusType = $(this).attr('data-qusAsk') //问题是否结束
    var qusId = $(this).attr('data-qusId') //问题id
    var selectType = $(this).attr('data-selectType') //类型,单双选
    var sid = $(this).attr('data-sid') //sid
    var qusText = $(this).attr('data-qusText') //问题详情
    var select = {}; //选取的数据  
    //   判断单双选 (1 单选)
    if (!(selectType / 1)) { //多选
        var text = "";
        var val = "";
        $("input:checkbox[name='moreSelect']:checked").map(function (index, elem) {
            text += $(elem).next().text() + ','
            val += $(elem).val();
        })
        select = {
            val: val,
            text: text
        }
    } else { //  单选
        singleSelect = $("input[name='singleSelect']:checked"); //单选获取的值
        select = {
            val: singleSelect.val(),
            text: singleSelect.next().text()
        }
    }
    // 判断是否选择了
    if (select.text == "") {
        alert('请选择');
    } else {
        //向主诉框添加数据
        var userTold = $('#user_told');
        var str = userTold.val() + '\n' + qusText + '(' + select.text + '),';
        userTold.val(str);
        //   判断问题是否结束
        if (qusType / 1) {
            fetchquestion(sid, {
                questionId: qusId,
                answers: select.val
            })
        }
        $("#askBox").empty();
    }
});