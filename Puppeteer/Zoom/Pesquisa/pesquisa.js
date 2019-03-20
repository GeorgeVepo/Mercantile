var puppeteer = require('puppeteer');
 
//module exports para oder usar em outras partes
module.exports = {
    PesquisarOfertasZoom : async function() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({width: 1050, height: 1040});
       
        await page.goto('https://www.zoom.com.br/celular/smartphone-samsung-galaxy-s9-plus-sm-g9650-128gb?resultorder=2#price');          
        await page.waitForSelector('#product-list-container > ul > li');
        
        var listaElementos = await page.$$('.price > a');  
        var url = "";
        var listaOfertas = [];    
        var price = null;
        var oferta = {};

        for(var i = 0; i < listaElementos.length; i++){  
            oferta = {};   
            url = ""; 
            price = await page.evaluate(el => el.textContent, listaElementos[i]);             
            url = await page.evaluate(element => element.href, listaElementos[i]);    
            url = "www.zoom.com.br" + url;  
            oferta.nu_preco = parseFloat(price.replace("R$", "").replace(/\s/g, "").replace(".", "")) * 1000;
            oferta.ds_url = url;
            oferta.id_produto = 1;
            listaOfertas[i] =  oferta;
        } 
                                     
    }                             
}                                                                                                                                                                                                                                                                                                                                                               