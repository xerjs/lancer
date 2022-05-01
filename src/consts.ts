
export const META_KEY = {
    cmd: "lancer:cmd",
    property: (propertyKey: string): string => {
        return "lancer:cmd:property:" + propertyKey;
    },
} as const;

export const META_DEF = {
    alias: (property: string): string => {
        return META_KEY.property(property) + ":alias";
    },
    value: (property: string): string => {
        return META_KEY.property(property) + ":value";
    }
} as const;
