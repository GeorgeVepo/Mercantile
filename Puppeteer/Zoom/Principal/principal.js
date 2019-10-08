var __dirname = "";
var puppeteer = require('puppeteer');
var Pesquisar = require("./../Pesquisa/pesquisa");
var client = require("./../../RestClient/client.js");
var util = require('./../../Util/util.js');
var urlBase = null;
var urlSite = null;

//module exports para oder usar em outras partes
module.exports = {
    ExecutarMonitoramento: async function (site, dirname) {
        __dirname = dirname;
        urlSite = site.ds_url;
        urlBase = client.ObterURLBase();
        client.ObterProdutos(site.id_site, urlBase, PesquisarOfertas);
    }
}

async function PesquisarOfertas(produtos) {
    await util.disconnectToVPN();
    var browser = await puppeteer.launch({
        headless: true
    });  


    for (var i = 10; i < produtos.length; i++) {
        ofertas = await Pesquisar.PesquisarOfertas(produtos[i], urlSite, browser);
        if(ofertas == "pesquisa indisponivel"){
            continue;
        }

        await util.disconnectToVPN();
        if (ofertas != null && ofertas.length > 0) {
            await client.EnviarOfertas(urlBase, ofertas);
        }
    }
    
    browser.close();
}