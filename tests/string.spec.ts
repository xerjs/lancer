import { assert } from "chai";
import { StrBox, getContainer } from "./def";

describe("string schema", () => {
    const container = getContainer();

    before(() => {
        container.initialize([StrBox]);
    });

    it("resolve StrBox;expect=ok", () => {
        const strs = "--input abc --name lxAA0 ab str".split(" ");
        const cmd = container.getCommander(strs) as StrBox;
        assert.ok(cmd);
        assert.ok(cmd instanceof StrBox);
        assert.deepEqual(cmd.sourceArgs, ["ab", "str"]);
    });

    it("resolve StrBox;input=2str;expect=error", () => {
        const strs = "--input ab str".split(" ");
        const msg = "must NOT have fewer than";
        assert.throw(() => container.getCommander(strs), msg);
    });

    it("resolve StrBox;input=6str;expect=error", () => {
        const strs = "--input abv123 str".split(" ");
        const msg = "must NOT have more than";
        assert.throw(() => container.getCommander(strs), msg);
    });

    it("resolve StrBox;input=name;expect=error", () => {
        const strs = "--name err str".split(" ");
        const msg = "must match pattern";
        assert.throw(() => container.getCommander(strs), msg);
    });
});
