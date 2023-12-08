import { Exception } from "./Exception";

//module exports para oder usar em outras partes
export class ElementoNaoEncontradoException implements Exception {

    message: string;
    name: string;

    constructor(site: string) {
        this.message = "Erro ao obter dados do site " + site + ".";
        this.name = "ElementoNaoEncontradoException";
    }
}