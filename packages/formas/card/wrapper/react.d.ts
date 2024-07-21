import { Card as _Card } from "@formas/card";
import { Component } from "@atomico/react";
export const Card: Component<typeof _Card>;
declare namespace JSX {
   interface IntrinsicElements{
      "forma-card": Component<typeof _Card>;
   }
}