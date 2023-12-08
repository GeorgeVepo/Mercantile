import { Exception } from "../utils/exceptions/Exception";

//module exports para oder usar em outras partes
export class AlarmeMessageException implements Exception {

    message: string;
    name: string;
    
    constructor() {
        this.message = "Confirmação não ocorreu";
        this.name = "AlarmeMessageException";
     }
}