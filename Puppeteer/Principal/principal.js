var puppeteer = require('puppeteer');
 
module.exports = {
    printScreen : async function() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({width: 1050, height: 1040});
        await page.goto('https://lista.mercadolivre.com.br/s9-galaxy-plus-128gb_OrderId_PRICE_ItemTypeID_N_PriceRange_2500-0_BestSellers_YES');          
        await page.waitForSelector('.item__price')
        var listPrices = await page.$$('.item__price');
        var listTitle = await page.$$('.main-title');    
        var listUrl = await page.$$('.item__info-title');
        var fraction = "";
        var decimal = "";
        var title = "";
        var url = "";
        var listOffers = [];    
        var element = null;


        for(var i = 0; i < listPrices.length; i++){     
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
            url = await page.evaluate(element => element.href, listUrl[i]);                   
            listOffers[i] = title + "###" + fraction + "," + decimal + "###" + url;
        } 
    }
}