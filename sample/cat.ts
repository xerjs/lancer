import { Cmd, Commander } from "../src";

import { AvalonContainer, Provider } from "@xerjs/avalon";
import { field, alias } from "../src/decorator";
import { Spear } from "../src/spear";

@Cmd()
@Provider()
export class Cat implements Commander {
    async execute(): Promise<void> {
        console.log("cat execute %j", this);
    }
    sourceArgs!: string[];

    @field({ input: "." })
    head!: number;

    @field({ input: "." })
    input?: string;

    @alias("input")
    in!: string;
}

function main() {
    const cat = AvalonContainer.root.resolve(Cat) as Cat;
    const spear = AvalonContainer.root.resolve(Spear) as Spear;
    console.log(spear.info(cat));
    spear.parse(cat);
    cat.execute();
}

process.nextTick(main);
