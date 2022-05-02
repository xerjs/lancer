import { assert } from "chai";
import { NumBox, getContainer } from "./def";

describe("num schema", () => {
    const container = getContainer();

    before(() => {
        container.initialize([NumBox]);
    });

    it("resolve commder;expect=ok", () => {
        const strs = "--id 123 xx num".split(" ");
        const cmd = container.getCommander(strs) as NumBox;
        assert.ok(cmd);
        assert.ok(cmd instanceof NumBox);
        assert.deepEqual(cmd.sourceArgs, ["xx", "num"]);
        assert.equal(cmd.id, 123);
    });

    it("resolve commder;iput=float;expect=err", () => {
        const strs = "--id 1.23 xx num".split(" ");
        assert.throw(() => container.getCommander(strs), " must be integer");
    });
});
