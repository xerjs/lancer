/* eslint-disable @typescript-eslint/naming-convention */

import { Provider, MetaUtil } from "@xerjs/avalon";
import { META_KEY, META_DEF, propertyMatch } from "./consts";
import { AliasMetaDef, ValueMetaDef } from "./types";
import { property } from "./schema";
import { ZodTypeAny, z } from "zod";

const zString = z.string();
const zNumber = z.number();
const zInt = z.number().int();

export const spearMeta = new MetaUtil("lancer");

type FieldOpt = { arg: string; zt?: ZodTypeAny };

export const field = spearMeta.propertyDecorator<FieldOpt>((opt) => {
    z.object({ arg: zString }).parse(opt);
    return opt;
});

export const Cmd = spearMeta.classDecorator<string>((name) => {
    zString.parse(name || "");
    return { cmd: name };
});

export const alias = spearMeta.propertyDecorator<string>((long) => {
    zString.parse(long);
    return { alias: long };
});

/**
 * aliasMeta
 * @param target property
 */
export function aliasMeta(target: object): Map<string, string> {
    const mm = new Map<string, string>();
    for (const metaKey of Reflect.getMetadataKeys(target) as string[]) {
        const key = propertyMatch(metaKey);
        if (key) {
            const k = META_DEF.alias(key);
            const meta = Reflect.getMetadata(k, target, key) as AliasMetaDef;
            if (meta) {
                mm.set(key, meta.alias);
            }
        }
    }
    return mm;
}

/**
 * default value
 * @param set value
 */
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

export function typeMeta(target: Function): Map<string, any> {
    const mm = new Map<string, any>();
    for (const metaKey of Reflect.getMetadataKeys(target) as string[]) {
        const propertyKey = propertyMatch(metaKey);
        if (propertyKey) {
            const tt = spearMeta.propertyType(target, propertyKey);
            if (tt) mm.set(propertyKey, tt);
        }
    }
    return mm;
}
