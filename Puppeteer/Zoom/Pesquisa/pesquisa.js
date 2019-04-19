var puppeteer = require('puppeteer');
var util = require('./../../Util/util.js');

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
            
        } catch (e) {
            var pages = await browser.pages();
            pages.forEach(p => p.close());
        }
        return listaOfertas;
    },
    ExecutarPesquisa: async function (produto, urlSite, browser) {
        const page = await browser.newPage();
        await page.setViewport({
            width: 1350,
            height: 1040
        });

        var Filtros = produto.ListaFiltros;
        var nomeProduto = Filtros.filter(filtro => filtro.nm_filtro == "nomeProduto")[0];
        var ordem = Filtros.filter(filtro => filtro.nm_filtro == "ordem")[0];
        var categoria = Filtros.filter(filtro => filtro.nm_filtro == "categoria")[0];

        var urlPesquisa = urlSite.format(
            categoria.ds_valor,
            nomeProduto.ds_valor,
            ordem.ds_valor
        );
        await util.sleep(Math.floor(Math.random() * 60000));
        await page.goto(urlPesquisa, {
            timeout: 100000
        });
        await this.EsperarRecarregarPagina(page, "#product-list-container > ul > li");

        var botaoMaisItens = await page.$('.load-more-container > button');
        var l = 0;
        var i = 0;

        while (botaoMaisItens != null) {
            try {
                await botaoMaisItens.click();
            } catch (e) {
                await page.reload();
            }
            await new Promise(resolve => setTimeout(resolve, 10000));
            botaoMaisItens = await page.$('.load-more-container > button');
            if (i > 50) {
                l++;
                if (l >= 4) {
                    botaoMaisItens = null;
                } else {
                    i = 0;
                    await page.reload();
                }
            }
            i++;
        }

        var listaElementos = await page.$$('#product-list-container > ul > li');

        var botaoBotaoCEP = await page.$('.shipping-calc > a');

        if (botaoBotaoCEP != null) {
            await util.sleep(Math.floor(Math.random() * 60000));
            await botaoBotaoCEP.click();
            await page.waitForSelector('.zip-region');
            await page.evaluate(() => document
                .querySelector('.zip-region > input').value = '88110630');

            var botaosubmit = await page.$('.zip-modal > button');
            await util.sleep(Math.floor(Math.random() * 60000));
            await botaosubmit.click();
        }


        var url = "";
        var listaOfertas = [];
        var price = null;
        var oferta = {};
        var loja = {};
        var frete = 0;
        var elemento = null;

        for (var i = 0; i < listaElementos.length; i++) {
            oferta = {};
            url = "";
            frete = 0;

            price = await listaElementos[i].$eval('.main-price-format > .price > a', el => el.textContent);
            url = await listaElementos[i].$eval('.main-price-format > .price > a', el => el.href);
            loja = await listaElementos[i].$eval('.store-info > span > a > img', el => el.alt);

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
                            frete = await this.ObterFreteKabum(url, browser);
                        } catch (e) {
                            break;
                        }
                        if (frete == false) {
                            break;
                        }
                        siteValido = true;
                        break;
                    case "Submarino":
                        try {
                            frete = await this.ObterFreteSubmarino(url, browser);
                        } catch (e) {
                            break;
                        }
                        siteValido = true;
                        break;
                    case "Shoptime":
                        try {
                            frete = await this.ObterFreteShoptime(url, browser);
                        } catch (e) {
                            break;
                        }
                        siteValido = true;
                        break;
                    case "Amazon":
                        try {
                            frete = await this.ObterFreteAmazon(url, browser);
                        } catch (e) {
                            break;
                        }
                        siteValido = true;
                        break;
                    case "Walmart":
                        try {
                            frete = await this.ObterFreteWalmart(url, browser);
                        } catch (e) {
                            break;
                        }
                        siteValido = true;
                        break;
                }

                if (!siteValido) {
                    continue;
                }
            }

            oferta.nu_preco = parseFloat(price.replace("R$", "").replace(/\s/g, "").replace(".", "").replace(",", "."));
            oferta.nu_preco = parseFloat(oferta.nu_preco) + parseFloat(frete);
            oferta.nu_preco = oferta.nu_preco.toFixed(2);
            oferta.ds_url = url;
            oferta.id_produto = produto.id_produto;
            listaOfertas[i] = oferta;
        }


        var pages = await browser.pages();
        pages.forEach(p => p.close());
        return listaOfertas;
    },
    ObterFreteKabum: async function (urlSite, browser) {
        var pageOferta = await browser.newPage();
        await util.sleep(Math.floor(Math.random() * 60000));
        await pageOferta.goto(urlSite, {
            timeout: 100000
        });

        try {
            await pageOferta.waitForSelector('.button-calcula-cep', {
                timeout: 100000
            });
        } catch (e) {
            return false;
        }
        await pageOferta.evaluate(() => document.querySelector('#calc_cep').value = '88110-630');
        element = await pageOferta.$('.button-calcula-cep');
        await util.sleep(Math.floor(Math.random() * 60000));
        await element.click();
        await new Promise(resolve => setTimeout(resolve, 10000));
        await pageOferta.waitForSelector('#table-calcular > tr')
        await new Promise(resolve => setTimeout(resolve, 10000));
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
    ObterFreteSubmarino: async function (urlSite, browser) {
        var pageOferta = await browser.newPage();
        await util.sleep(Math.floor(Math.random() * 60000));
        await pageOferta.goto(urlSite, {
            timeout: 100000
        });

        await this.EsperarRecarregarPagina(pageOferta, "#input-freight-product");
        await pageOferta.focus('#input-freight-product');
        await pageOferta.keyboard.type("88110630");
        element = await pageOferta.$('#bt-freight-product');
        await util.sleep(Math.floor(Math.random() * 60000));
        await element.click();
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
    ObterFreteAmazon: async function (urlSite, browser) {
        var pageOferta = await browser.newPage();
        await util.sleep(Math.floor(Math.random() * 60000));
        await pageOferta.goto(urlSite, {
            timeout: 100000
        });
        await this.EsperarRecarregarPagina(pageOferta, "#contextualIngressPtLabel");
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
    ObterFreteShoptime: async function (urlSite, browser) {
        var pageOferta = await browser.newPage();
        await util.sleep(Math.floor(Math.random() * 60000));
        await pageOferta.goto(urlSite, {
            timeout: 100000
        });

        await this.EsperarRecarregarPagina(pageOferta, "#input-freight-product");
        await pageOferta.focus('#input-freight-product');
        await pageOferta.keyboard.type("88110630");
        element = await pageOferta.$('#bt-freight-product');
        await util.sleep(Math.floor(Math.random() * 60000));
        await element.click();
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
    ObterFreteWalmart: async function (urlSite, browser) {
        var pageOferta = await browser.newPage();
        await util.sleep(Math.floor(Math.random() * 60000));
        await pageOferta.goto(urlSite, {
            timeout: 100000
        });
        await this.EsperarRecarregarPagina(pageOferta, "#estimate-shipping-txt-cep");

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
        await util.sleep(Math.floor(Math.random() * 60000));
        await element.click();
        try {
            await page.waitForSelector(selectorEspera);
        } catch (e) {
            await this.ApertarBotaoEsperar(page, selectorBotao, selectorEspera, pageElement);
        }
    },
    EsperarRecarregarPagina: async function (page, selectorEspera) {
        try {
            await page.waitForSelector(selectorEspera, {
                timeout: 100000
            });
        } catch (e) {
            await page.reload();
            await this.EsperarRecarregarPagina(page, selectorEspera);
        }
    }

}