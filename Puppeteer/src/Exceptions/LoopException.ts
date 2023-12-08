import { Exception } from "../utils/exceptions/Exception.js";

//module exports para oder usar em outras partes
export class LoopException implements Exception {

    message: string;
    name: string;
    
    constructor() {
        this.message = "Entrou em loop";
        this.name = "LoopException";
     }
}