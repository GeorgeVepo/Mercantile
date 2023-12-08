import * as fs from 'fs'
import { Browser, ElementHandle, Frame, HTTPRequest, Page } from "puppeteer";
import { ElementoNaoEncontradoException } from "./exceptions/ElementoNaoEncontradoException";
import * as PuppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as Puppeteer from "puppeteer";
import { ConfigModel } from './models/configModel';
import { PuppeteerModel } from './models/puppeteerModel';
import UserAgent from 'user-agents';
import { UnhandledException } from './exceptions/UnhandledException';
import Config from '../../config.json';
import delay from 'yoctodelay';
const BEEP_DELAY = 500;


export class Utils {
    logPath: string;
    puppeteer: PuppeteerExtra.PuppeteerExtra;
    config: ConfigModel;
    userAgent = new UserAgent();

    constructor() {
        this.puppeteer = new PuppeteerExtra.PuppeteerExtra(Puppeteer);

        this.config = new ConfigModel(Config);

        this.logPath = this.config.get("PathProd") + "//log";
    }



    private beep() {
        process.stdout.write('\u0007');
    }

    private async melodicalBeep(melody: any): Promise<any> {
        if (melody.length === 0) {
            return;
        }

        await delay(BEEP_DELAY);

        if (melody.shift() === '*') {
            this.beep();
        }

        return this.melodicalBeep(melody);
    }

    async beeper(countOrMelody: any) {
        if (
            !process.stdout.isTTY ||
            process.argv.includes('--no-beep') ||
            process.argv.includes('--beep=false')
        ) {
            return;
        }

        if (countOrMelody === Number.parseInt(countOrMelody, 10)) {
            if (countOrMelody < 0) {
                throw new TypeError('Negative numbers are not accepted');
            }

            if (countOrMelody === 0) {
                return;
            }

            for (let index = 0; index < countOrMelody; index++) {
                await delay(BEEP_DELAY); // eslint-disable-line no-await-in-loop

                this.beep();
            }
        } else if (!countOrMelody) {
            this.beep();
        } else if (typeof countOrMelody === 'string') {
            await this.melodicalBeep(countOrMelody.split(''));
        } else {
            throw new TypeError('Not an accepted type');
        }
    }


