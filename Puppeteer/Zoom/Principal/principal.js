var puppeteer = require('puppeteer');
var Pesquisar = require("./../Pesquisa/pesquisa");
 
//module exports para oder usar em outras partes
module.exports = {
    PesquisarOfertasZoom  : async function() {
        Pesquisar.PesquisarOfertasZoom()
    } 
 
    
}
