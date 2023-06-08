import { assert } from "chai";
import { NumBox, getContainer } from "./def";

describe.skip("num schema", () => {
    const container = getContainer();

    before(() => {
        container.initialize([NumBox]);
    });

    it("resolve NumBox;expect=ok", () => {
        const strs = "--id 123 --age 31 xx num".split(" ");
        const cmd = container.getCommander(strs) as NumBox;
        assert.ok(cmd);
        assert.ok(cmd instanceof NumBox);
        assert.deepEqual(cmd.sourceArgs, ["xx", "num"]);
        assert.equal(cmd.id, 123);
        assert.equal(cmd.age, 31);
    });

    it("resolve NumBox;iput=float;expect=err", () => {
        const strs = "--id 1.23 xx num".split(" ");
        assert.throw(() => container.getCommander(strs), "must be integer");
    });

    it("resolve NumBox;iput=age;expect=err", () => {
        let strs = "--age 1 xx num".split(" ");
        assert.throw(() => container.getCommander(strs), "must be >=");

        strs = "--age 81 xx num".split(" ");
        assert.throw(() => container.getCommander(strs), "must be <=");

        strs = "--age 21.1 xx num".split(" ");
        assert.throw(() => container.getCommander(strs), "must be integer");
    });
});
