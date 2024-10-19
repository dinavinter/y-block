import * as Comlink from "comlink";
import { createWorker } from "@valtown/codemirror-ts";
import {tsEnv} from "~/pages/tscm";

Comlink.expose(
    createWorker(tsEnv),
);