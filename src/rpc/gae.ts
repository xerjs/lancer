import { Provider, ClassType, AvalonContainer } from "@xerjs/avalon";
import { FunOpt, RpcOpt, rpcMeta } from "./decorator";
import axios, { Axios, AxiosRequestConfig } from "axios";
import { date, object } from "zod";

interface MethodInfo {
    res: unknown;
    pars: unknown[];
    name: string;
    path: string;
}

@Provider()
export class GaeMaster {
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

    createAdapter<T>(cls: ClassType<T>): T {
        const ins = AvalonContainer.root.resolve(cls);
        const trans = this.transAxios(this.info(cls));
        this.sendAxios(trans, ins);
        return ins;
    }

    transAxios(infos: MethodInfo[]): Record<string, Function> {
        const trans: any = {};

        for (const info of infos) {
            const method = (...args: any): AxiosRequestConfig => {
                return {
                    url: info.path,
                    params: { _t: Math.random() },
                    data: { args },
                    method: "POST",
                    headers: { "User-Agent": "@xerjs/lancer rpc gae" },
                };
            };

            Object.assign(trans, { [info.name]: method });
        }

        return trans;
    }

    sendAxios(fns: Record<string, Function>, instance: unknown): void {
        for (const [method, fn] of Object.entries(fns)) {
            const call = (...args: any) => {
                axios(fn(...args));
            };
            Object.assign(instance as object, { [method]: call });
        }
    }
}
