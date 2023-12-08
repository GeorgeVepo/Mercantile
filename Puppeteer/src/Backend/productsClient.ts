import { Page, Browser, ElementHandle } from "puppeteer";
import { Product } from "../Models/Product";
import { Utils } from "../utils/utils";
import * as rm from "typed-rest-client";
import { IHttpClientResponse } from "typed-rest-client/Interfaces";

export class ProductsClient {

  utils = new Utils();
  client = new rm.RestClient("", this.utils.config.get("ProductsApi"));

  async GetProducts(): Promise<Product[]> {
    return (await this.client.get<Product[]>("/ObterProdutosParaPesquisa")).result;
  }
}
