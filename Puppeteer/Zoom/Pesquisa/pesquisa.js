var puppeteer = require('puppeteer');
 
//module exports para oder usar em outras partes
module.exports = {
    PesquisarOfertasZoom : async function() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({width: 1050, height: 1040});
       
        await page.goto('https://www.zoom.com.br/celular/smartphone-samsung-galaxy-s9-plus-sm-g9650-128gb?resultorder=2#price');          
        await page.waitForSelector('#product-list-container > ul > li');
        var listPrices = await page.$$('#product-list-container > ul > li');                                                                                                       
        var listUrl = await page.$$('#product-list-container > ul > li');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        var url = "";
        var listOffers = [];    
        var element = null;

        for(var i = 0; i < listPrices.length; i++){     
            url = ""; 
            element = null;      
            element = await listPrices[i].$('#product-list-container > ul > li');
            if(element != null){                                                                                                 
                decimal = await listPrices[i].$eval('#product-list-container > ul > li', el => el.textContent);            
            } else{
                decimal = "0";
            }     
            url = await page.evaluate(element => element.href, listUrl[i]);                   
            listOffers[i] =  decimal + "###" + url;
        } 
                                     
    }                             
}                                                                                                                                                                                                                                                                                                                                                               