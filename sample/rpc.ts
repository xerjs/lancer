import { AvalonContainer, Provider } from "@xerjs/avalon";
import { GaeMaster, rpc, rpcFun } from "../src";
import axios, { isAxiosError } from "axios";

interface RcpDef {
    say(): Promise<void>;

    now(): Promise<number>;
    add(a: number, b: number): Promise<number>;

    info(): Promise<{ id: string; version: string }>;
}

@Provider()
@rpc()
class RpcCli implements RcpDef {
    @rpcFun()
    add(a: number, b: number): Promise<number> {
        throw new Error("Method not implemented.");
    }
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

async function main() {
    const master = AvalonContainer.root.resolve(GaeMaster);
    const baseURL = "http://127.0.0.1:1009/no";
    const ins = axios.create({ baseURL });
    const imp = master.createAdapter(RpcCli, ins);

    imp.say().catch((error) => {
        if (isAxiosError(error)) {
            const { config } = error;
            console.log(config?.data);
        }
    });

    imp.add(1, 2).catch((error) => {
        if (isAxiosError(error)) {
            const { config } = error;
            console.log(config?.data);
        }
    });
}

process.nextTick(main);
