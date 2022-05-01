import { META_DEF } from "./consts";

export function required(): PropertyDecorator {
    return (target: Object, key: string | symbol) => {
        const k = META_DEF.required(key as string);
        Reflect.defineMetadata(k, { key, required: true }, target);
    };
}