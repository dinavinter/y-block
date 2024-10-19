import {javascript} from "@codemirror/lang-javascript";
import {type WorkerShape} from "@valtown/codemirror-ts/worker";
import * as Comlink from "comlink";
import {
    tsAutocomplete,
    tsAutocompleteWorker,
    tsFacet,
    tsFacetWorker,
    tsHover,
    tsHoverWorker,
    tsLinter,
    tsLinterWorker,
    tsSync,
    tsSyncWorker,
} from "@valtown/codemirror-ts";
import {autocompletion} from "@codemirror/autocomplete";
import {createDefaultMapFromCDN, createSystem, createVirtualTypeScriptEnvironment} from "@typescript/vfs";
import ts from "typescript";
import lzstring from "lz-string"


export   function tsEnv(fsMap:Map<string,string>) {
    try { 
        console.log(fsMap);
        const system = createSystem(fsMap);
        const compilerOpts = {
        };
        // fsMap.set("xstate.d.ts", fetch("http://esm.sh/xstate"))
        return createVirtualTypeScriptEnvironment(system, ["index.ts"], ts, compilerOpts);
    }
    catch (e) {
        console.error(e);
        return [];
    }

}

export async function fsMap(){
   return await createDefaultMapFromCDN(
        {target: ts.ScriptTarget.ES2022,  allowImportingTsExtensions: true,esModuleInterop: true, lib:["lib.xstate"]},
        "3.7.3",
        false,
        ts,
        lzstring,
        (x) => x.startsWith("lib.xstate") || x.startsWith("xstate") ? fetch("https://esm.sh/xstate", {redirect:"follow"}) : fetch(x)
    );

}

export   function local(map:Map<string,string>) {
    console.log("local ========================",map);
    const path = "index.ts";
    map.set(path, "export const x = 1");
     const env =   tsEnv(map);
    return [
        javascript({
            typescript: true,
            jsx: true,
        }),
        tsFacet.of({env, path}),
        tsSync(),
        tsLinter(),
        autocompletion({
            override: [tsAutocomplete()],
        }),
        tsHover()
    ]
}


export async function worker() {
    const innerWorker = new Worker(new URL("./tsworker.ts", import.meta.url), {
        type: "module",
    });
    const worker = Comlink.wrap<WorkerShape>(innerWorker);

    await worker.initialize();

    return  [
        javascript({
            typescript: true,
            jsx: true,
        }),
        tsFacetWorker.of({ worker, path }),
        tsSyncWorker(),
        tsLinterWorker(),
        autocompletion({
            override: [tsAutocompleteWorker()],
        }),
        tsHoverWorker()
    ]

}

