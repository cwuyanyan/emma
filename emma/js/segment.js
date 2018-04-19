//  切换
function xinXi(e) {
	$("#xinxi").css("display", "none")
	$("#bingli").css("display", "block")
	// $("#bingli").addClass('bounceInRight')
}
$(function () {
	time = new Date();
	$("#in_time").text(time.toLocaleDateString());
	$("#log_time").text(time.toLocaleDateString());
	type = +$("#type").val();
});

// function inPost() {
// 	axios({
// 		method: "post",
// 		url: "http:192.168.0.125:8080/inquiry/getallsymptom"
// 	}).then(function (res) {
// 		var bodyArr = res.data.list;
// 		console.log(bodyArr)
// 		$('.arr').text = bodyArr
// 	}.bind(this))
// }



//  function sendPost() {

//  	// console.log(type)
//  	switch (+type) {
//  		case 0:
//  			sendPostFirst();
//  			break;
//  		case 1:
//  			sendPostSecond();
//  			break;
//  		case 2:
//  			sendGoon();
//  			break;
//  		default:
//  			alert("no type ");
//  			break;
//  	}
//  }


//  function sendPostFirst() {
//  	// 这里ajax
//  	symptom = $("#user_input").val();
//  	if (symptom == undefined || symptom == "" || symptom == null) {
//  		alert("记录栏输入为空");
//  	}
//  	// console.log(symptom)
//  	$.post("http://118.31.45.32:9091/segmentNew", {
//  		symptom: symptom
//  	}, function (result) {
//  		var code = result.code;
//  		// console.log(result)
//  		switch (code) {
//  			case 205:
//  				// 返回成功
//  				sid = result.msg;
//  				addLog(symptom, false);
//  				addLog(result.list.bodyFeelQuestion.question, true);
//  				// showResult(result.list.symptomSet);
//  				type = 1;
//  				break;
//  			case 200:
//  				addLog(symptom, false);
//  				addLog(result.msg, true);
//  				showResult(result.list);
//  				showSuggest(result.list);
//  				break;
//  			default:
//  				addLog(symptom, false);
//  				addLog(result.msg, true);
//  				break;
//  		}
//  	});
//  }

//  function sendPostSecond() {
//  	symptom = $("#user_input").val();
//  	if (symptom == "没有") {
//  		ask = 0;
//  	} else {
//  		ask = 1;
//  	}
//  	// console.log(symptom)
//  	$.post("http://118.31.45.32:9091/segmentNew", {
//  		symptom: symptom,
//  		sid: sid,
//  		ask: ask
//  	}, function (result) {
//  		// console.log(result);
//  		var code = result.code;
//  		switch (code) {
//  			case 205:
//  				addLog(symptom, false);
//  				addLog(result.list.bodyFeelQuestion.question, true);
//  				// showResult(result.list.symptomSet);
//  				break;
//  			case 300:
//  				addLog(symptom, false);
//  				addLog(result.msg, true);
//  				type = 2;
//  				break;
//  			case 200:
//  				addLog(symptom, false);
//  				addLog(result.msg, true);
//  				showResult(result.list);
//  				showSuggest(result.list, true);
//  				break;
//  			case 400:
//  				addLog(symptom, false);
//  				addLog("未能完全诊断", true);
//  				showSuggest("建议挂号科室：" + result.list.name, false);
//  				break;
//  			default:
//  				addLog(symptom, false);
//  				addLog(result.msg, true);
//  				type = 3;
//  				break;
//  		}
//  	});
//  }

//  function sendGoon() {
//  	symptom = $("#user_input").val();
//  	// console.log(symptom)
//  	if (symptom == "没有") {
//  		goon = 0;
//  	} else {
//  		goon = 1;
//  	}
//  	// console.log("goon : " + goon);
//  	$.post("http://118.31.45.32:9091/segmentNew", {
//  		symptom: symptom,
//  		sid: sid,
//  		goon: goon,
//  		ask: 0
//  	}, function (result) {
//  		// console.log(result);
//  		var code = result.code;
//  		switch (code) {
//  			case 205:
//  				addLog(symptom, false);
//  				addLog(result.list.bodyFeelQuestion.question, true);
//  				// showResult(result.list.symptomSet);
//  				type = 1;
//  				break;
//  			case 200:
//  				addLog(symptom, false);
//  				addLog(result.msg, true);
//  				showResult(result.list);
//  				showSuggest(result.list, true);
//  				break;
//  			case 400:
//  				addLog(symptom, false);
//  				addLog(result.msg, true);
//  				showSuggest("建议挂号科室：" + result.list.name, false);
//  				break;
//  			default:
//  				addLog(symptom, false);
//  				addLog(result.msg, true);
//  				type = 3;
//  				break;
//  		}
//  	});
//  }

//  function addLog(log, type) {
//  	time = new Date();
//  	if (type) {
//  		$("#user_input").before($("<div />", {
//  			text: time.toLocaleTimeString() + "-emma：" + log
//  		}));
//  	} else {
//  		$("#user_input").before($("<div />", {
//  			text: time.toLocaleTimeString() + "-患者：" + log,
//  			style: "color:red"
//  		}));
//  	}

//  }

//  function showResult(list) {
//  	if (list == null || list == undefined) {
//  		return;
//  	}
//  	var result = list;
//  	$("#check").html("");
//  	for (var i = 0; i < result.length; i++) {
//  		$("#check").append($("<span />", {
//  			text: result[i].name + "、"
//  		}))
//  	};
//  }

//  function showSuggest(result, flag) {
//  	if (flag) {
//  		if (result == null || result == undefined) {
//  			return;
//  		}
//  		for (var i = 0; i < result.length; i++) {
//  			$("#suggest").append($("<div />", {
//  				text: (i + 1) + "、" + result[i].name + " : " + result[i].suggest
//  			}))
//  		};
//  	} else {
//  		$("#suggest").append($("<div />", {
//  			text: result
//  		}))
//  	}

//  }

//  function resetDate() {
//  	type = 0;
//  	symptom = null;
//  	goon = null;
//  	$("#log").empty();
//  	$("#log").append($("<textarea rows='3' cols='20' style='resize:none;' class='form-control' />", {
//  		id: "user_input"
//  	}));
//  	$("#check").empty();
//  	$("#suggest").empty();
//  }


// 生成截图
//  $("#creat").click(function () {
// 	html2canvas($("body"), { // $(".myImg")生成canvas的区域
// 		onrendered: function (canvas) {
// 			dataURL = canvas.toDataURL("image/png");
// 			// $("body").append(canvas);
// 			// console.log(dataURL);

// 			//下载图片
// 			$('#down_button').attr('href', dataURL);
// 			$('#down_button').attr('download', 'myrecode.png');
// 		},
// 		width: 320,
// 		height: 600,
// 	})
// })