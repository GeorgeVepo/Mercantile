import { Browser, Page } from "puppeteer";
import { Utils } from "../utils/utils";

//module exports para oder usar em outras partes
export class Test {

    utils = new Utils();
    url: string = this.utils.config.get("TestUrl");
    page: Page;
    browser: Browser;

    constructor(browser: Browser, page: Page) {
        this.page = page;
        this.browser = browser
    }


    async ObterDados(): Promise<void> {

    }

}