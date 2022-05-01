
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

export interface RequiredMetaDef extends BaseMetaDef {
    required: boolean;
}

export type Types = Number | String;