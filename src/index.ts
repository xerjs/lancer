import { Avalon, ClassType } from "@xerjs/avalon";
import { typeMeta, valueMeta } from "./decorator";
import { requiredMeta, lengthMeta, patternMeta, propertyMeta, rangeMeta } from "./schema";
import { Commander } from "./types";
import { CmdMeta, schemaMatch } from "./utils";


export class Lancer extends Avalon {
    initialize(servs: ClassType[]) {
        super.initialize(servs);
    }

    protected findCmd(names: string[]): ClassType {
        const ss = new Set(names);
        ss.add("");
        for (const name of ss) {
            for (const ctr of this.allClass) {
                const dd = CmdMeta(ctr);
                if (dd?.cmd === name) {
                    return ctr;
                }
            }
        }
        throw new Error(`cant resolve any ${names.join("/")}`);
    }

    getCommander(args: string[]): Commander {
        const argv = require("minimist")(args);
        const names: string[] = argv._.length ? argv._ : [];
        const svcCmd = this.findCmd(names);

        this.checkSchema(svcCmd, argv);
        const cmder: Commander = this.resolve(svcCmd);
        Object.assign(cmder, argv); //赋值字段

        cmder.sourceArgs = names;
        this.assignValue(svcCmd, cmder);
        return cmder;
    }

    checkSchema(svc: ClassType, argv: unknown) {
        const required: string[] = [];
        const properties: any = {};
        requiredMeta(svc.prototype).forEach((v) => v.required ? required.push(v.key) : 0);

        typeMeta(svc.prototype).forEach((v, k) => {
            switch (v) {
                case String:
                    properties[k] = { type: "string" };
                    this.stringSchema(svc, k, properties[k]);
                    break;
                case Number:
                    if (propertyMeta(svc.prototype, k) === "integer") {
                        properties[k] = { type: "integer" };
                    }
                    else {
                        properties[k] = { type: "number" };
                    }
                    this.numberSchema(svc, k, properties[k]);
                    break;
                case Boolean:
                    properties[k] = { type: "boolean" };
                    break;
                default:
                    break;
            }
        });

        const err = schemaMatch({ type: "object", required, properties }, argv);
        if (err) {
            throw new Error(err.instancePath + ": " + err.message);
        }
    }

    stringSchema(svc: ClassType, k: string, field: object): void {
        const len = lengthMeta(svc.prototype, k);
        if (len) {
            const { maxLength, minLength } = len;
            Object.assign(field, { maxLength, minLength });
        }
        const pattern = patternMeta(svc.prototype, k);
        if (pattern) {
            Object.assign(field, { pattern: pattern.value });
        }
    }

    numberSchema(svc: ClassType, k: string, field: object): void {
        const range = rangeMeta(svc.prototype, k);
        if (range) {
            const { maximum, minimum } = range;
            Object.assign(field, { maximum, minimum });
        }
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
export * from "./schema";
