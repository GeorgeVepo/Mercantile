/* const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('');
}); */
var Client = require("./RestClient/client");
var MercadoLivre = require("./Mercado Livre/Principal/principal");

/**
 ** Change to the examples directory so this program can run as a service.
 **/
process.chdir(__dirname);

var fs = require ("fs");
var service = require ("os-service");

function usage () {
	Client.ObterProdutos();
}

if (process.argv[2] == "--add" && process.argv.length >= 4) {
	var options = {
		programArgs: ["--run", "me"]
	};

	if (process.argv.length > 4)
		options.username = process.argv[4];

	if (process.argv.length > 5)
		options.password = process.argv[5];
		
	if (process.argv.length > 6)
		options.dependencies = process.argv.splice(6);

	service.add (process.argv[3], options, function(error) {
		if (error)
			console.log(error.toString());
	});
} else if (process.argv[2] == "--remove" && process.argv.length >= 4) {
	service.remove (process.argv[3], function(error) {
		if (error)
			console.log(error.toString());
	});
} else if (process.argv[2] == "--run") {
	service.run (logStream, function () {
		service.stop (0);
	});

	var logStream = fs.createWriteStream(process.argv[1] + ".log");

	// Here is our long running code, simply print a date/time string to
	// our log file
	setInterval (function () {
		usage();
	}, 60000);
} else {
	usage ();
}
