import { Exception } from "../utils/exceptions/Exception.js";

//module exports para oder usar em outras partes
export class TelegramDadosException implements Exception {

    message: string;
    name: string;
    
    constructor() {
        this.message = "Erro ao obter dados do telegram.";
        this.name = "TelegramDadosException";
     }
}