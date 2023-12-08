import { Exception } from "../utils/exceptions/Exception.js";

//module exports para oder usar em outras partes
export class ConfirmacaoException implements Exception {

    message: string;
    name: string;
    
    constructor() {
        this.message = "Confirmação não ocorreu";
        this.name = "ConfirmacaoException";
     }
}