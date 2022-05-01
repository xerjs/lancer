import { assert } from "chai";
import { Dox, getContainer } from "./def";

describe("lancer base", () => {
    const container = getContainer();
    before(() => {
        container.initialize([Dox]);
    });

    it("resole commder", () => {
        const str = "-x 3 -y 4 -n5 -abc --beep=boop".split(" ");
        const cmd = container.getCommander(str);
        assert.ok(cmd);
        assert.ok(cmd instanceof Dox);
    });
});
