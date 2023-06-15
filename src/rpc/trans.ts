import { Axios, AxiosRequestConfig } from "axios";
import { MethodInfo, Trans } from "./types";
import { Provider } from "@xerjs/avalon";

@Provider()
export class AxiosTrans implements Trans {
    install(fns: Record<string, Function>, imp: any, sender: Axios): void {
        for (const [method, fn] of Object.entries(fns)) {
            const call = async (...args: any) => {
                const conf = fn(...args);
                const { data } = await sender.post(conf.url, conf.data, conf);
                return data;
            };
            Object.assign(imp, { [method]: call });
        }
    }

    wrap(infos: MethodInfo[]): Record<string, Function> {
        const trans: any = {};

        for (const info of infos) {
            const method = (...args: any): AxiosRequestConfig => {
                return {
                    url: info.path,
                    params: { _t: Math.random() },
                    data: { args },
                    headers: { "User-Agent": "@xerjs/lancer rpc gae" },
                };
            };

            Object.assign(trans, { [info.name]: method });
        }

        return trans;
    }
}
