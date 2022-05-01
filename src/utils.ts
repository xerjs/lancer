/* eslint-disable @typescript-eslint/naming-convention */

import { ClassType } from "@xerjs/avalon";
import { META_KEY } from "./consts";
import Ajv, { ErrorObject } from "ajv";


const ajv = new Ajv();

export function CmdMeta(ctr: ClassType): { cmd: string; } {
    return Reflect.getMetadata(META_KEY.cmd, ctr);
}

export function schemaMatch(schema: any, obj: any): ErrorObject | undefined {
    const validateFn = ajv.compile(schema);
    if (!validateFn(obj) && validateFn.errors) {
        return validateFn.errors[0];
    }
}