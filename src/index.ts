import { Avalon, ClassType } from "@xerjs/avalon";
import { valueMeta } from "./decorator";
import { Commander } from "./types";
import { CmdMeta } from "./utils";


export class Lancer extends Avalon {
    initialize(servs: ClassType[]) {
        super.initialize(servs);
    }

    protected findCmd(name: string): ClassType {
        for (const ctr of this.allClass) {
            const dd = CmdMeta(ctr);
            if (dd?.cmd === name) {
                return ctr;
            }
        }
        throw new Error(`resolve ${name} error`);
    }

    getCommander(args: string[]): Commander {
        const argv = require("minimist")(args);
        const names: string[] = argv._.length ? argv._ : [];
        const svcCmd = this.findCmd(names[0] || "");
        const cmder: Commander = this.resolve(svcCmd);
        cmder.sourceArgs = names;

        this.assignValue(svcCmd, cmder);

        return cmder;
    }

    assignValue(svc: ClassType, instance: any): void {
        for (const { key, value } of valueMeta(svc.prototype).values()) {
            if (typeof instance[key] === "undefined") {
                instance[key] = value;
            }
        }

    }
}

export * from "./types";
export { Cmd, alias, value } from "./decorator";
export { required } from "./schema";
