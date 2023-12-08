import { Exception } from "./Exception";

//module exports para oder usar em outras partes
export class RestartarProcessoException implements Exception {

    message: string;
    name: string;

    constructor() {
    }
}