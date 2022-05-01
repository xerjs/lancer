import { assert } from "chai";
import { Dox, getContainer } from "./def";

describe("lancer base", () => {
    const container = getContainer();
    const strs = "-x 3 -y 4 -n5 -abc --beep=boop".split(" ");

    before(() => {
        container.initialize([Dox]);
    });

    it("resole commder", () => {
        const cmd = container.getCommander(strs);
        assert.ok(cmd);
        assert.ok(cmd instanceof Dox);
        assert.deepEqual(cmd.sourceArgs, []);
    });

    it("set value", () => {
        const cmd = container.getCommander(strs) as Dox;
        assert.ok(cmd);
        assert.ok(cmd instanceof Dox);
        assert.equal(cmd.input, "input");
    });
});
