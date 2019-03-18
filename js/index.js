function getNews() {
	var url = 'https://newsapi.org/v2/top-headlines?' +
		'country=us&' +
		'apiKey=d80b93ed851e468eaaa4974611ad2d94';
	var req = new Request(url);
	fetch(req)
	.then(function(response) {
		return response.json();
	})
	.then(function(response) {
		console.log(JSON.stringify(response));
		for (var i = 0; i < 4; i++) {
			console.log(response.articles[i].source.name)
			console.log(response.articles[i].title)
			console.log(response.articles[i].url)
			console.log(response.articles[i].publishedAt)

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
			time.innerHTML = day + " " + month + " " + date + " " + hours + " : " + minutes;

			div.appendChild(span);
			div.appendChild(time);

			node.appendChild(div);

			document.getElementById("myList").appendChild(node);
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
	checkDate();
	startTime();
	getNews();
}