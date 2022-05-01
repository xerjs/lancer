/* eslint-disable @typescript-eslint/naming-convention */

import "reflect-metadata";
import { Provider, ClassType } from "@xerjs/avalon";
import { META_KEY } from "./consts";

export function Cmd(name: string): ClassDecorator {
    return (target) => {
        Provider();
        Reflect.defineMetadata(META_KEY.cmd, { cmd: name }, target);
    };
}

export function CmdMeta(ctr: ClassType): { cmd: string } {
    return Reflect.getMetadata(META_KEY.cmd, ctr);
}