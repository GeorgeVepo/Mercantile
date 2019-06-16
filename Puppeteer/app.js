var client = require("./RestClient/client");
var fs = require("fs");
var util = require('./Util/util.js');
var service = require("os-service");
var mercadoLivre = require('./Mercado Livre/Principal/principal.js');
var zoom = require('./Zoom/Principal/principal.js');
const killChrome = require('kill-chrome');

function usage(processo) {	
	killChrome().then(function () {
		var urlBase = client.ObterURLBase();
		client.ObterSites(urlBase, executarMonitoramento, processo);
	});	
}

function executarMonitoramento(sites, processo) {
	fs.appendFile('C://MercantileAPI//Log.txt', "\r\n" + util.getDate() + "\r\nMonitoramento executado\r\n", function (err) {});
	sites.forEach(site => {

		if (site.nm_site == "Mercado Livre" 
		&& (processo == "ml" || processo == "")) {
			mercadoLivre.ExecutarMonitoramento(site);
		}
		if (site.nm_site == "ZOOM"
		&& (processo == "zoom" || processo == "")) {
			zoom.ExecutarMonitoramento(site, false);
		}

		if (site.nm_site == "ZOOM"
		&& (processo == "zoom_frete" || processo == "")) {
			zoom.ExecutarMonitoramento(site, true);
		}
	});
	
	var urlBase = client.ObterURLBase();
	client.AnalisarOfertas(urlBase);
}

if (process.argv[2] == "--add_ml" && process.argv.length >= 4) {
	var options = {
		programArgs: ["--run_ml", "me"]
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
} else if (process.argv[2] == "--add_zoom" && process.argv.length >= 4) {
	var options = {
		programArgs: ["--run_zoom", "me"]
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
} else if (process.argv[2] == "--add_zoom_frete" && process.argv.length >= 4) {
	var options = {
		programArgs: ["--run_zoom_frete", "me"]
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
} else if (process.argv[2] == "--run_ml") {
	service.run(logStream, function () {
		service.stop(0);
	});
	var logStream = fs.createWriteStream(process.argv[1] + ".log");
	fs.appendFile('C://MercantileAPI//Log.txt', "\r\n" + util.getDate() + "\r\nSistema em execução\r\n", function (err) {});
	// Here is our long running code, simply print a date/time string to
	// our log file
	setInterval(function () {
		usage("ml");
	}, 10800000);
	
} else if (process.argv[2] == "--run_zoom") {
	service.run(logStream, function () {
		service.stop(0);
	});
	var logStream = fs.createWriteStream(process.argv[1] + ".log");
	fs.appendFile('C://MercantileAPI//Log.txt', "\r\n" + util.getDate() + "\r\nSistema em execução\r\n", function (err) {});
	// Here is our long running code, simply print a date/time string to
	// our log file
	setInterval(function () {
		usage("zoom");
	}, 10800000);
	
} else if (process.argv[2] == "--run_zoom_frete") {
	service.run(logStream, function () {
		service.stop(0);
	});
	var logStream = fs.createWriteStream(process.argv[1] + ".log");
	fs.appendFile('C://MercantileAPI//Log.txt', "\r\n" + util.getDate() + "\r\nSistema em execução\r\n", function (err) {});
	// Here is our long running code, simply print a date/time string to
	// our log file
	setInterval(function () {
		usage("zoom_frete");
	}, 10800000);
	
} else {
	usage("");
}
