

export const META_KEY = {
    cmd: "lancer:cmd:",
    profix: "lancer:cmd:property:",
    property: (propertyKey: string): string => {
        return META_KEY.profix + propertyKey;
    },
} as const;

type GenKey = (property: string) => string;
interface Def {
    alias: GenKey;
    aliasMatch: GenKey;
    value: GenKey;
    valueMatch: GenKey;
    required: GenKey;
    requiredMatch: GenKey;
}

const keys = ["alias", "value", "required"];
const META: any = {};
keys.forEach(k => {
    META[k] = (property: string): string => {
        return META_KEY.property(property) + ":" + k;
    };
    META[k + "Match"] = (long: string): string => {
        const rg = new RegExp(META_KEY.profix + "(\\w+):" + k);
        const m = long.match(rg);
        return m ? m[1] : "";
    };
});

export const META_DEF = META as Def;
