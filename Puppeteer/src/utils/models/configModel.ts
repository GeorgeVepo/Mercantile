//module exports para oder usar em outras partes
export class ConfigModel {

    values: { key: string, value: any }[];

    get(key: string) : any{
        return this.values.find(v => v.key == key).value
    }

    constructor(config: any){
        this.values = config.values;
    }    

}