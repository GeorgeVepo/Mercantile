var puppeteer = require('puppeteer');
var Pesquisar = require("./../Pesquisa/pesquisa");
var Login = require("./../Login/login");
 
//module exports para oder usar em outras partes
module.exports = {
    PesquisarOfertas  : async function() {
        Pesquisar.PesquisarOfertas();
    } 
    , Login  : async function() {
        Login.RealizarLogin();
    }  
}
