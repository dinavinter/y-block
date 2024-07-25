import { YCm as _YCm } from "@y-block/cm";
import { Component } from "@atomico/react/preact";
export const YCm: Component<typeof _YCm>;
declare namespace JSX {
   interface IntrinsicElements{
      "y-cm": Component<typeof _YCm>;
   }
}