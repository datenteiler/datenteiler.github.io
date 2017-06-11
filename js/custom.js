'use strict';
(function () {
function copyright() {
		var jetzt = new Date(),
			jahr = jetzt.getFullYear(),
            text = '&copy; PowerShell Usergroup Hannover ' + jahr;
		document.getElementById('copyright').innerHTML = text;
	}
 function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true); // Replace 'data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
	document.addEventListener("DOMContentLoaded", function () {
		copyright();
		loadJSON(function(response) {
			var data = JSON.parse(response);
			document.getElementById("meeting").innerHTML = 'Das <strong>nächste Treffen findet am ' + data.meeting.date + 
			' um ' + data.meeting.time + ' in den Räumen von ' + data.meeting.room + ',</strong> ' + data.meeting.street + 
			', ' + data.meeting.place + ' statt.';

			var mapsStreet = data.meeting.street.replace(" ","+");
			var mapsPlace  = data.meeting.place.replace(" ","+");
			var mapsUrl = 'http://maps.google.com/maps?f=q&source=s_q&hl=de&geocode=&q=' +
			          mapsStreet + ',+' + mapsPlace;
			document.getElementById("route").innerHTML = '<a class="btn btn-default" href=' + mapsUrl + ' role="button" target="_blank">Route planen &raquo;</a>';

			document.getElementById("topics").innerHTML = '<strong>Vortrag 1:</strong> ' + data.topics.first + '<br />' +
			'<strong>Vortrag 2:</strong> ' + data.topics.second + '<br />' +
			'<strong>Außerdem:</strong> ' + data.topics.third;
		});
	});
}());