import { Provider } from "@xerjs/avalon";
import { Commander, Argv } from "./types";
import { spearMeta } from "./decorator";
import { ZodTypeAny, z } from "zod";

function parseArgv(): Argv {
    return require("minimist")(process.argv.slice(2));
}

interface MetaMix {
    input: string;
    zt?: ZodTypeAny;
    alias: string;
}

const simpleParser = new Map<any, ZodTypeAny>([
    [String, z.string()],
    [Number, z.number()],
]);

@Provider()
export class Spear {
    parse<T extends Commander>(cmd: T, argv?: Argv): void {
        argv = argv || parseArgv();
        cmd.sourceArgs = argv._;
        this.parseField(cmd, argv);
        this.parseAlias(cmd);
    }

    parseField(cmd: Commander, argv: Argv) {
        const cls = cmd.constructor;
        const mk = spearMeta.propertyKeys(cls);
        for (const pk of mk) {
            const meta = spearMeta.propertyValue(cls, pk) as MetaMix;
            if (meta.input) {
                const argKey = meta.input === "." ? pk : meta.input;
                const t = spearMeta.propertyType(cls, pk);
                const zType = meta.zt || simpleParser.get(t)!;
                const inputVal = argv[argKey];
                const res = zType.safeParse(inputVal);
                if (!res.success) {
                    throw new Error(`input [${argKey}]: ${t.name} [${inputVal}]`);
                }
                Object.assign(cmd, { [pk]: inputVal });
            }
        }
    }

    parseAlias(cmd: Commander) {
        const cls = cmd.constructor;
        const mk = spearMeta.propertyKeys(cls);
        for (const pk of mk) {
            const meta = spearMeta.propertyValue(cls, pk) as MetaMix;
            if (meta.alias) {
                const argVal = this._get(cmd, meta.alias);
                Object.assign(cmd, { [pk]: argVal });
            }
        }
    }

    _get(obj: any, k: string) {
        return obj[k];
    }

    info(cmd: Commander): Map<string, any> {
        const cls = cmd.constructor;
        const mk = spearMeta.propertyKeys(cls);
        const res = new Map<string, any>();
        for (const pk of mk) {
            const meta = spearMeta.propertyValue(cls, pk) as MetaMix;
            if (meta.input) {
                const t = spearMeta.propertyType(cls, pk);
                res.set(meta.input, t);
            }
            if (meta.alias) {
                res.set(meta.alias, pk);
                res.set(pk, spearMeta.propertyType(cls, pk));
            }
        }

        return res;
    }
}
