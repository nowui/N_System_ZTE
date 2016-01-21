$(function() {
	isShowLeft = true;
	isShowRight = true;

	$.getJSON("data/app.json",function(json) {
		$("#temperature").html(json.weather.temperature);
		$("#wind").html(json.weather.wind);
		$("#location").html(json.weather.location);
	});

	var checkDatetime = function() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		var week = date.getDay();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();

		month++;
		if(month < 10) {
			month = "0" + month;
		}

		if(day < 10) {
			day = "0" + day;
		}

		if(hour < 10) {
			hour = "0" + hour;
		}

		if(minute < 10) {
			minute = "0" + minute;
		}

		var dayString = year + "." + month + "." + day;
		var weekString = "";
		var timeString = hour + ":" + minute;

		switch(week) {
			case 1:
				weekString = "MONDAY";
				break;
			case 2:
				weekString = "TUESDAY";
				break;
			case 3:
				weekString = "WEDNESDAY";
				break;
			case 4:
				weekString = "THURSDAY";
				break;
			case 5:
				weekString = "FRIDAY";
				break;
			case 6:
				weekString = "SATURDAY";
				break;
			case 0:
				weekString = "SUNDAY";
				break;
		}

		$("#day").html(dayString);
		$("#week").html(weekString);
		$("#time").html(timeString);

		setTimeout(function() {
            checkDatetime();
        }, 1000);
	}

	checkDatetime();

	clickLeftNavigation = function() {
		isShowLeft = !isShowLeft;

		$("#left_navigation")[0].contentWindow.showAcitve(! isShowLeft);

		$("#left_navigation").animate({
			left: isShowLeft ? "0px" : "489px"
		}, "normal", "expoout", function() {

		});

		$("#left_menu").animate({
			left: isShowLeft ? "-489px" : "0px"
		}, "normal", "expoout", function() {

		});
	}

	clickRightNavigation = function() {
		isShowRight = !isShowRight;

		$("#right_navigation")[0].contentWindow.showAcitve(! isShowRight);

		$("#right_navigation").animate({
			right: isShowRight ? "0px" : "409px"
		}, "normal", "expoout", function() {

		});

		$("#right_menu").animate({
			right: isShowRight ? "-409px" : "0px"
		}, "normal", "expoout", function() {

		});
	}
});