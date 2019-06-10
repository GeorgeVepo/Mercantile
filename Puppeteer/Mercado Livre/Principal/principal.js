var puppeteer = require('puppeteer');
var Pesquisar = require("./../Pesquisa/pesquisa");
var client = require("./../../RestClient/client.js");
var urlBase = null;
var urlSite = null;

//module exports para oder usar em outras partes
module.exports = {
    ExecutarMonitoramento: async function (site) {
        urlSite = site.ds_url;
        urlBase = client.ObterURLBase();
        client.ObterProdutos(site.id_site, urlBase, null, PesquisarOfertas);
    }
}

async function PesquisarOfertas(produtos, frete) {
    var browser = await puppeteer.launch({
        headless: false//,
        //args: [ '--proxy-server=127.0.0.1:24000' ]
        
    });

    for (var i = 0; i < produtos.length; i++) {
        ofertas = await Pesquisar.PesquisarOfertas(produtos[i], urlSite, browser);
        if(ofertas == "pesquisa indisponivel"){
            break;
        }

        if (ofertas != null && ofertas.length > 0) {
            await client.EnviarOfertas(urlBase, ofertas);
        }
    }

    browser.close();
}
