import { META_DEF, META_KEY, propertyMatch } from "./consts";
import { RequiredMetaDef } from "./types";
import { property } from "./decorator";


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