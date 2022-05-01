/* eslint-disable @typescript-eslint/naming-convention */

import "reflect-metadata";
import { Provider, ClassType, designType } from "@xerjs/avalon";
import { META_KEY, META_DEF, propertyMatch } from "./consts";
import { Types, ValueMetaDef } from "./types";

export function Cmd(name: string, ext?: ClassType): ClassDecorator {
    return (target) => {
        Provider({ ext })(target);
        Reflect.defineMetadata(META_KEY.cmd, { cmd: name }, target);
    };
}

export function property(): PropertyDecorator {
    return (target: Object, key: string | symbol) => {
        const k = META_KEY.property(key as string);
        return Reflect.defineMetadata(k, key, target);
    };
}

export function alias<T>(long: keyof T): PropertyDecorator {
    return (target: Object, key: string | symbol) => {
        property()(target, key);
        const k = META_DEF.alias(key as string);
        return Reflect.defineMetadata(k, { key, alias: long, }, target, key);
    };
}

export function value(set: unknown): PropertyDecorator {
    return (target: Object, key: string | symbol) => {
        property()(target, key);
        const k = META_DEF.value(key as string);
        return Reflect.defineMetadata(k, { key, value: set }, target, key);
    };
}

/**
 * valueMeta
 * @param target property
 */
export function valueMeta(target: object): Map<string, ValueMetaDef> {
    const mm = new Map<string, ValueMetaDef>();
    for (const metaKey of Reflect.getMetadataKeys(target) as string[]) {
        const propertyKey = propertyMatch(metaKey);
        if (propertyKey) {
            const longKey = META_DEF.value(propertyKey);
            const vv = Reflect.getMetadata(longKey, target, propertyKey);
            if (vv) mm.set(propertyKey, vv);
        }
    }
    return mm;
}

export function typeMeta(target: object): Map<string, ClassType> {
    const mm = new Map<string, ClassType>();
    for (const metaKey of Reflect.getMetadataKeys(target) as string[]) {
        const propertyKey = propertyMatch(metaKey);
        if (propertyKey) {
            const tt = designType(target, propertyKey);
            if (tt) mm.set(propertyKey, tt);
        }
    }
    return mm;
}
