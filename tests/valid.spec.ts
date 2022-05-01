import { assert } from "chai";
import { Dox, getContainer } from "./def";

describe("lancer base", () => {
    const container = getContainer();
    const strs = "--y0 3 --y1 4".split(" ");

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
        assert.equal(cmd.input2, "input2");
    });
});
