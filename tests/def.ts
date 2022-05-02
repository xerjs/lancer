import { Cmd, value, Commander, Lancer, required, property, length, pattern } from "../src";

@Cmd("")
export class Dox implements Commander {
    constructor() { }

    args!: string[];
    sourceArgs!: string[];

    @value("input")
    input!: string;

    @value("input2")
    input2!: string;

    @property()
    can!: boolean;

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

@Cmd("str")
export class StrBox implements Commander {
    execute(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    args!: string[];
    sourceArgs!: string[];

    @length({ min: 3 })
    input!: string;

    @pattern("^lx\\w+0")
    name!: string;
}