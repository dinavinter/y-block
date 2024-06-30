import { Container as _Container } from "@formas/container";
import { Component } from "@atomico/react/preact";
export const Container: Component<typeof _Container>;
declare namespace JSX {
   interface IntrinsicElements{
      "forma-container": Component<typeof _Container>;
   }
}