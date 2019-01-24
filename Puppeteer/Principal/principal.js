var puppeteer = require('puppeteer');
 
module.exports = {
    printScreen : async function() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({width: 1050, height: 1040});
        await page.goto('https://lista.mercadolivre.com.br/s9-galaxy-plus-128gb_ItemTypeID_N_PriceRange_2500-0_BestSellers_YES');
   /*      var searchInput = await page.$('.nav-search-input');
        await searchInput.type('s9 galaxy plus 128gb');
        // Sarch by name
        var searchBtn = await page.$('.nav-search-btn');
        await searchBtn.click();
        await page.waitForSelector('.ui-list__content'); 
        
        // Adicionando ordenação por menor preço
        var listaOrdenacao = await page.$$('.ui-list__item');
        await listaOrdenacao[1].$eval('.ui-list__item-option', el => el.click());
        await page.waitForSelector('.qcat-truncate'); 

        // FIltro de novo
        var filtros = await page.$$('.qcat-truncate');
        await filtros[0].click();
        await page.waitForNavigation(); 
        await page.waitFor(1000)
        await page.focus('#fromPrice');
        await page.k
        await page.$eval('#fromPrice', el => el.value = 2500);
        await page.$eval('#toPrice', el => el.value = 3000);
        await page.$eval('.price-filter__action-link filter-action-btn filter-action-btn__disabled', el => el.click());
        await page.waitForNavigation(); 
        await filtros[element.lastIndexOf(filtros)].click();
 */    }
}