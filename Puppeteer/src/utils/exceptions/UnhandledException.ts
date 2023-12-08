import { Exception } from "./Exception";

//module exports para oder usar em outras partes
export class UnhandledException implements Exception {

    message: string;
    name: string;

    constructor(message: any) {
        this.message = String(message);
        this.name = "UnhandledException";
    }
}