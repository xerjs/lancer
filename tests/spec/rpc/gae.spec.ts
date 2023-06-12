import { AvalonContainer, Provider } from "@xerjs/avalon";
import { GaeMaster, rpc, rpcFun } from "../../../src";
import { assert } from "chai";

interface RcpDef {
    say(): Promise<void>;

    now(): Promise<number>;

    info(): Promise<{ id: string; version: string }>;
}

const perfix = "http://127.0.0.1";

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

        const pars = Object.fromEntries(list.map((e) => [e.name, e.pars]));
        assert.deepEqual(pars, { say: [], now: [], info: [] });

        const path = Object.fromEntries(list.map((e) => [e.name, e.path]));
        assert.deepEqual(path, { say: "/RpcCli/say", now: "/RpcCli/now", info: "/RpcCli/info" });
    });

    it("info axios", () => {
        const list = master.info(RpcCli);
        const ins = master.transAxios(list);
        for (const [mm, fn] of Object.entries(ins)) {
            const conf = fn({ a: 1 });

            assert.deepEqual(conf.data.args, [{ a: 1 }]);
            assert.equal(conf.method, "POST");
            assert.hasAllKeys(conf.params, ["_t"]);
            assert.equal(conf.url, `/RpcCli/${mm}`);
        }
    });
});
