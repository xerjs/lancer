import { Cmd, alias, value, Commander, Lancer } from "../src";

@Cmd("")
export class Dox implements Commander {
    constructor() { }
    @alias<Dox>("name")
    readonly x!: string;

    @value("xname")
    name!: string;

    input!: number;

    async execute() {

    }
}

export function getContainer() {
    return new Lancer();
}
