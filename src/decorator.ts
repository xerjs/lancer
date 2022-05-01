/* eslint-disable @typescript-eslint/naming-convention */

import "reflect-metadata";
import { Provider, ClassType } from "@xerjs/avalon";
import { META_KEY, META_DEF } from "./consts";
import { ValueMetaDef } from "./types";

export function Cmd(name: string, ext?: ClassType): ClassDecorator {
    return (target) => {
        Provider({ ext })(target);
        Reflect.defineMetadata(META_KEY.cmd, { cmd: name }, target);
    };
}


export function alias<T>(long: keyof T): PropertyDecorator {
    return (target: Object, key: string | symbol) => {
        const k = META_DEF.alias(key as string);
        Reflect.defineMetadata(k, { key, alias: long, }, target);
    };
}

export function value(set: unknown): PropertyDecorator {
    return (target: Object, key: string | symbol) => {
        const k = META_DEF.value(key as string);
        Reflect.defineMetadata(k, { key, value: set }, target);
    };
}

/**
 * valueMeta
 * @param target property
 */
export function valueMeta(target: object): Map<string, ValueMetaDef> {
    const mm = new Map<string, ValueMetaDef>();
    for (const longKey of Reflect.getMetadataKeys(target) as string[]) {
        const propertyKey = META_DEF.valueMatch(longKey);
        if (propertyKey) {
            mm.set(propertyKey, Reflect.getMetadata(longKey, target));
        }
    }
    return mm;
}