import { Avalon, ClassType } from "@xerjs/avalon";
import { Commander } from "./types";
import { CmdMeta } from "./utils";


export class Lancer extends Avalon {
    initialize(servs: ClassType[]) {
        super.initialize(servs);
    }

    protected resolveCmd(name: string): Commander {
        for (const ctr of this.allClass) {
            const dd = CmdMeta(ctr);
            if (dd?.cmd === name) {
                return this.resolve<Commander>(ctr);
            }
        }
        throw new Error(`resolve ${name} error`);
    }

    getCommander(args: string[]): Commander {
        const argv = require("minimist")(args);
        const name: string[] = argv._.length ? argv._ : [];
        const cmder = this.resolveCmd(name[0] || "");

        return cmder;
    }
}

export * from "./types";
export { Cmd, alias, value } from "./decorator";
