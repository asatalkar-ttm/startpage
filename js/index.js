// function getZipCode() {
// 	var txt;
// 	var zipcode = prompt("Please enter your ZipCode:", "");
// 	document.cookie = "Zipcode="+zipcode;
// 	txt = document.cookie;
// 	console.log('Cookie : ' + getCookie());
// 	// if (zipcode == null || zipcode == "") {
// 	// 	txt = "User cancelled the prompt.";
// 	// } else {
// 	// 	txt = "You entered " + zipcode + ".";
// 	// }
// 	get5DaysWeatherForecast(zipcode);
// }

function setCookie(zipcode, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = zipcode + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(zipcode) {
	var zip = zipcode + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(zip) == 0) {
			return c.substring(zip.length, c.length);
		}
	}
	return "";
}

function checkCookie() {
	var zipcode = getCookie("zipcode");
	if (zipcode != "") {
		alert("Zipcode : " + zipcode);
		get5DaysWeatherForecast(zipcode);
	} else {
		zipcode = prompt("Please enter your Zipcode:", "");
		if (zipcode != "" && zipcode != null) {
			setCookie("zipcode", zipcode, 30);
		}
	}
	get5DaysWeatherForecast(zipcode);
}

function get5DaysWeatherForecast(zipcode) {
	var url = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + zipcode + '?apikey=' + <API_KEY>;
	var req = new Request(url);
	fetch(req)
		.then(function(response) {
			return response.json();
		})
		.then(function(response) {
			console.log(response);
			for (var i = 0; i < 5; i++) {
				var Maximum = response.DailyForecasts[i].Temperature.Maximum.Value;
				var Minimum = response.DailyForecasts[i].Temperature.Minimum.Value;
				var weatherDate = response.DailyForecasts[i].Date;

				var node = document.createElement("div");
				node.setAttribute("class", "col");

				var outerSpan = document.createElement("span");
				outerSpan.setAttribute("class", "day");
				var date = new Date(weatherDate);

				var getNewDate = new Date();
				var dayOfTheWeek = getDayOfTheWeek(date);
				var res = "";
				
				if (date.getDate() === getNewDate.getDate()) {
					res = "Today";
				} else {
					res = dayOfTheWeek.substring(0, 3);
				}
				outerSpan.innerHTML = res;
				node.appendChild(outerSpan);

				var innerDiv1 = document.createElement("div");
				innerDiv1.setAttribute("class", "weather-icon-forecast");
				innerDiv1.setAttribute("width", "52");
				innerDiv1.setAttribute("height", "52");
				node.appendChild(innerDiv1);


				var innerDiv2 = document.createElement("div");
				innerDiv2.setAttribute("class", "high-low");

				var spanMax = document.createElement("span");
				spanMax.setAttribute("class", "high")
				spanMax.innerHTML = Maximum + "&deg;F";
				innerDiv2.appendChild(spanMax);

				var breakLine = document.createElement("br");
				innerDiv2.appendChild(breakLine);

				var spanMin = document.createElement("span");
				spanMin.setAttribute("class", "low")
				spanMin.innerHTML = Minimum + "&deg;F";
				innerDiv2.appendChild(spanMin);

				node.appendChild(innerDiv2);
				console.log(node);

				document.getElementById("weatherForecastFor5Days").appendChild(node);
			}
		})
}

function getNews() {
	var url = 'https://newsapi.org/v2/top-headlines?' +
		'country=us&' +
		'apiKey=' + <API_KEY>;
	var req = new Request(url);
	fetch(req)
	.then(function(response) {
		return response.json();
	})
	.then(function(response) {
		console.log(JSON.stringify(response));
		for (var i = 0; i < 4; i++) {

			var node = document.createElement("li");
			node.setAttribute("class", "card px-4 py-3 mb-2");

			var a = document.createElement("a");
			a.setAttribute("href", response.articles[i].url);
			var heading = document.createElement("h5");
			var s = response.articles[i].title
			s = s.substring(0, s.indexOf('-'));
			var textForHeading = document.createTextNode(s);
			heading.appendChild(textForHeading)
			a.appendChild(heading)
			node.appendChild(a);


			var div = document.createElement("div");
			div.setAttribute("class", "meta");
			var span = document.createElement("span");
			span.setAttribute("class", "site");
			span.innerHTML = response.articles[i].source.name;
			var time = document.createElement("time");
			var t = new Date(response.articles[i].publishedAt);
			var hours = t.getHours();
			var minutes = t.getMinutes();
			var date = t.getDate();
			var day = getDayOfTheWeek(t);
			var month = getMonthOfTheYear(t);
			time.innerHTML = day + " " + month + " " + date + " Published at " + hours + ":" + minutes;

			div.appendChild(span);
			div.appendChild(time);

			node.appendChild(div);

			document.getElementById("newsList").appendChild(node);
		}
	})
}

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var amPM = (h > 11) ? "pm" : "am";

	h = today.getHours() % 12 || 12
	m = checkTime(m);

	document.getElementById('txt').innerHTML = h + ":" + m;
	var t = setTimeout(startTime, 500);
}

function checkTime(i) {
	if (i < 10) {
		i = "0" + i
	}; // add zero in front of numbers < 10
	return i;
}

function getDayOfTheWeek(today) {
	var weekday = new Array(7);
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	var day = weekday[today.getDay()];
	return day;
}

function getMonthOfTheYear(today) {
	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	var mon = month[today.getMonth()];
	return mon;
}

function checkDate() {
	var today = new Date();
	var h = today.getHours();

	var day = getDayOfTheWeek(today);

	var mon = getMonthOfTheYear(today);

	var timeOfDayArray = [
		[0, 4, "Good night."],
		[5, 11, "Good morning."],
		[12, 17, "Good afternoon."],
		[18, 22, "Good evening."],
		[23, 24, "Good night."]
	];

	for (var i = 0; i < timeOfDayArray.length; i++) {
		if (h >= timeOfDayArray[i][0] && h <= timeOfDayArray[i][1]) {
			document.getElementById('salutation').innerHTML = timeOfDayArray[i][2];
		}
	}

	document.getElementById('today').innerHTML = day + ', ' + mon + ' ' + today.getDate();
}

window.onload = function() {
	// getZipCode();
	checkCookie();
	checkDate();
	startTime();
	getNews();
}