import { Provider, MetaUtil } from "@xerjs/avalon";

export const rpcMeta = new MetaUtil("lancer.rpc");

type RpcOpt = {
    trans: string;
};
export const rpc = rpcMeta.classDecorator<RpcOpt>((x) => {
    x = x || {};
    x.trans = x.trans || "axios";
    return x;
});

type FunOpt = {
    fun: string;
};
export const rpcFun = rpcMeta.propertyDecorator<FunOpt>((x) => {
    x = x || {};
    x.fun = ".";
    return x;
});
