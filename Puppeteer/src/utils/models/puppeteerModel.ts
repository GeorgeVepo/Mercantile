import { ElementHandle, Frame, Page } from "puppeteer";

//module exports para oder usar em outras partes
export class PuppeteerModel {

    private _el: any; 
    private _url: string;
    private _selector: string;
    private _tentativas: number;
    private _waitTimeout: number;
    private _timeout: number;

    constructor(el: any, url: string, selector: string, tentativas: number = 3, waitTimeout: number = 0, timeout: number = 0) {
        this._el = el;
        this._url = url;
        this._selector = selector;
        this._tentativas = tentativas;
        this._waitTimeout = waitTimeout;
        this._timeout = timeout;
    }

    public get el(): any {
        return this._el;
    }
    public get url(): any {
        return this._url;
    }
    public get selector(): any {
        return this._selector;
    }
    public get tentativas(): any {
        return this._tentativas;
    }
    public get waitTimeout(): any {
        return this._waitTimeout;
    }
    public get timeout(): any {
        return this._timeout;
    }

}