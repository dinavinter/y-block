import { YFragment as _YFragment } from "@y-block/dom/fragment";
import { Component } from "@atomico/react/preact";
export const YFragment: Component<typeof _YFragment>;
declare namespace JSX {
   interface IntrinsicElements{
      "y-fragment": Component<typeof _YFragment>;
   }
}