    async Sleep(timeout: number): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, timeout));
    }

    async SleepMin(timeout: number): Promise<void> {
        timeout = this.FromMin(timeout);
        await new Promise(resolve => setTimeout(resolve, timeout));
    }

    async SleepSec(timeout: number): Promise<void> {
        timeout = this.FromSec(timeout);
        await new Promise(resolve => setTimeout(resolve, timeout));
    }

    FromSec(timeout: number): number {
        return timeout * 1000;
    }

    FromMin(timeout: number): number {
        return timeout * 60000;
    }

    RandomNumber(min: number, max: number): number {
        max = min - max;
        return Math.floor(Math.random() * max + min);
    }

    GetDate(): string {
        let today: Date = new Date();
        let dd: string = String(today.getDate()).padStart(2, '0');
        let mm: string = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy: number = today.getFullYear();
        let hh: number = today.getHours();
        let MM: number = today.getMinutes();
        let ss: number = today.getSeconds();
        let mmm: number = today.getMilliseconds();

        return dd + '-' + mm + '-' + yyyy + ' ' + hh + '-' + MM + '-' + ss;
    }

    async TryConnection(pm: PuppeteerModel): Promise<void> {
        await this.LogDev("TryConnection");
        await this.LogDev(pm);
        let tentivas: number = pm.tentativas;
        let timeout: number = pm.timeout;
        let waitTimeout: number = pm.waitTimeout;
        if (timeout == 0 || waitTimeout == 0) {
            waitTimeout = this.RandomNumber(1200, 600);
            timeout = this.RandomNumber(6000, 5000);
        }

        while (pm.tentativas > 0) {
            try {
                await this.Sleep(waitTimeout);
                await pm.el.goto(pm.url, {
                    timeout: timeout
                });

                await pm.el.waitForSelector(pm.selector, {timeout: timeout});

                break;
            } catch (e) {
                await this.LogDev("TryConnection catch");
                await this.LogDev(e);
                tentivas -= 1;
                if (tentivas <= 0) {
                    this.GravarLog("tryConnection", e);
                    throw e;
                }
                timeout += timeout;
                waitTimeout += waitTimeout;
            }
        }
    }

    async TryGetElement(pm: PuppeteerModel): Promise<ElementHandle<Element>> {
        await this.LogDev("TryGetElement");
        await this.LogDev(pm);
        let result: ElementHandle<Element>;
        let tentivas: number = pm.tentativas;
        let timeout: number = pm.timeout;
        let waitTimeout: number = pm.waitTimeout;
        if (timeout == 0 || waitTimeout == 0) {
            waitTimeout = this.RandomNumber(1200, 600);
            timeout = this.RandomNumber(6000, 5000);
        }
        while (pm.tentativas > 0) {
            try {

                await pm.el.waitForSelector(pm.selector, {timeout: timeout});

                var element = await pm.el.$(pm.selector);
                if (!element) {
                    throw new ElementoNaoEncontradoException(pm.url);
                }
                await this.LogDev(element, true);

                result = element;

                break;
            } catch (e) {
                await this.LogDev("TryGetElement catch");
                await this.LogDev(e);
                tentivas -= 1;
                if (tentivas <= 0) {
                    this.GravarLog("tryGetElement", e);
                    throw e;
                }
                timeout += timeout;
                waitTimeout += waitTimeout;
            }
        }
        return result;
    }

    async TryGetElementList(pm: PuppeteerModel): Promise<ElementHandle<Element>[]> {
        await this.LogDev("TryGetElementList");
        await this.LogDev(pm);
        let resultList: ElementHandle<Element>[] = [];
        let tentivas: number = pm.tentativas;
        let timeout: number = pm.timeout;
        let waitTimeout: number = pm.waitTimeout;
        if (timeout == 0 || waitTimeout == 0) {
            waitTimeout = this.RandomNumber(1200, 600);
            timeout = this.RandomNumber(6000, 5000);
        }

        while (pm.tentativas > 0) {
            try {               
                await pm.el.waitForSelector(pm.selector, {timeout: timeout});

                var elementList = await pm.el.$$(pm.selector);
                if (!elementList) {
                    throw new ElementoNaoEncontradoException(pm.url);
                }

                resultList = elementList;

                break;
            } catch (e) {
                await this.LogDev("TryGetElementList catch");
                await this.LogDev(e);
                tentivas -= 1;
                if (tentivas <= 0) {
                    this.GravarLog("tryGetElementList", e);
                    throw e;
                }
                timeout += timeout;
                waitTimeout += waitTimeout;
            }
        }
        return resultList;
    }


    async GetInnerText(page: any, selector: string, timeout: number = 2000): Promise<string> {
        await this.LogDev("GetInnerText");
        await this.LogDev(selector);

        await page.waitForSelector(selector, {timeout: timeout});

        let element = await page.$(selector);

        await this.LogDev(element, true);
        return await page.evaluate((el : any) => el.textContent, element);
    }

    async GetElementByInnerText(page: Page, listaElementos: ElementHandle<Element>[], innerText: string): Promise<ElementHandle<Element>> {
        await this.LogDev("GetElementByInnerText");
        await this.LogDev(innerText);
        let buttonText: string;
        for (let element of listaElementos) {
            buttonText = await page.evaluate(el => el.textContent, element);
            if (buttonText.includes(innerText)) {
                return element;
            }
        }
        return null;
    }


    async SetInputValue(page: Page | Puppeteer.Frame, value: string, selector: string): Promise<void> {
        await this.LogDev("SetInputValue");
        await this.LogDev(selector);
        await page.evaluate((value, selector) => {
            let el: HTMLInputElement = document.getElementById(selector) as HTMLInputElement;
            el.value = String(value);

        }, value, selector);
    }

    async ResetBrowser(browser: Browser): Promise<Browser> {
        if (!browser || !browser.isConnected()) {
            return await this.GerarBrowser();
        }
        await browser.close();
        return await this.GerarBrowser();
    }

    async CloseOtherPages(browser: Browser, OpenPage: Page): Promise<void> {
        for(let page of await browser.pages()){
            if(await page.url() != await OpenPage.url()){
                await page.close();
            }
        }
    }


    async ResetPage(page: Page, browser: Browser): Promise<Page> {
        if (!page || page.isClosed()) {
            return await this.CreatePage(browser);
        }
        await page.close();
        return await this.CreatePage(browser);

    }

    async OpenPage(page: Page, browser: Browser): Promise<Page> {
        if (!page || page.isClosed()) {
            return await this.CreatePage(browser);
        }
        return page;
    }

    async ClosePage(page: Page): Promise<void> {
        if (page && !page.isClosed()) {
            await page.close();
        }
    }

    async CreatePage(browser: Browser): Promise<Page> {

        let page: Page = await browser.newPage();

        await page.setUserAgent(this.userAgent.toString())

        await page.setViewport(this.config.get("Resolucao"));



        return page;
    }

    async Log(mensagem: any, isElement: boolean = false): Promise<void> {
        let log = "";
        if (isElement) {
            let element_property = await mensagem.getProperty('innerHTML');
            let inner_html = await element_property.jsonValue();
            log = inner_html;
        } else {
            log = JSON.stringify(mensagem);
        }

        let today: string = this.GetDate();
        if (!fs.existsSync(this.logPath)) {
            fs.mkdir(this.logPath, function (error: any) { });
        }

        console.log("%c" + log + " - " + today, "color: orange");
        fs.appendFile(this.logPath + '//log.txt', "\r\n" + log + "\r\n" + today + "\r\n", function (error: any) { });


    }

    async LogSuccess(mensagem: any, isElement: boolean = false): Promise<void> {
        let log = "";
        if (isElement) {
            let element_property = await mensagem.getProperty('innerHTML');
            let inner_html = await element_property.jsonValue();
            log = inner_html;
        } else {
            log = JSON.stringify(mensagem);
        }

        let today: string = this.GetDate();
        if (!fs.existsSync(this.logPath)) {
            fs.mkdir(this.logPath, function (error: any) { });
        }

        console.log("%c" + log + " - " + today, "color: #008000");
        fs.appendFile(this.logPath + '//log.txt', "\r\n" + log + "\r\n" + today + "\r\n", function (error: any) { });


    }


    async LogError(mensagem: any, isElement: boolean = false): Promise<void> {
        let log = "";
        if (isElement) {
            let element_property = await mensagem.getProperty('innerHTML');
            let inner_html = await element_property.jsonValue();
            log = inner_html;
        } else {
            log = JSON.stringify(mensagem);
        }

        let today: string = this.GetDate();
        if (!fs.existsSync(this.logPath)) {
            fs.mkdir(this.logPath, function (error: any) { });
        }

        console.log("%c" + log + " - " + today, "color: #FF0000");
        fs.appendFile(this.logPath + '//log.txt', "\r\n" + log + "\r\n" + today + "\r\n", function (error: any) { });


    }

    async LogDev(mensagem: any, isElement: boolean = false): Promise<void> {
        if (this.config.get("IsDebug")) {
            let log = "";
            if (isElement) {
                let element_property = await mensagem.getProperty('innerHTML');
                let inner_html = await element_property.jsonValue();
                log = inner_html;
            } else {
                log = JSON.stringify(mensagem);
            }

            let today: string = this.GetDate();
            if (!fs.existsSync(this.logPath)) {
                fs.mkdir(this.logPath, function (error: any) { });
            }

            console.log(log);
            fs.appendFile(this.logPath + '//log.txt', "\r\n" + log + "\r\n" + today + "\r\n", function (error: any) { });
        }

    }

    GravarLogPrintScreen(page: Page, processo: string, ex: any): void {

        let today: string = this.GetDate();
        if (!fs.existsSync(this.logPath)) {
            fs.mkdir(this.logPath, function (error: any) { });
        }

        page.screenshot({ path: this.logPath + '//log.png' });

        fs.appendFile(this.logPath + '//log.txt', "\r\n" + processo + "\r\n" + today + "\r\n" + ex.message + "\r\n", function (error: any) { });
    }

    GravarLog(processo: string, ex: any): void {
        let today: string = this.GetDate();
        if (!fs.existsSync(this.logPath)) {
            fs.mkdir(this.logPath, function (error: any) { });
        }

        fs.appendFile(this.logPath + '//log.txt', "\r\n" + processo + "\r\n" + today + "\r\n" + ex.message + "\r\n", function (error: any) { });
    }

    async OpenBrowser(browser: Browser): Promise<Browser> {
        if (!browser || !browser.isConnected()) {
            return await this.GerarBrowser();
        }
        return browser;
    }

    async CloseBrowser(browser: Browser): Promise<void> {
        if (browser && browser.isConnected()) {
            await browser.close();
        }
    }

    async GerarBrowser(): Promise<Browser> {
        this.puppeteer = this.UsePuppeteer();

        return await this.puppeteer.launch({
            executablePath: this.config.get("ChromePath"),
            headless: false,
            userDataDir: this.config.get("ChromeUserPath"),
            args: ['--start-maximized']


        });
    }

    
    async autoScroll(page: any) : Promise<void>{
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                var totalHeight = 0;
                var distance = 100;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
    
                    if(totalHeight >= scrollHeight){
                        clearInterval(timer);
                        resolve(null);
                    }
                }, 100);
            });
        });
    }
    

    async OnProcessUnhandledRejection() {
        process.on('unhandledRejection', error => {
            console.log(error);
            this.GravarLog("UnhandledException", new UnhandledException(error));
            return;
        });
    }

    async GerarBrowserSemUsuario(): Promise<Browser> {
        this.puppeteer = this.UsePuppeteer();

        return await this.puppeteer.launch({
            executablePath: this.config.get("ChromePath"),
            headless: false
        });
    }

    async TypeWord(page: Page, word: string): Promise<void> {
        const splitWord = word.split('');
        splitWord.forEach(async key => {
            this.Sleep(300);
            await page.keyboard.press(key as Puppeteer.KeyInput)
        });
    };

    UsePuppeteer(): any {
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/chrome.app')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/chrome.csi')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/chrome.runtime')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/media.codecs')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/navigator.languages')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/navigator.permissions')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/navigator.plugins')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/navigator.vendor')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/navigator.webdriver')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/sourceurl')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/user-agent-override')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/webgl.vendor')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/window.outerdimensions')());
        this.puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/defaultArgs')());
        this.puppeteer.use(require('puppeteer-extra-plugin-user-preferences')());
        this.puppeteer.use(require('puppeteer-extra-plugin-user-data-dir')());

        var stealthPlugin = StealthPlugin();
        this.puppeteer.use(stealthPlugin);

        return this.puppeteer;
    }

}