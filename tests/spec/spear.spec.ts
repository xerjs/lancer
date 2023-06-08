import { assert } from "chai";
import { Cmd, Commander, field, alias, Spear } from "../../src";

import { AvalonContainer, Provider } from "@xerjs/avalon";

@Cmd()
@Provider()
export class Cat implements Commander {
    async execute(): Promise<void> {
        console.log("cat execute %j", this);
    }
    sourceArgs!: string[];

    @field({ arg: "." })
    head!: number;

    @field({ arg: "." })
    input?: string;

    @alias("input")
    in!: string;
}

function parseArgv(ss: string): any {
    return require("minimist")(ss.split(" "));
}

describe("lancer spear", () => {
    const spear = AvalonContainer.root.resolve(Spear);
    const cat = AvalonContainer.root.resolve(Cat);

    it("spear info", () => {
        const info = spear.info(cat);
        assert.deepEqual([...info.keys()], ["head", "input", "in"]);
        assert.equal(info.get("input"), "in");
    });
    it("spear parse", () => {
        spear.parse(cat, parseArgv("--head 5 --input abc x y z"));

        assert.equal(cat.input, "abc");
        assert.equal(cat.in, "abc");
        assert.equal(cat.head, 5);
        assert.deepEqual(cat.sourceArgs, ["x", "y", "z"]);
    });
});
