import { Exception } from "../utils/exceptions/Exception.js";

//module exports para oder usar em outras partes
export class PaginaComErroException implements Exception {

    message: string;
    name: string;
    
    constructor() {
        this.message = "Pagina de aposta com erro.";
        this.name = "PaginaComErroException";
     }
}