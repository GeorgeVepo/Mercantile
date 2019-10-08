var client = require("./RestClient/client");
const path = require('path');
var __dirname = "C://servico";
var fs = require("fs");
var util = require('./Util/util.js');
//var service = require("os-service");
var mercadoLivre = require('./Mercado Livre/Principal/principal.js');
var zoom = require('./Zoom/Principal/principal.js');
const killChrome = require('kill-chrome');

function usage(processo) {	
	util.disconnectToVPN().then(function () {
		killChrome().then(function () {
			var urlBase = client.ObterURLBase();
			client.ObterSites(urlBase, executarMonitoramento, processo);
		});	
	})
	
}

function executarMonitoramento(sites, processo) {
	fs.appendFile(__dirname + '//Log.txt', "\r\n" + util.getDate() + "\r\nMonitoramento executado\r\n", function (err) {});
	sites.forEach(site => {

		if (site.nm_site == "Mercado Livre" 
		&& (processo == "ml" || processo == "")) {
			mercadoLivre.ExecutarMonitoramento(site, __dirname);
		}
		if (site.nm_site == "ZOOM"
		&& (processo == "zoom" || processo == "")) {
			zoom.ExecutarMonitoramento(site, __dirname);
		}
		
	});
	
	var urlBase = client.ObterURLBase();
	client.AnalisarOfertas(urlBase);
}

const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  setInterval(function () {
	usage("zoom");
}, 7200000); 
});
