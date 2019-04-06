var puppeteer = require('puppeteer');
var util = require('./../../Util/util.js');

String.prototype.format = util.format;
//module exports para oder usar em outras partes
module.exports = {
    PesquisarOfertas: async function (produto, urlSite) {
        var listaOfertas = [];
        const browser = await puppeteer.launch({
            headless: false
        });

        try {
            listaOfertas = await this.ExecutarPesquisa(produto, urlSite, browser);
        } catch (e) {
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
        var ordem = Filtros.filter(filtro => filtro.nm_filtro == "ordem")[0];
        var categoria = Filtros.filter(filtro => filtro.nm_filtro == "categoria")[0];

        var urlPesquisa = urlSite.format(
            categoria.ds_valor,
            nomeProduto.ds_valor,
            ordem.ds_valor
        );

        await page.goto(urlPesquisa, {
            timeout: 100000
        });
        await page.waitForSelector('#product-list-container > ul > li');

        var botaoMaisItens = await page.$('.load-more-container > button');
        var l = 0;
        var i = 0;

        while (botaoMaisItens != null) {
            try {
                await botaoMaisItens.click();
            } catch (e) {
                await page.reload();
            }

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
            await botaoBotaoCEP.click();
            await page.waitForSelector('.zip-region');
            await page.evaluate(() => document
                .querySelector('.zip-region > input').value = '88110630');

            var botaosubmit = await page.$('.zip-modal > button');
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
                        frete = await this.ObterFreteKabum(url, browser);
                        if (frete == 0) {
                            break;
                        }
                        siteValido = true;
                        break;
                    case "Submarino":
                        frete = await this.ObterFreteSubmarino(url, browser);
                        if (frete == 0) {
                            break;
                        }
                        siteValido = true;
                        break;
                    case "Shoptime":
                        //Não implementado 
                        break;
                    case "Amazon":
                        frete = await this.ObterFreteAmazon(url, browser);
                        if (frete == 0) {
                            break;
                        }
                        siteValido = true;
                        break;
                    case "Walmart":
                        //Não implementado 
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
        await pageOferta.goto(urlSite, {
            timeout: 100000
        });
        try {
            await pageOferta.waitForSelector('.button-calcula-cep', {
                timeout: 100000
            });
        } catch (e) {
            return 0;
        }
        await pageOferta.evaluate(() => document.querySelector('#calc_cep').value = '88110-630');
        element = await pageOferta.$('.button-calcula-cep');
        await element.click();
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
            aux = parseFloat(aux.replace("R$", "").replace(/\s/g, "").replace(",", ".")).toFixed(2);
            if (aux != "" && aux != "NaN" && (aux < frete || frete == 0)) {
                frete = aux;
            }
        }

        return frete;
    },
    ObterFreteSubmarino: async function (urlSite, browser) {
        var pageOferta = await browser.newPage();
        await pageOferta.goto(urlSite, {
            timeout: 100000
        });
        try {
            await pageOferta.waitForSelector('#input-freight-product', {
                timeout: 100000
            });
        } catch (e) {
            return 0;
        }
        await pageOferta.focus('#input-freight-product');
        await pageOferta.keyboard.type("88110630");
        element = await pageOferta.$('#bt-freight-product');
        await element.click();
        await new Promise(resolve => setTimeout(resolve, 10000));
        var elementList = await pageOferta.$('#card-freight');
        elementList = await elementList.$$('tr > td > span');
        var frete = 0;
        var aux = "";
        for (var i = 0; i < elementList.length; i++) {
            aux = await pageOferta.evaluate(el => el.textContent, elementList[i]);
            aux = aux.replace("R$", "").replace(/\s/g, "").replace(",", ".");
            if (/\D/.test(aux.replace(".", "")) || aux == "") {
                continue;
            }
            aux = parseFloat(aux).toFixed(2);

            if(frete > aux){
                frete = aux;            
            }                     
        }
        return frete;
    },
    ObterFreteAmazon: async function (urlSite, browser) {
        var pageOferta = await browser.newPage();
        await pageOferta.goto(urlSite, {
            timeout: 100000
        });
        try {
            await pageOferta.waitForSelector('#contextualIngressPtLabel', {
                timeout: 100000
            });
        } catch (e) {
            return 0;
        }
        element = await pageOferta.$('#contextualIngressPtLabel');
        await element.click();
        await pageOferta.focus('#input-freight-product');
        await pageOferta.keyboard.type("88110630");
        element = await pageOferta.$('#contextualIngressPtLabel');
        await element.click();
        await new Promise(resolve => setTimeout(resolve, 10000));
        var elementList = await pageOferta.$('#card-freight');
        elementList = await elementList.$$('tr > td > span');
        var frete = 0;
        var aux = "";
        for (var i = 0; i < elementList.length; i++) {
            aux = await pageOferta.evaluate(el => el.textContent, elementList[i]);
            aux = aux.replace("R$", "").replace(/\s/g, "").replace(",", ".");
            if (/\D/.test(aux.replace(".", "")) || aux == "") {
                continue;
            }
            aux = parseFloat(aux).toFixed(2);
            if(frete > aux){
                frete = aux;            
            }    
        }

        return frete;
    }
}