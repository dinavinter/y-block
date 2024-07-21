import { Icon as _Icon } from "@formas/icon";
import { Component } from "@atomico/react/preact";
export const Icon: Component<typeof _Icon>;
declare namespace JSX {
   interface IntrinsicElements{
      "atomico-ui-icon": Component<typeof _Icon>;
   }
}