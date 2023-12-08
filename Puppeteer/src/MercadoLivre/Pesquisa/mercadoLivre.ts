import { Page, Browser, ElementHandle } from "puppeteer";
import { type MouseButton } from "puppeteer";

import { Utils } from "../../utils/utils";
import { Product } from "../../Models/Product";
import { PuppeteerModel } from "../../utils/models/puppeteerModel";
import { ProductsClient } from "../../Backend/productsClient";
import { Offer } from "../../Models/Offer";
import { OffersClient } from "../../Backend/OffersClient";

export class MercadoLivre {

  browser!: Browser;
  page!: Page;
  utils = new Utils();
  productsClient = new ProductsClient();
  offersClient = new OffersClient();
  products: Product[];
  offers: Offer[];
  url: string;

  constructor() {
    this.url = this.utils.config.get("MercadoLivre");
  }

  async IniciarProcesso(): Promise<void> {

    try {

      this.products = await this.productsClient.GetProducts();


    } catch (e: any) {
      //await this.utils.LogError(e);
      await this.utils.ClosePage(this.page);

      await this.utils.CloseBrowser(this.browser);
      await this.IniciarProcesso();
      return;
    }

    for (var i = 0; i < this.products.length; i++) {
      this.offers = await this.PesquisarOfertas(this.products[i]);
      if (!this.offers) {
        continue;
      }

      if (this.offers != null && this.offers.length > 0) {
        await this.offersClient.PostOffer(this.offers);
      }
    }


    await this.utils.ClosePage(this.page);

    await this.utils.CloseBrowser(this.browser);
  }

  async PesquisarOfertas(product: Product): Promise<Offer[]> {

    let puppeteerModel: PuppeteerModel = new PuppeteerModel(this.page, this.url, '.item__price');

    var nomeProduto = product.filters.filter(filtro => filtro.key == "nomeProduto")[0];
    var ordenacao = product.filters.filter(filtro => filtro.key == "ordenacao")[0];
    var itemTypeID = product.filters.filter(filtro => filtro.key == "ItemTypeID")[0];
    var priceRange = product.filters.filter(filtro => filtro.key == "priceRange")[0];
    var melhoresVendedores = product.filters.filter(filtro => filtro.key == "melhoresVendedores")[0];
    var tituloNaoPermitido = product.filters.filter(filtro => filtro.key == "tituloNaoPermitido");
    var tituloObrigatorio = product.filters.filter(filtro => filtro.key == "tituloObrigatorio");

    var urlPesquisa = this.url.format(
        nomeProduto.value,
        ordenacao.value,
        itemTypeID.value,
        priceRange.value,
        melhoresVendedores.value);

    await this.utils.Sleep(Math.floor(Math.random() * 3000) + 1000);
    await this.utils.TryConnection(puppeteerModel);

    var listTitle = await this.page.$$('.main-title');
    var listPrices = await this.page.$$('.item__price');
    var listUrl = await this.page.$$('.item__title > a');
    var tipoGrids = 1;
    if (listUrl.length == 0) {
        listUrl = await this.page.$$('.item__info-link');
        tipoGrids = 2;
    }
    var listFretes = null;

    if (tipoGrids == 1) {
        listFretes = await this.page.$$('.item__stack_column__info');
    } else {
        listFretes = await this.page.$$('.item__info');
    }


    var fraction = "";
    var title = "";
    var decimal = "";
    var url = "";
    var listaOfertas = [];
    var offer : Offer;
    var frete = "";
    var tituloInvalido = false;
    var regex = null;

    var element = null;

    var pageOferta = await this.browser.newPage();

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

        offer = new Offer();
        fraction = "";
        decimal = "";
        title = "";
        url = "";
        frete = "";
        element = null;
        fraction = await listPrices[i].$eval('.price__fraction', el => el.textContent);
        element = await listPrices[i].$('.price__decimals');
        if (element != null) {
            decimal = await listPrices[i].$eval('.price__decimals', el => el.textContent);
        } else {
            decimal = "0";
        }
        title = await this.page.evaluate(element => element.textContent, listTitle[i]);

        tituloInvalido = false;
        tituloNaoPermitido.forEach(filtro => {
            regex = new RegExp(filtro.value, "i");
            tituloInvalido = title.match(regex) != null;
        });

        if (tituloInvalido) {
            continue;
        }

        tituloObrigatorio.forEach(filtro => {
            regex = new RegExp(filtro.value, "i");
            tituloInvalido = title.match(regex) != null;
        });

        if (!tituloInvalido) {
            continue;
        }

        url = await this.page.evaluate(element => element.getAttribute('href'), listUrl[i]);
        offer.price = parseFloat(fraction.replace(".", "") + "." + decimal).toFixed(2);
        offer.url = url;
        offer.idProduct = product.idProduct;

        if (tipoGrids == 1) {
            element = await listFretes[i].$('.shipping');
        } else {
            element = await listFretes[i].$('.item__shipping');
        }


        if (element == null) {


            await this.utils.Sleep(Math.floor(Math.random() * 3000) + 1000);

            try {
                await this.utils.TryConnection(puppeteerModel);
            } catch (e) {
                continue;
            }

            await pageOferta.focus('.andes-form-control__field');
            await pageOferta.evaluate(() => document.querySelector('.andes-form-control__field').nodeValue = '88110630');
            element = await pageOferta.$('button');
            await this.utils.Sleep(Math.floor(Math.random() * 3000) + 1000);
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
            offer.price = (parseFloat(offer.price) + parseFloat(frete)).toFixed(2);
        }

        listaOfertas[i] = offer;
    }

    return listaOfertas;
  }

}