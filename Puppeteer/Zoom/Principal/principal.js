var puppeteer = require('puppeteer');
var Pesquisar = require("./../Pesquisa/pesquisa");
var Login = require("./../Login/login");
 
//module exports para oder usar em outras partes
module.exports = {
    PesquisarOfertasZoom  : async function() {
        Pesquisar.PesquisarOfertas();
    } 
 
    
}
