var util = require('./../Util/util.js');
var puppeteer = require('puppeteer');
 
String.prototype.format = util.format;
//module exports para oder usar em outras partes
module.exports = {
    PesquisarOfertas : async function(produto, urlSite) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({width: 1050, height: 1040});
        var Filtros = produto.Filtros;
        var nomeProduto = Filtros.filter(filtro => filtro.nm_filtro == "nomeProduto")[0];
        var ordenacao = Filtros.filter(filtro => filtro.nm_filtro == "ordenacao")[0];
        var itemTypeID = Filtros.filter(filtro => filtro.nm_filtro == "ItemTypeID")[0];
        var priceRange = Filtros.filter(filtro => filtro.nm_filtro == "priceRange")[0];
        var melhoresVendedores = Filtros.filter(filtro => filtro.nm_filtro == "melhoresVendedores")[0];
        var tituloNaoPermitido = Filtros.filter(filtro => filtro.nm_filtro == "tituloNaoPermitido");
        var tituloObrigatorio = Filtros.filter(filtro => filtro.nm_filtro == "tituloObrigatorio");
               
        var urlPesquisa = urlSite.format(
            nomeProduto.ds_valor,
            ordenacao.ds_valor, 
            itemTypeID.ds_valor, 
            priceRange.ds_valor, 
            melhoresVendedores.ds_valor);

        await page.goto(urlPesquisa);   

        await page.waitForSelector('.item__price')
        var listTitle = await page.$$('.main-title');  
        var listPrices = await page.$$('.item__price'); 
        var listUrl = await page.$$('.item__info-title');

        var fraction = "";
        var title = "";
        var decimal = "";
        var url = "";
        var listaOfertas = [];
        var oferta = {};

        var element = null;

        for(var i = 0; i < listPrices.length; i++){
            
            oferta = {};
            fraction = "";
            decimal = "";
            title = "";
            url = ""; 
            element = null;      
            fraction = await listPrices[i].$eval('.price__fraction', el => el.textContent);
            element = await listPrices[i].$('.price__decimals');
            if(element != null){
                decimal = await listPrices[i].$eval('.price__decimals', el => el.textContent);            
            } else{
                decimal = "0";
            }            
            title = await page.evaluate(element => element.textContent, listTitle[i]);  
            
            var tituloInvalido = false;
            tituloNaoPermitido.forEach(filtro => {
                tituloInvalido = title.includes(filtro.ds_valor);
            });
            
            if(tituloInvalido){
                continue;
            }
            
            tituloObrigatorio.forEach(filtro => {
                tituloInvalido = title.includes(filtro.ds_valor);
            });
            
            if(!tituloInvalido){
                continue;
            }
            
            url = await page.evaluate(element => element.href, listUrl[i]);    
            oferta.nu_preco = parseFloat(fraction + "," + decimal) * 1000;
            oferta.ds_url = url;
            oferta.id_produto = produto.id_produto;
            listaOfertas[i] = oferta;
        }

        page.close();
        return listaOfertas;         
    }
}