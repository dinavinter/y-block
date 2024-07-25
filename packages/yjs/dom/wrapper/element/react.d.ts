import { YElement as _YElement } from "@y-block/dom/element";
import { Component } from "@atomico/react";
export const YElement: Component<typeof _YElement>;
declare namespace JSX {
   interface IntrinsicElements{
      "y-element": Component<typeof _YElement>;
   }
}