/* eslint-disable @typescript-eslint/naming-convention */

import { ClassType } from "@xerjs/avalon";
import { META_KEY } from "./consts";

export function CmdMeta(ctr: ClassType): { cmd: string } {
    return Reflect.getMetadata(META_KEY.cmd, ctr);
}