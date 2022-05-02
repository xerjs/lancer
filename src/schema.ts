import { META_DEF, META_KEY, propertyMatch } from "./consts";
import { LengthMetaDef, PatternMetaDef, RequiredMetaDef } from "./types";

type PropertyType = "number" | "integer" | "auto";

export function property(type: PropertyType = "auto"): PropertyDecorator {
    return (target: Object, key: string | symbol) => {
        const k = META_KEY.property(key as string);
        return Reflect.defineMetadata(k, type, target);
    };
}

export function propertyMeta(target: object, propertyKey: string): PropertyType | undefined {
    const k = META_KEY.property(propertyKey as string);
    return Reflect.getMetadata(k, target);
}

export function required(): PropertyDecorator {
    return (target: Object, key: string | symbol) => {
        property()(target, key);
        const k = META_DEF.required(key as string);
        return Reflect.defineMetadata(k, { key, required: true }, target, key);
    };
}

/**
 * requiredMeta
 * @param target property
 */
export function requiredMeta(target: object): Map<string, RequiredMetaDef> {
    const mm = new Map<string, RequiredMetaDef>();
    for (const metaKey of Reflect.getMetadataKeys(target) as string[]) {
        const propertyKey = propertyMatch(metaKey);
        if (propertyKey) {
            const longKey = META_DEF.required(propertyKey);
            const vv = Reflect.getMetadata(longKey, target, propertyKey);
            if (vv) mm.set(propertyKey, vv);
        }
    }
    return mm;
}

/**
 * string length
 * @param opt
 * @returns
 */
export function length(opt: { min?: number, max?: number; }): PropertyDecorator {
    return (target: Object, key: string | symbol) => {
        property()(target, key);
        const k = META_DEF.length(key as string);
        return Reflect.defineMetadata(k, { key, maxLength: opt.max, minLength: opt.min }, target, key);
    };
}

export function lengthMeta(target: object, propertyKey: string): LengthMetaDef | undefined {
    const k = META_DEF.length(propertyKey as string);
    return Reflect.getMetadata(k, target, propertyKey);
}

/**
 * string pattern
 * @param opt
 * @returns
 */
export function pattern(re: string): PropertyDecorator {
    return (target: Object, key: string | symbol) => {
        property()(target, key);
        const k = META_DEF.pattern(key as string);
        return Reflect.defineMetadata(k, { key, value: re }, target, key);
    };
}

export function patternMeta(target: object, propertyKey: string): PatternMetaDef | undefined {
    const k = META_DEF.pattern(propertyKey as string);
    return Reflect.getMetadata(k, target, propertyKey);
}