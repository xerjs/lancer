import { Provider, ClassType, AvalonContainer } from "@xerjs/avalon";
import { FunOpt, RpcOpt, rpcMeta } from "./decorator";
import axios, { Axios, AxiosRequestConfig } from "axios";
import { MethodInfo } from "./types";
import { AxiosTrans } from "./trans";

@Provider()
export class GaeMaster {
    constructor(protected trans: AxiosTrans) {}

    info(cls: ClassType): MethodInfo[] {
        const clsMeta = rpcMeta.classValue(cls) as RpcOpt;
        const root = clsMeta.path || cls.name;

        const infos: MethodInfo[] = rpcMeta.propertyKeys(cls).map((mk) => {
            const res = rpcMeta.returnType(cls, mk);
            const pars = rpcMeta.paramTypes(cls, mk);
            const mMate = rpcMeta.propertyValue(cls, mk) as FunOpt;
            let path = mMate.path || mk;
            if (path === ".") {
                path = mk;
            }
            return { name: mk, res, pars, path: `/${root}/${path}` };
        });

        return infos;
    }

    resolveAxiosConf(infos: MethodInfo[]) {
        return this.trans.wrap(infos);
    }

    createAdapter<T>(cls: ClassType<T>, sender: Axios): T {
        const ins = AvalonContainer.root.resolve(cls);
        const conf = this.trans.wrap(this.info(cls));

        this.trans.install(conf, ins, sender);
        return ins;
    }
}
