var util = require('./../../Util/util.js');
var fs = require('fs');
var tentativas = 0;


String.prototype.format = util.format;
//module exports para oder usar em outras partes
module.exports = {
    PesquisarOfertas: async function (produto, urlSite, browser) {
        var listaOfertas = [];
        var page = await browser.newPage();

        /*   await page.authenticate({ 
            username: 'lum-customer-hl_350322be-zone-datacenter-country-br' , 
            password:'67wktqwx5d8k' 
        });      
 */

        await page._client.send('Network.clearBrowserCookies');


        await page.setRequestInterception(true);

        await page.setCacheEnabled(false);

        page.on('request', (req) => {
            const url = req.url();
            if (req.resourceType() === 'image') {
                req.abort();
            } else {
                req.continue();
            }
            if (url.includes("ing-district.clicktale.net")) {
                req.abort();
            } else {
                req.continue();
            }

        });

        try {
            listaOfertas = await this.ExecutarPesquisa(produto, urlSite, browser, page);
        } catch (e) {
            today = util.getDate();
            fs.appendFile('C://MercantileAPI//Log.txt', "\r\n" + today + "\r\nMercado Livre \r\n" + produto.nm_produto + "\r\n" + e.message + "\r\n", function (err) {});

            if (tentativas <= 5) {
                tentativas += 1;
                listaOfertas = this.PesquisarOfertas(produto, urlSite, browser);

                page.close();
                return listaOfertas;
            }

            page.close();
            return "pesquisa indisponivel";
        }

        page.close();
        return listaOfertas;
    },
    ExecutarPesquisa: async function (produto, urlSite, browser, page) {
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

        await util.sleep(Math.floor(Math.random() * 3000) + 1000);
        await util.tryConnection(page, urlPesquisa, '.item__price');
        
        var listTitle = await page.$$('.main-title');
        var listPrices = await page.$$('.item__price');
        var listUrl = await page.$$('.item__title > a');
        var tipoGrids = 1;
        if (listUrl.length == 0) {
            listUrl = await page.$$('.item__info-link');
            tipoGrids = 2;
        }
        var listFretes = null;

        if (tipoGrids == 1) {
            listFretes = await page.$$('.item__stack_column__info');
        } else {
            listFretes = await page.$$('.item__info');
        }


        var fraction = "";
        var title = "";
        var decimal = "";
        var url = "";
        var listaOfertas = [];
        var oferta = {};
        var frete = 0;
        var tituloInvalido = false;
        var regex = null;

        var element = null;

        var pageOferta = await browser.newPage();
        /*  await pageOferta.authenticate({ 
            username: 'lum-customer-hl_350322be-zone-datacenter-country-br' , 
            password:'67wktqwx5d8k' 
        });    */

        /*   await pageOferta.setCacheEnabled(false);
    
        await pageOferta.setRequestInterception(true);
 */
        pageOferta.on('request', (req) => {
            const url = req.url();
            if (req.resourceType() === 'image') {
                req.abort();
            } else {
                req.continue();
            }
            if (url.includes("ing-district.clicktale.net")) {
                req.abort();
            } else {
                req.continue();
            }

        });

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

            tituloInvalido = false;
            tituloNaoPermitido.forEach(filtro => {
                regex = new RegExp(filtro.ds_valor, "i");
                tituloInvalido = title.match(regex) != null;
            });

            if (tituloInvalido) {
                continue;
            }

            tituloObrigatorio.forEach(filtro => {
                regex = new RegExp(filtro.ds_valor, "i");
                tituloInvalido = title.match(regex) != null;
            });

            if (!tituloInvalido) {
                continue;
            }

            url = await page.evaluate(element => element.href, listUrl[i]);
            oferta.nu_preco = parseFloat(fraction.replace(".", "") + "." + decimal).toFixed(2);
            oferta.ds_url = url;
            oferta.id_produto = produto.id_produto;

            if (tipoGrids == 1) {
                element = await listFretes[i].$('.shipping');
            } else {
                element = await listFretes[i].$('.item__shipping');
            }


            if (element == null) {

                await pageOferta._client.send('Network.clearBrowserCookies');

                await util.sleep(Math.floor(Math.random() * 3000) + 1000);
                await util.tryConnection(pageOferta, "https://www.mercadolivre.com.br/navigation/addresses-hub?mode=embed&flow=true&go=" + url, '.andes-form-control__field');
               
                await pageOferta.focus('.andes-form-control__field');
                await pageOferta.evaluate(() => document.querySelector('.andes-form-control__field').value = '88110630');
                element = await pageOferta.$('button');
                await util.sleep(Math.floor(Math.random() * 3000) + 1000);
                await pageOferta.evaluate(el => el.click(), element);
                await pageOferta.waitForSelector('.short-description__form', {
                    timeout: 10000
                })
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
        pageOferta.close();

        return listaOfertas;
    }
}