var util = require('./../../Util/util.js');
var fs = require('fs');
var tentativas = 0;
String.prototype.format = util.format;

//module exports para oder usar em outras partes
module.exports = {
    PesquisarOfertas: async function (produto, urlSite, browser) {
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
            listaOfertas = await this.ExecutarPesquisa(produto, urlSite, browser, page);
        } catch (e) {
            today = util.getDate();
            fs.appendFile(__dirname + '//Log.txt', "\r\n" + today + "\r\nZoom \r\n" + produto.nm_produto + "\r\n" + e.message + "\r\n", function (err) {});
        
            page.close();
            return "pesquisa indisponivel";
        }

        page.close();
        return listaOfertas;
    },
    ExecutarPesquisa: async function (produto, urlSite, browser, page) {
        await util.connectToVPN(page);
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

        await util.tryConnection(page, urlPesquisa, ".offers-list > li", 2);

        var botaoMaisItens = await page.$('.offers-load > button');
        var l = 0;
        var i = 0;

        while (botaoMaisItens != null) {
            try {
                await page.evaluate(el => el.click(), botaoMaisItens);
            } catch (e) {
                await page.reload();
            }

            await new Promise(resolve => setTimeout(resolve, 10000));
            botaoMaisItens = await page.$('.offers-load > button');

            if (i > 10) {
                botaoMaisItens = null;
            }
            i++;
        }

        var listaElementos = await page.$$('.offers-list > li');

        var botaoBotaoCEP = await page.$('.shipping-calc > a');

        if (botaoBotaoCEP != null) {
            await util.sleep(Math.floor(Math.random() * 3000) + 1000);
            await page.evaluate(el => el.click(), botaoBotaoCEP);
            await page.waitForSelector('.zip-region');
            await page.evaluate(() => document
                .querySelector('.zip-region > input').value = '04814105');

            var botaosubmit = await page.$('.zip-modal > button');
            await util.sleep(Math.floor(Math.random() * 3000) + 1000);
            await page.evaluate(el => el.click(), botaosubmit);
        }

        var url = "";
        var listaOfertas = [];
        var listaLojasErro = [];
        var price = null;
        var oferta = {};
        var loja = {};
        var lojaZoom = "";
        var frete = 0;
        var elemento = null;
        var pageOferta = null;

        for (var i = 0; i < listaElementos.length; i++) {
            loja = await listaElementos[i].$eval('.l-cols > .col-store > a > img', el => el.alt);
            loja = loja.replace("na ", "");
            loja = loja.replace("no ", "");

            
            if (listaLojasErro.includes(loja)) {
                continue;
            }

            pageOferta = await browser.newPage();

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
         
            oferta = {};
            url = "";
            frete = 0;            
            
            price = await listaElementos[i].$eval('.col-pricing > a > .price > span', el => el.textContent);
            url = await listaElementos[i].$eval('.r-cols > .col-lead > a', el => el.href);         
            lojaZoom = await listaElementos[i].$eval('.r-cols > .col-lead > a', el => el.textContent);          

            elemento = await listaElementos[i].$('.shipping-info');

            if (elemento != null) {
                frete = await listaElementos[i].$eval('.shipping-info', el => el.textContent);
                frete = frete.replace(",", ".").replace("Frete: R$ ", "");
            } else {
                var siteValido = false;
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
                    case "Kabum":
                        try {
                            frete = await this.ObterFreteKabum(url, pageOferta);
                        } catch (e) {
                            fs.appendFile(__dirname + '//Log.txt', "\r\n" + util.getDate() + "\r\nZoom \r\n" + produto.nm_produto + " - " + loja + "\r\n" + e.message + "\r\n", function (err) {});
                            listaLojasErro.push(loja);
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
                            fs.appendFile(__dirname + '//Log.txt', "\r\n" + util.getDate() + "\r\nZoom \r\n" + produto.nm_produto + " - " + loja + "\r\n" + e.message + "\r\n", function (err) {});
                            listaLojasErro.push(loja);
                            break;
                        }
                        siteValido = true;
                        break;
                    case "Shoptime":
                        try {
                            frete = await this.ObterFreteShoptime(url, pageOferta);
                        } catch (e) {
                            fs.appendFile(__dirname + '//Log.txt', "\r\n" + util.getDate() + "\r\nZoom \r\n" + produto.nm_produto + " - " + loja + "\r\n" + e.message + "\r\n", function (err) {});
                            listaLojasErro.push(loja);
                            break;
                        }
                        siteValido = true;
                        break;
                    case "Amazon":
                        try {
                            frete = await this.ObterFreteAmazon(url, pageOferta);
                        } catch (e) {;
                            fs.appendFile(__dirname + '//Log.txt', "\r\n" + util.getDate() + "\r\nZoom \r\n" + produto.nm_produto + " - " + loja + "\r\n" + e.message + "\r\n", function (err) {});
                            listaLojasErro.push(loja);
                            break;
                        }
                        siteValido = true;
                        break;
                    case "Walmart":
                        try {
                            frete = await this.ObterFreteWalmart(url, pageOferta);
                        } catch (e) {;
                            fs.appendFile(__dirname + '//Log.txt', "\r\n" + util.getDate() + "\r\nZoom \r\n" + produto.nm_produto + " - " + loja + "\r\n" + e.message + "\r\n", function (err) {});
                            listaLojasErro.push(loja);
                            break;
                        }
                        siteValido = true;
                        break;
                    default:
                        if (lojaZoom == "Comprar") {
                            try {
                                frete = await this.ObterLojaZoom(url, pageOferta);
                            } catch (e) {
                                fs.appendFile(__dirname + '//Log.txt', "\r\n" + util.getDate() + "\r\nZoom \r\n" + produto.nm_produto + " - " + loja + "\r\n" + e.message + "\r\n", function (err) {});
                                break;
                            }
                            if (frete == false) {
                                break;
                            }
                            siteValido = true;
                        }
                        break;
                }


                if (!siteValido) {
                    pageOferta.close();
                    continue;
                }
            }

            oferta.nu_preco = parseFloat(price.replace("R$", "").replace(/\s/g, "").replace(".", "").replace(",", "."));
            oferta.nu_preco = parseFloat(oferta.nu_preco) + parseFloat(frete);
            oferta.nu_preco = oferta.nu_preco.toFixed(2);
            oferta.frete = parseFloat(frete);
            if (parseFloat(oferta.nu_preco) <= 0) {
                pageOferta.close();
                continue;
            }

            oferta.ds_url = url;
            oferta.id_produto = produto.id_produto;
            listaOfertas.push(oferta);
            pageOferta.close();
        }
    
        var freteMedia = 0;
        var auxiliarMedia = 0;
        for(var i = 0; i < listaOfertas.length; i++){
            if(listaOfertas[i] && listaOfertas[i].frete > 0){
                auxiliarMedia += 1;
                freteMedia += listaOfertas[i].frete;
            }
        }
      
        freteMedia = freteMedia / auxiliarMedia;

        for (var i = 0; i < listaElementos.length; i++) {

            loja = await listaElementos[i].$eval('.l-cols > .col-store > a > img', el => el.alt);
            loja = loja.replace("na ", "");
            loja = loja.replace("no ", "");

            if (!listaLojasErro.includes(loja)) {
                continue;
            }         
         
            oferta = {};
            url = "";
            frete = 0;

            price = await listaElementos[i].$eval('.col-pricing > a > .price > span', el => el.textContent);
            url = await listaElementos[i].$eval('.r-cols > .col-lead > a', el => el.href);
        
            oferta.nu_preco = parseFloat(price.replace("R$", "").replace(/\s/g, "").replace(".", "").replace(",", "."));
            oferta.nu_preco = parseFloat(oferta.nu_preco) + parseFloat(freteMedia);
            oferta.nu_preco = oferta.nu_preco.toFixed(2);
            oferta.frete = parseFloat(freteMedia);
            if (parseFloat(oferta.nu_preco) <= 0) {
                pageOferta.close();
                continue;
            }

            oferta.ds_url = url;
            oferta.id_produto = produto.id_produto;
            listaOfertas.push(oferta);
        }

        return listaOfertas;
    },
    ObterLojaZoom: async function (urlSite, pageOferta) {
        await util.tryConnection(pageOferta, urlSite, '.s-field > .s-inpt', 1);
        await new Promise(resolve => setTimeout(resolve, 10000));
        await pageOferta.waitForSelector('.s-field > .s-inpt', {
            timeout: 100000
        });
        await pageOferta.evaluate(() => document.querySelector('.s-field > .s-inpt').value = '');
        await pageOferta.focus('.s-field > .s-inpt');
        await pageOferta.keyboard.type("04814105");
        element = await pageOferta.$('.s-field > button');
        await pageOferta.evaluate(el => el.click(), element);
        await new Promise(resolve => setTimeout(resolve, 10000));
        await pageOferta.waitForSelector('.shipping-label', {
            timeout: 100000
        });
        var frete = await pageOferta.$eval('.shipping-label > .fs > strong', el => el.textContent);
        frete = frete.replace("Frete R$", "").replace(/\s/g, "").replace(",", ".");
        frete = parseFloat(frete).toFixed(2);
        return frete;
    },
    ObterFreteKabum: async function (urlSite, pageOferta) {
        await util.tryConnection(pageOferta, urlSite, '.button-calcula-cep', 1);

        await new Promise(resolve => setTimeout(resolve, 10000));
        await pageOferta.waitForSelector('.button-calcula-cep', {
            timeout: 100000
        });
        await pageOferta.evaluate(() => document.querySelector('#calc_cep').value = '04814-105');
        element = await pageOferta.$('.button-calcula-cep');
        await pageOferta.evaluate(el => el.click(), element);
        await new Promise(resolve => setTimeout(resolve, 10000));
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
        await util.tryConnection(pageOferta, urlSite, "#input-freight-product", 1);
        await pageOferta.evaluate(() => document.querySelector('#input-freight-product').value = '');
        await pageOferta.focus('#input-freight-product');
        await pageOferta.keyboard.type("04814105");
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
        await util.tryConnection(pageOferta, urlSite, "#contextualIngressPtLabel", 1);

        await this.ApertarBotaoEsperar(pageOferta, "#contextualIngressPtLabel", "#GLUXZipUpdateInput_0");
        await pageOferta.evaluate(() => document.querySelector('#GLUXZipUpdateInput_0').value = '04814');
        await pageOferta.evaluate(() => document.querySelector('#GLUXZipUpdateInput_1').value = '105');
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
        await util.tryConnection(pageOferta, urlSite, "#input-freight-product", 1);
        await pageOferta.evaluate(() => document.querySelector('#input-freight-product').value = '');
        await pageOferta.focus('#input-freight-product');
        await pageOferta.keyboard.type("04814105");
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
        await util.tryConnection(pageOferta, urlSite, "#estimate-shipping-txt-cep", 1);

        //Focar no cep
        await pageOferta.evaluate(() => document.querySelector('#estimate-shipping-txt-cep').value = '');
        await pageOferta.focus('#estimate-shipping-txt-cep');
        await pageOferta.keyboard.type("04814105");
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