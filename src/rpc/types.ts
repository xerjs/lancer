export interface MethodInfo {
    res: unknown;
    pars: unknown[];
    name: string;
    path: string;
}

export interface Trans {
    wrap(info: MethodInfo[]): Record<string, Function>;
    install(fns: Record<string, Function>, imp: object, sender: object): void;
}
