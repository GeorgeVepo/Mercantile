var puppeteer = require('puppeteer');
 
module.exports = {
    printScreen : async function() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({width: 1050, height: 1040});
        await page.goto('https://lista.mercadolivre.com.br/s9-galaxy-plus-128gb_OrderId_PRICE_ItemTypeID_N_PriceRange_2500-0_BestSellers_YES');          
        await page.waitForSelector('.item__price')
        var listItem = await page.$$('.item__price');
        var fraction = "";
        var decimal = "";
        var listPrices = [];    
        var element = null;

        for(var i = 0; i < listItem.length; i++){            
            fraction = await listItem[i].$eval('.price__fraction', el => el.textContent);
            element = await listItem[i].$('.price__decimals');
            if(element != null){
                decimal = await listItem[i].$eval('.price__decimals', el => el.textContent);            
            } else{
                decimal = "0";
            }
            listPrices[i] = fraction + "," + decimal;
        }        
        
    }
}