import { Page, Browser, ElementHandle } from "puppeteer";
import  { type MouseButton } from "puppeteer";

import { Utils } from "../utils/utils";
import { PuppeteerModel } from "../utils/models/puppeteerModel";
import { Test } from "../tests/test";

export class Principal {

  browser!: Browser; 
  page!: Page;
  mouseButton : MouseButton = "middle";
  test: Test;
  utils = new Utils();
  url: string;

  constructor() {
    this.url = this.utils.config.get("Mercantile");
  }


  async IniciarProcesso(): Promise<void> {

    try {
      this.browser = await this.utils.ResetBrowser(this.browser);
      this.page = await this.utils.ResetPage(this.page, this.browser);

      let puppeteerModel: PuppeteerModel = new PuppeteerModel(this.page, this.url, '[data-testid="tweetText"]');

      await this.utils.TryConnection(puppeteerModel);   
      
      let listaElementos = await this.utils.TryGetElementList(puppeteerModel);

      let options = {button : this.mouseButton };

   

    } catch (e: any) {
      //await this.utils.LogError(e);
      await this.utils.ClosePage(this.page);
      
      await this.utils.CloseBrowser(this.browser);      
      await this.IniciarProcesso();
      return;
    }

    await this.utils.ClosePage(this.page);
      
    await this.utils.CloseBrowser(this.browser);
  }

}