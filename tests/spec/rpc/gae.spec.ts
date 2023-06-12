import { AvalonContainer, Provider } from "@xerjs/avalon";
import { GaeMaster, rpc, rpcFun } from "../../../src";
import { assert } from "chai";

interface RcpDef {
    say(): Promise<void>;

    now(): Promise<number>;

    info(): Promise<{ id: string; version: string }>;
}

@Provider()
@rpc()
class RpcCli implements RcpDef {
    @rpcFun()
    say(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    @rpcFun()
    now(): Promise<number> {
        throw new Error("Method not implemented.");
    }

    @rpcFun()
    info(): Promise<{ id: string; version: string }> {
        throw new Error("Method not implemented.");
    }
}

describe("lance gae master", () => {
    const master = AvalonContainer.root.resolve(GaeMaster);

    it("info base", () => {
        const list = master.info(RpcCli);
        const res = Object.fromEntries(list.map((e) => [e.name, e.pars]));

        assert.deepEqual(res, { say: [], now: [], info: [] });
    });
});
