import { assert } from "chai";
import { StrBox, getContainer } from "./def";

describe("string schema", () => {
    const container = getContainer();

    before(() => {
        container.initialize([StrBox]);
    });

    it("resolve commder;expect=ok", () => {
        const strs = "--input abc --name lxAA0 str".split(" ");
        const cmd = container.getCommander(strs) as StrBox;
        assert.ok(cmd);
        assert.ok(cmd instanceof StrBox);
        assert.deepEqual(cmd.sourceArgs, ["str"]);
    });
});
