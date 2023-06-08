import { ClassType } from "@xerjs/avalon/dist/meta/type";

export interface Argv {
    [arg: string]: any;
    _: string[];
}

export interface Commander {
    execute(): Promise<void>;
    sourceArgs: string[];
}

interface BaseMetaDef {
    key: string;
}

export interface ValueMetaDef extends BaseMetaDef {
    value: unknown;
}

export interface AliasMetaDef extends BaseMetaDef {
    alias: string;
}

export interface RequiredMetaDef extends BaseMetaDef {
    required: boolean;
}

export interface LengthMetaDef extends BaseMetaDef {
    minLength?: number;
    maxLength?: number;
}

export interface RangeMetaDef extends BaseMetaDef {
    minimum?: number;
    maximum?: number;
}

export interface PatternMetaDef extends BaseMetaDef {
    value: string;
}

export type Types = Number | String;
