import { YArray as _YArray } from "@y-block/array";
import { Component } from "@atomico/react";
export const YArray: Component<typeof _YArray>;
declare namespace JSX {
   interface IntrinsicElements{
      "y-array": Component<typeof _YArray>;
   }
}