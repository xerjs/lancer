interface Argv {
    [arg: string]: any;
    _: string[];
}

function parseArgv(fname: string): Argv {
    const rr = process.argv;
    const i = rr.findIndex((e) => e === fname);
    return require("minimist")(process.argv.slice(2));
}

function main() {
    const argv = parseArgv(__filename);
    const k = 1;
    const s = argv[k];
}
