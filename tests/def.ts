import { Cmd, alias, value, Commander, Lancer, required } from "../src";

@Cmd("")
export class Dox implements Commander {
    constructor() { }

    args!: string[];
    sourceArgs!: string[];

    @value("xname")
    name!: string;

    @value("input")
    input!: string;

    @value("input2")
    input2!: string;

    @required()
    y0!: number;

    @required()
    y1!: number;

    async execute() {

    }
}

export function getContainer() {
    return new Lancer();
}
