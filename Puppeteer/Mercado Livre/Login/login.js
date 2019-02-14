var puppeteer = require('puppeteer');
 
//module exports para oder usar em outras partes
module.exports = {
    RealizarLogin : async function() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({width: 1050, height: 1040});       
        
        //página de logon
        await page.goto('https://www.mercadolivre.com/jms/mlb/lgz/login?go=https%3A%2F%2Fwww.mercadolivre.com.br%2F&loginType=explicit#menu-user');

        page.waitFor(500);
        //login
        page.type(" #login_user_form > div.auth-form__row > div > div > label > div.andes-form-control__control > span", 'testepuppeteer@gmail.com');
       
        page.waitFor(500);
        //botão prosseguir
        page.click('<input type="submit" class="ui-button ui-button--primary auth-button auth-button--user" value="Continuar">');

        page.waitFor(500);
        //senha
        page.type('<input type="submit" class="ui-button ui-button--primary auth-button auth-button--user" value="Continuar">', text[options])

      
    }
}