import { Props as _Props } from "@y-block/props";
import { Component } from "@atomico/react/preact";
export const Props: Component<typeof _Props>;
declare namespace JSX {
   interface IntrinsicElements{
      "y-props": Component<typeof _Props>;
   }
}