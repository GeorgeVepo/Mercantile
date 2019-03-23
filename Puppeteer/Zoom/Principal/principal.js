var puppeteer = require('puppeteer');
var Pesquisar = require("./../Pesquisa/pesquisa");
var client = require("./../../RestClient/client.js");
var urlBase = null;
var urlSite = null;

//module exports para oder usar em outras partes
module.exports = {
    ExecutarMonitoramento  : async function(site) {
        urlSite = site.ds_url;
        urlBase = client.ObterURLBase();
        client.ObterProdutos(site.id_site, urlBase, PesquisarOfertas);
    }
}

function PesquisarOfertas(produtos) {	
    var promises = [];
    produtos.forEach(produto => {
        promises.push(Pesquisar.PesquisarOfertas(produto, urlSite));
    });

    promises.forEach(promise => promise.then(function(ofertas) {
        client.EnviarOfertas(urlBase, ofertas);
    }));

}