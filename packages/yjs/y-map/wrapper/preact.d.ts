import { YMap as _YMap } from "@y-block/map";
import { Component } from "@atomico/react/preact";
export const YMap: Component<typeof _YMap>;
declare namespace JSX {
   interface IntrinsicElements{
      "y-map": Component<typeof _YMap>;
   }
}