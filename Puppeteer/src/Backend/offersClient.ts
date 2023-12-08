import { Page, Browser, ElementHandle } from "puppeteer";
import { Utils } from "../utils/utils";
import * as rm from "typed-rest-client";
import { IHttpClientResponse } from "typed-rest-client/Interfaces";
import { Offer } from "../Models/Offer";

export class OffersClient {

  utils = new Utils();
  client = new rm.RestClient("", this.utils.config.get("OfferApi"));


  async PostOffer(offers: Offer[]): Promise<void> {
  }
}

