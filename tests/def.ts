import { Cmd, alias, value, Commander, Lancer, required } from "../src";

@Cmd("")
export class Dox implements Commander {
    constructor() { }

    args!: string[];
    sourceArgs!: string[];

    @alias<Dox>("name")
    readonly x!: string;

    @value("xname")
    name!: string;

    @value("input")
    input!: string;

    @alias<Dox>("input")
    @required()
    y!: number;

    async execute() {

    }
}

export function getContainer() {
    return new Lancer();
}
