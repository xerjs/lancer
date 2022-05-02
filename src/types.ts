
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

export interface LengthMetaDef extends BaseMetaDef {
    minLength?: number;
    maxLength?: number;
}

export interface PatternMetaDef extends BaseMetaDef {
    value: string;
}

export type Types = Number | String;