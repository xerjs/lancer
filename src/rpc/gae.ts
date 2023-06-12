import { Provider, ClassType } from "@xerjs/avalon";
import { rpcMeta } from "./decorator";

interface MethodInfo {
    res: unknown;
    pars: unknown[];
    name: string;
}

@Provider()
export class GaeMaster {
    info(cls: ClassType): MethodInfo[] {
        const infos: MethodInfo[] = rpcMeta.propertyKeys(cls).map((mk) => {
            const res = rpcMeta.returnType(cls, mk);
            const pars = rpcMeta.paramTypes(cls, mk);
            return { name: mk, res, pars };
        });

        return infos;
    }

    create<T>(cls: ClassType<T>): T {
        throw new Error("Method not implemented.");
    }
}
