import { Exception } from "./Exception";

//module exports para oder usar em outras partes
export class ReCaptchaException implements Exception {

    message: string;
    name: string;

    constructor() {
        this.message = "ReCaptchaException ativado no site.";
        this.name = "ReCaptchaException";
    }
}