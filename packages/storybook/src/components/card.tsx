import { c } from "atomico";

function card() {
    return <host shadowDom></host>;
}

customElements.define("story-card", c(card));
