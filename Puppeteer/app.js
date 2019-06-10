var client = require("./RestClient/client");
var fs = require("fs");
var service = require("os-service");
var mercadoLivre = require('./Mercado Livre/Principal/principal.js');
var zoom = require('./Zoom/Principal/principal.js');
const killChrome = require('kill-chrome');

function usage() {
	killChrome().then(function () {
		var urlBase = client.ObterURLBase();
		client.ObterSites(urlBase, executarMonitoramento);
	});
}

function executarMonitoramento(sites) {
	sites.forEach(site => {
		if (site.nm_site == "Mercado Livre") {
			mercadoLivre.ExecutarMonitoramento(site);
		}
		if (site.nm_site == "ZOOM") {
			zoom.ExecutarMonitoramento(site, false);
		}

		if (site.nm_site == "ZOOM") {
			zoom.ExecutarMonitoramento(site, true);
		}
	});
	
	var urlBase = client.ObterURLBase();
	client.AnalisarOfertas(urlBase);
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

	service.add(process.argv[3], options, function (error) {
		if (error)
			console.log(error.toString());
	});
} else if (process.argv[2] == "--remove" && process.argv.length >= 4) {
	service.remove(process.argv[3], function (error) {
		if (error)
			console.log(error.toString());
	});
} else if (process.argv[2] == "--run") {
	service.run(logStream, function () {
		service.stop(0);
	});

	var logStream = fs.createWriteStream(process.argv[1] + ".log");
	var intervalo = Math.floor(Math.random() * 8000000) + 5000000;
	// Here is our long running code, simply print a date/time string to
	// our log file
	setInterval(function () {
		usage();
	}, intervalo);
} else {
	usage();
}
