import { Cmd, value, Commander, Lancer, required, property } from "../src";

import { readFile } from "fs/promises";
import * as assert from "assert";


@Cmd("")
export class Cat implements Commander {
    async execute(): Promise<void> {
        const txt = await readFile(this.input, { encoding: "utf-8" });
        if (!this.head) {
            return console.log(txt);
        }
        txt.split("\n").forEach((line, i) => {
            if (i < this.head) {
                console.log(line);
            }
        });
    }
    sourceArgs!: string[];

    @property("integer")
    head!: number;

    @required()
    input!: string;
}

function main() {
    const ava = new Lancer();
    ava.initialize([Cat]);
    const cmd = ava.getCommander(process.argv.slice(2));
    assert.ok(cmd);
    cmd.execute();
}

process.nextTick(main);