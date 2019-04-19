var util = require('./../../Util/util.js');
var puppeteer = require('puppeteer');

String.prototype.format = util.format;
//module exports para oder usar em outras partes
module.exports = {
    PesquisarOfertas: async function (produto, urlSite) {    
        var listaOfertas = [];    
        const browser = await puppeteer.launch({
            headless: true
        });
        
        try {
            await util.sleep(Math.floor(Math.random() * 300000));
            listaOfertas = await this.ExecutarPesquisa(produto, urlSite, browser);
        } catch(e){
            var pages = await browser.pages();
            pages.forEach(p => p.close());
            listaOfertas = [];  
        }
        return listaOfertas;
    },    
    ExecutarPesquisa: async function (produto, urlSite, browser) {        
        const page = await browser.newPage();
        await page.setViewport({
            width: 1050,
            height: 1040
        });
        var Filtros = produto.ListaFiltros;
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

        await util.sleep(Math.floor(Math.random() * 60000));
        await page.goto(urlPesquisa, {
            timeout: 100000
        });

        await page.waitForSelector('.item__price')
        var listTitle = await page.$$('.main-title');
        var listPrices = await page.$$('.item__price');
        var listUrl = await page.$$('.item__title > a');
        var listFretes = await page.$$('.item__stack_column__info');

        var fraction = "";
        var title = "";
        var decimal = "";
        var url = "";
        var listaOfertas = [];
        var oferta = {};
        var frete = 0;

        var element = null;

        for (var i = 0; i < listPrices.length; i++) {

            oferta = {};
            fraction = "";
            decimal = "";
            title = "";
            url = "";
            frete = 0;
            element = null;
            fraction = await listPrices[i].$eval('.price__fraction', el => el.textContent);
            element = await listPrices[i].$('.price__decimals');
            if (element != null) {
                decimal = await listPrices[i].$eval('.price__decimals', el => el.textContent);
            } else {
                decimal = "0";
            }
            title = await page.evaluate(element => element.textContent, listTitle[i]);

            var tituloInvalido = false;
            tituloNaoPermitido.forEach(filtro => {
                tituloInvalido = title.toUpperCase().includes(filtro.ds_valor.toUpperCase());
            });

            if (tituloInvalido) {
                continue;
            }

            tituloObrigatorio.forEach(filtro => {
                tituloInvalido = title.toUpperCase().includes(filtro.ds_valor.toUpperCase());
            });

            if (!tituloInvalido) {
                continue;
            }

            url = await page.evaluate(element => element.href, listUrl[i]);
            oferta.nu_preco = parseFloat(fraction.replace(".", "") + "." + decimal).toFixed(2);
            oferta.ds_url = url;
            oferta.id_produto = produto.id_produto;

            element = await listFretes[i].$('.shipping');
            if (element == null) {
                const pageOferta = await browser.newPage();
                await util.sleep(Math.floor(Math.random() * 60000));
                await pageOferta.goto("https://www.mercadolivre.com.br/navigation/addresses-hub?mode=embed&flow=true&go=" + url, {
                    timeout: 100000
                });
                await pageOferta.waitForSelector('.andes-form-control__field')
                await pageOferta.focus('.andes-form-control__field');
                await pageOferta.evaluate(() => document.querySelector('.andes-form-control__field').value = '88110630');
                element = await pageOferta.$('button');
                await util.sleep(Math.floor(Math.random() * 60000));
                await element.click();
                await pageOferta.waitForSelector('.short-description__form')
                element = await pageOferta.$('.payment-info');
                frete = await element.$eval('.ch-price', el => el.textContent);
                frete = frete.replace("R$", "").replace(/\s/g, "");
                var textoAuxiliar1 = frete.substring(frete.length - 2);
                var textoAuxiliar2 = await element.$eval('sup', el => el.textContent);
                frete = frete.substring(0, frete.length - 2);
                frete = frete + textoAuxiliar1.replace(textoAuxiliar2, "." + textoAuxiliar2);
                oferta.nu_preco = (parseFloat(oferta.nu_preco) + parseFloat(frete)).toFixed(2);
            }
            listaOfertas[i] = oferta;
        }

        var pages = await browser.pages();
        pages.forEach(p => p.close());
        return listaOfertas;
    }
}