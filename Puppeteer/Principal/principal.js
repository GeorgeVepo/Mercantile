var puppeteer = require('puppeteer');
 
module.exports = {
    printScreen : async function() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.mercadolivre.com.br/');
        await page.screenshot({path: 'example.png'});
       
        await browser.close();
      }
}