var util = require('./../../Util/util.js');
var fs = require('fs');            
var tentativas = 0;
String.prototype.format = util.format;

//module exports para oder usar em outras partes
module.exports = {
    PesquisarOfertas: async function (produto, urlSite, browser, frete) {
        var listaOfertas = [];
        var page = await browser.newPage();
        
        /* await page.authenticate({ 
            username: 'lum-customer-hl_350322be-zone-datacenter-country-br' , 
            password:'67wktqwx5d8k' 
        });      */


        /*         await page._client.send('Network.clearBrowserCookies');   */


        await page.setRequestInterception(true);
        /* 
                await page.setCacheEnabled(false);
         */
        var urlLoja = "";

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

        /*  try {
             frete = await this.ObterFreteSubmarino("https://www.zoom.com.br/lead?oid=72929909&sortorder=2&index=2&searchterm=&pagesize=15&channel=1", page);
         } catch (e) {
             frete = await this.ObterFreteSubmarino(urlLoja, page);
         }  */

        try {
            listaOfertas = await this.ExecutarPesquisa(produto, urlSite, browser, page, frete);
        } catch (e) {
            today = util.getDate();
            fs.appendFile('C://MercantileAPI//Log.txt', "\r\n" + today + "\r\nZoom \r\n" + produto.nm_produto + "\r\n" + e.message + "\r\n", function (err) {});

            if (tentativas <= 5) {

                tentativas += 1;
                listaOfertas = this.PesquisarOfertas(produto, urlSite, browser, page, frete);

                page.close();
                return listaOfertas;
            }

            page.close();
            return "pesquisa indisponivel";
        }

        page.close();
        return listaOfertas;
    },
    ExecutarPesquisa: async function (produto, urlSite, browser, page, consultarFrete) {
        var Filtros = produto.ListaFiltros;
        var nomeProduto = Filtros.filter(filtro => filtro.nm_filtro == "nomeProduto")[0];
        var ordem = Filtros.filter(filtro => filtro.nm_filtro == "ordem")[0];
        var categoria = Filtros.filter(filtro => filtro.nm_filtro == "categoria")[0];

        var urlPesquisa = urlSite.format(
            categoria.ds_valor,
            nomeProduto.ds_valor,
            ordem.ds_valor
        );
        await util.sleep(Math.floor(Math.random() * 3000) + 1000);
        await util.tryConnection(page, urlPesquisa, "#product-list-container > ul > li");
     
        var botaoMaisItens = await page.$('.load-more-container > button');
        var l = 0;
        var i = 0;

        while (botaoMaisItens != null) {
            try {
                await page.evaluate(el => el.click(), botaoMaisItens);
            } catch (e) {
                await page.reload();
            }

            await new Promise(resolve => setTimeout(resolve, 10000));
            botaoMaisItens = await page.$('.load-more-container > button');

            if (i > 10) {
                botaoMaisItens = null;
            }
            i++;
        }

        var listaElementos = await page.$$('#product-list-container > ul > li');

        var botaoBotaoCEP = await page.$('.shipping-calc > a');

        if (botaoBotaoCEP != null) {
            await util.sleep(Math.floor(Math.random() * 3000) + 1000);
            await page.evaluate(el => el.click(), botaoBotaoCEP);
            await page.waitForSelector('.zip-region');
            await page.evaluate(() => document
                .querySelector('.zip-region > input').value = '88110630');

            var botaosubmit = await page.$('.zip-modal > button');
            await util.sleep(Math.floor(Math.random() * 3000) + 1000);
            await page.evaluate(el => el.click(), botaosubmit);
        }

        var url = "";
        var listaOfertas = [];
        var listaLojas = [];
        var price = null;
        var oferta = {};
        var loja = {};
        var frete = 0;
        var elemento = null;
        var pageOferta = await browser.newPage();

        /*  await pageOferta.authenticate({ 
             username: 'lum-customer-hl_350322be-zone-static-country-br' , 
             password:'67wktqwx5d8k' 
         });      */


        /*         await pageOferta.setCacheEnabled(false); */

        await pageOferta.setRequestInterception(true);

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

        for (var i = 0; i < listaElementos.length; i++) {            
            oferta = {};
            url = "";
            frete = 0;
            /*             await pageOferta._client.send('Network.clearBrowserCookies');  */
            price = await listaElementos[i].$eval('.main-price-format > .price > a', el => el.textContent);
            url = await listaElementos[i].$eval('.main-price-format > .price > a', el => el.href);
            loja = await listaElementos[i].$eval('.store-info > span > a > img', el => el.alt);
            if (listaLojas.includes(loja)) {
                continue;
            }
            elemento = await listaElementos[i].$('.shipping-info');

            if (elemento != null) {
                frete = await listaElementos[i].$eval('.shipping-info', el => el.textContent);
                frete = frete.replace(",", ".").replace("Frete: R$ ", "");
            } else {
                var siteValido = false;
                if (!consultarFrete) {
                    switch (loja) {
                        case "Americanas":
                            //Frete grátis, retirar na loja
                            siteValido = true;
                            break;
                        case "Magazine Luiza":
                            //Frete grátis, retirar na loja
                            siteValido = true;
                            break;
                        case "Fast Shop":
                            //Frete grátis, retirar na loja
                            siteValido = true;
                            break;
                        case "Colombo":
                            //Frete grátis, retirar na loja
                            siteValido = true;
                            break;
                        case "Pontofrio":
                            //Frete grátis, retirar na loja
                            siteValido = true;
                            break;
                        case "Carrefour":
                            //Frete grátis, retirar na loja
                            siteValido = true;
                            break;
                        case "Extra":
                            //Frete grátis, retirar na loja
                            siteValido = true;
                            break;
                        case "Casas Bahia":
                            //Frete grátis, retirar na loja
                            siteValido = true;
                            break;
                        case "Kalunga":
                            //Frete grátis  
                            siteValido = true;
                            break;
                    }
                } else {
                    switch (loja) {
                        case "Kabum":
                            try {
                                frete = await this.ObterFreteKabum(url, pageOferta);
                            } catch (e) {
                                fs.appendFile('C://MercantileAPI//Log.txt', "\r\n" + util.getDate() + "\r\nZoom \r\n" + produto.nm_produto + " - " + loja + "\r\n" + e.message + "\r\n", function (err) {});
                                break;
                            }
                            if (frete == false) {
                                break;
                            }
                            siteValido = true;
                            break;
                        case "Submarino":
                            try {
                                frete = await this.ObterFreteSubmarino(url, pageOferta);
                            } catch (e) { 
                                fs.appendFile('C://MercantileAPI//Log.txt', "\r\n" + util.getDate() + "\r\nZoom \r\n" + produto.nm_produto + " - " + loja + "\r\n" + e.message + "\r\n", function (err) {});                               
                                break;                                    
                            }
                            siteValido = true;
                            break;
                        case "Shoptime":
                            try {
                                frete = await this.ObterFreteShoptime(url, pageOferta);
                            } catch (e) {
                                fs.appendFile('C://MercantileAPI//Log.txt', "\r\n" + util.getDate() + "\r\nZoom \r\n" + produto.nm_produto + " - " + loja + "\r\n" + e.message + "\r\n", function (err) {});
                                break;
                            }
                            siteValido = true;
                            break;
                        case "Amazon":
                            try {
                                frete = await this.ObterFreteAmazon(url, pageOferta);
                            } catch (e) {
                                fs.appendFile('C://MercantileAPI//Log.txt', "\r\n" + util.getDate() + "\r\nZoom \r\n" + produto.nm_produto + " - " + loja + "\r\n" + e.message + "\r\n", function (err) {});
                                break;
                            }
                            siteValido = true;
                            break;
                        case "Walmart":
                            try {
                                frete = await this.ObterFreteWalmart(url, pageOferta);
                            } catch (e) {
                                fs.appendFile('C://MercantileAPI//Log.txt', "\r\n" + util.getDate() + "\r\nZoom \r\n" + produto.nm_produto + " - " + loja + "\r\n" + e.message + "\r\n", function (err) {});
                                break;
                            }
                            siteValido = true;
                            break;
                    }
                }

                if (!siteValido) {
                    continue;
                }
            }

            oferta.nu_preco = parseFloat(price.replace("R$", "").replace(/\s/g, "").replace(".", "").replace(",", "."));
            oferta.nu_preco = parseFloat(oferta.nu_preco) + parseFloat(frete);
            oferta.nu_preco = oferta.nu_preco.toFixed(2);
            if (parseFloat(oferta.nu_preco) <= 0) {
                contine;
            }

            listaLojas.push(loja);
            oferta.ds_url = url;
            oferta.id_produto = produto.id_produto;
            listaOfertas[i] = oferta;
        }
        pageOferta.close();

        return listaOfertas;
    },
    ObterFreteKabum: async function (urlSite, pageOferta) {
        await util.tryConnection(pageOferta, urlSite, '.button-calcula-cep');
        
        await new Promise(resolve => setTimeout(resolve, 20000));
        await pageOferta.waitForSelector('.button-calcula-cep', {
            timeout: 100000
        });
        await pageOferta.evaluate(() => document.querySelector('#calc_cep').value = '88110-630');
        element = await pageOferta.$('.button-calcula-cep');
        await pageOferta.evaluate(el => el.click(), element);
        await new Promise(resolve => setTimeout(resolve, 60000));
        await pageOferta.waitForSelector('#table-calcular > tr', {
            timeout: 100000
        });
        var elementList = await pageOferta.$$('#table-calcular > tr');
        var celulasList = [];
        var frete = 0;
        var aux = "";
        for (var i = 0; i < elementList.length; i++) {
            celulasList = await elementList[i].$$('td');
            var num = celulasList.length - 1;
            aux = await pageOferta.evaluate(el => el.textContent, celulasList[num]);
            aux = aux.replace("R$", "").replace(/\s/g, "").replace(",", ".");
            aux = parseFloat(aux).toFixed(2);
            if (aux != "" && aux != "NaN" && (aux < frete || frete == 0)) {
                frete = aux;
            }
        }

        return frete;
    },
    ObterFreteSubmarino: async function (urlSite, pageOferta) {
        await util.tryConnection(pageOferta, urlSite, "#input-freight-product");
        await pageOferta.focus('#input-freight-product');
        await pageOferta.keyboard.type("88110630");
        element = await pageOferta.$('#bt-freight-product');
        await pageOferta.evaluate(el => el.click(), element);
        await new Promise(resolve => setTimeout(resolve, 10000));
        var elementList = await pageOferta.$('#card-freight');
        elementList = await elementList.$$('tr > td > span');
        var frete = 0;
        var aux = "";
        for (var i = 0; i < elementList.length; i++) {
            aux = await pageOferta.evaluate(el => el.textContent, elementList[i]);
            if (aux == "") {
                i += 2;
                continue;
            }
            if (aux == "grátis") {
                frete = 0;

                return frete;
            }

            aux = aux.replace("R$", "").replace(/\s/g, "").replace(",", ".");
            if (/\D/.test(aux.replace(".", "")) || aux == "") {
                continue;
            }
            aux = parseFloat(aux).toFixed(2);

            if (frete > aux || frete == 0) {
                frete = aux;
            }
        }
        return frete;
    },
    ObterFreteAmazon: async function (urlSite, pageOferta) {
        await util.tryConnection(pageOferta, urlSite, "#contextualIngressPtLabel");
        
        await this.ApertarBotaoEsperar(pageOferta, "#contextualIngressPtLabel", "#GLUXZipUpdateInput_0");
        await pageOferta.evaluate(() => document.querySelector('#GLUXZipUpdateInput_0').value = '88110');
        await pageOferta.evaluate(() => document.querySelector('#GLUXZipUpdateInput_1').value = '630');
        element = await pageOferta.$('#GLUXZipInputSection');
        await this.ApertarBotaoEsperar(pageOferta, "input[type=submit]", ".a-popover-footer", element);
        await this.ApertarBotaoEsperar(pageOferta, ".a-popover-footer > span > span", "#shippingMessageInsideBuyBox_feature_div");
        await pageOferta.waitForSelector('#contextualIngressPtLabel');
        element = await pageOferta.$('#shippingMessageInsideBuyBox_feature_div');
        element = await element.$('a');
        var frete = 0;
        var aux = "";
        if (element == null) {
            await pageOferta.waitForSelector('#soldByThirdParty');
            var elementList = await pageOferta.$$('#soldByThirdParty > span');
            for (var i = 0; i < elementList.length; i++) {
                aux = await pageOferta.evaluate(el => el.textContent, elementList[i]);
                if (aux.includes("frete")) {
                    aux = aux.replace("+", "").replace("de frete", "").replace("R$", "").replace(/\s/g, "").replace(",", ".");
                    aux = parseFloat(aux).toFixed(2);
                    frete = aux;

                    return frete;
                }
            };
        }
        aux = await pageOferta.evaluate(el => el.textContent, element);
        if (aux == "Frete GRÁTIS") {

            return frete;
        }
    },
    ObterFreteShoptime: async function (urlSite, pageOferta) {
        await util.tryConnection(pageOferta, urlSite, "#input-freight-product");
        await pageOferta.focus('#input-freight-product');
        await pageOferta.keyboard.type("88110630");
        element = await pageOferta.$('#bt-freight-product');
        await pageOferta.evaluate(el => el.click(), element);
        await new Promise(resolve => setTimeout(resolve, 10000));
        var elementList = await pageOferta.$('#card-freight');
        elementList = await elementList.$$('tr > td > span');
        var frete = 0;
        var aux = "";
        for (var i = 0; i < elementList.length; i++) {
            aux = await pageOferta.evaluate(el => el.textContent, elementList[i]);
            if (aux == "") {
                i += 2;
                continue;
            }
            if (aux == "grátis") {
                frete = 0;

                return frete;
            }
            aux = aux.replace("R$", "").replace(/\s/g, "").replace(",", ".");
            if (/\D/.test(aux.replace(".", "")) || aux == "") {
                continue;
            }
            aux = parseFloat(aux).toFixed(2);

            if (frete == 0 || frete > aux) {
                frete = aux;
            }
        }

        return frete;
    },
    ObterFreteWalmart: async function (urlSite, pageOferta) {
        await util.tryConnection(pageOferta, urlSite, "#estimate-shipping-txt-cep");
 
        //Focar no cep
        await pageOferta.focus('#estimate-shipping-txt-cep');
        await pageOferta.keyboard.type("88110630");
        element = await pageOferta.$('.estimate-shipping-frm');
        await this.ApertarBotaoEsperar(pageOferta, 'input[type=submit]', '.buybox-consult-item-shipping > span > span', element);
        //frete grátis      

        var frete = 0;
        var aux = "";
        element = await pageOferta.$('.buybox-consult-item-shipping > span > span');
        aux = await pageOferta.evaluate(el => el.textContent, element);

        if (aux == 'Frete Grátis') {
            frete = 0;

            return frete;
        }

        aux = aux.replace("R$", "").replace(/\s/g, "").replace(",", ".");
        aux = parseFloat(aux).toFixed(2);

        if (aux != 'NaN') {
            frete = aux;
        }
        return frete;
    },
    ApertarBotaoEsperar: async function (page, selectorBotao, selectorEspera, pageElement) {
        var element = null;
        await page.waitForSelector(selectorBotao);
        if (pageElement == null) {
            element = await page.$(selectorBotao);
        } else {
            element = await pageElement.$(selectorBotao);
        }
        await util.sleep(Math.floor(Math.random() * 3000) + 1000);
        await page.evaluate(el => el.click(), element);
        await page.waitForSelector(selectorEspera);

    },
    EsperarRecarregarPagina: async function (page, selectorEspera) {
        await page.waitForSelector(selectorEspera, {
            timeout: 100000
        });
    }

}