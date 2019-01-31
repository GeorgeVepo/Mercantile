var puppeteer = require('puppeteer');
 
//module exports para oder usar em outras partes
module.exports = {
    ObterOfertas : async function() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({width: 1050, height: 1040});
       
        //página de logon
        await page.goto('https://www.mercadolivre.com/jms/mlb/lgz/login?go=https%3A%2F%2Fwww.mercadolivre.com.br%2F&loginType=explicit#menu-user');

        //login
        page.type(" #login_user_form > div.auth-form__row > div > div > label > div.andes-form-control__control > span", 'testepuppeteer@gmail.com');
       
        //botão prosseguir
        page.click('<input type="submit" class="ui-button ui-button--primary auth-button auth-button--user" value="Continuar">');

        page.waitFor(500);
        //senha
        //page.type('<input type="submit" class="ui-button ui-button--primary auth-button auth-button--user" value="Continuar">', text[, options])


        await page.goto('https://lista.mercadolivre.com.br/s9-galaxy-plus-128gb_OrderId_PRICE_ItemTypeID_N_PriceRange_2500-0_BestSellers_YES');          
        await page.waitForSelector('.item__price')
        debugger;
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