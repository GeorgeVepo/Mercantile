var puppeteer = require('puppeteer');
var util = require('./../../Util/util.js');
 
String.prototype.format = util.format;
//module exports para oder usar em outras partes
module.exports = {
    PesquisarOfertas : async function(produto, urlSite) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({width: 1050, height: 1040});
        var Filtros = produto.ListaFiltros;
        var nomeProduto = Filtros.filter(filtro => filtro.nm_filtro == "nomeProduto")[0];
        var ordem = Filtros.filter(filtro => filtro.nm_filtro == "ordem")[0];
        var categoria = Filtros.filter(filtro => filtro.nm_filtro == "categoria")[0];
        
        var urlPesquisa = urlSite.format(
            categoria.ds_valor,
            nomeProduto.ds_valor, 
            ordem.ds_valor
            );

        await page.goto(urlPesquisa, {timeout: 100000});          
        await page.waitForSelector('#product-list-container > ul > li');
        
        var listaElementos = await page.$$('.main-price-format > .price > a');  
        var url = "";
        var listaOfertas = [];    
        var price = null;
        var oferta = {};

        for(var i = 0; i < listaElementos.length; i++){  
            oferta = {};   
            url = ""; 
            price = await page.evaluate(el => el.textContent, listaElementos[i]);             
            url = await page.evaluate(element => element.href, listaElementos[i]);     
            oferta.nu_preco = parseFloat(price.replace("R$", "").replace(/\s/g, "").replace(".", "").replace(",", ".")).toFixed(2);
            oferta.ds_url = url;
            oferta.id_produto = produto.id_produto;
            listaOfertas[i] =  oferta;
        } 
           
        pages = await browser.pages();
        pages.forEach(p => p.close());
        return listaOfertas;                           
    }                             
}                                                                                                                                                                                                                                                                                                                                                               