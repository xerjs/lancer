import { assert } from "chai";
import { Dox, getContainer } from "./def";

describe("lancer base", () => {
    const container = getContainer();
    const strs = "--y0 3 --y1 4 --can".split(" ");
    before(() => {
        container.initialize([Dox]);
    });

    it("resolve commder", () => {
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
        assert.ok(cmd.can);
    });

    it("reqired err", () => {
        const args = "--y1 4 --can".split(" ");
        assert.throw(() => container.getCommander(args), "required");
    });
});
