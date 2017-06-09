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
			' um ' + data.meeting.time + ' in den Räumen von ' + data.meeting.room + '</strong> in ' + data.meeting.place + ' statt.';
			document.getElementById("topics").innerHTML = data.topics.first;
		});
	});
}());