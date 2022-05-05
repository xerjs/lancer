import { assert } from "chai";
import { Dox, getContainer } from "./def";

describe("lancer base", () => {
    const container = getContainer();
    before(() => {
        container.initialize([Dox]);
    });

    it("resolve commder", () => {
        const strs = "--y0 3 --y1 4 --can".split(" ");
        const cmd = container.getCommander(strs);
        assert.ok(cmd);
        assert.ok(cmd instanceof Dox);
        assert.deepEqual(cmd.sourceArgs, []);
    });

    it("set value", () => {
        const strs = "--y0 3 --y1 4 --can".split(" ");
        const cmd = container.getCommander(strs) as Dox;
        assert.ok(cmd);
        assert.ok(cmd instanceof Dox);
        assert.equal(cmd.input, "input");
        assert.equal(cmd.input2, "input2");
        assert.ok(cmd.can);
    });

    it("reqired err", () => {
        const args = "--y1 4".split(" ");
        assert.throw(() => container.getCommander(args), "required property 'y0'");
    });

    it("set alias;expect=i", () => {
        const strs = "--y0 3 --y1 4 --input abc".split(" ");
        const cmd = container.getCommander(strs) as Dox;
        assert.ok(cmd);
        assert.equal(cmd.i, cmd.input);
    });

    it("set alias;expect=input", () => {
        const strs = "--y0 3 --y1 4 -i abc".split(" ");
        const cmd = container.getCommander(strs) as Dox;
        assert.ok(cmd);
        assert.equal(cmd.i, cmd.input);
    });

    it("set alias;expect=error", () => {
        const strs = "--y1 4".split(" ");
        assert.throw(() => container.getCommander(strs), "required property 'y0'");
    });
});
