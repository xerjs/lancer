
export interface Commander {
    execute(): Promise<void>;
    args: string[];
    sourceArgs: string[];
}

interface BaseMetaDef {
    key: string;
}

export interface ValueMetaDef extends BaseMetaDef {
    value: unknown;
}