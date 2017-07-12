//for read file
var fs = require("fs");
var data = fs.readFileSync('input_sample_events.json');

var json_data = JSON.parse(data.toString());
// console.log("%s",json_data.appbody);

//configuration
var http = require("http");
var options = {
  hostname: '127.0.0.1',
  port: 8080,
  path: '/v1/log',
  method: 'POST',
  headers: {
      'Authorization' : json_data.appheader
  }
};

function execution () {
	for (i=0;i<10000;i++) {
		var req = http.request(options, function(res) {
		  console.log('Status: ' + res.statusCode);
		  // console.log('Headers: ' + JSON.stringify(res.headers));
		  res.setEncoding('utf8');
		  res.on('data', function (body) {
		    console.log('Body: ' + body);
		  });
		});

		req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		});

		// write data to request body
		req.write(json_data.appbody);
		console.log("Send Data : %s",i);	
		// console.log("Send Data : %s",req.write(json_data.appbody));	
		req.end();
	}
}

// execution();
var myInt = setInterval(function () {
	execution();
    console.log("Delay...");
}, 5000);