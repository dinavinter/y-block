import {c, css, useProp, useRef, Component} from "atomico";
import * as Y from 'yjs';
import {useProxySlot} from "@atomico/hooks/use-slot";
import type {AtomicoThis} from "atomico/types/dom";


export interface GalleryProps{
    items: Y.Array<any>;
}

export function gallery():Component<GalleryProps> {
    const refSlotTemplate = useRef();
    const Templates = useProxySlot<AtomicoThis>(refSlotTemplate, el => el instanceof HTMLElement) as (AtomicoThis & (new() => any))[];
    const  [ items ]  = useProp("items");
    console.log("g:items", items?.toJSON())
    return (
        <host shadowDom>
            <template>
                <slot ref={refSlotTemplate}/>
            </template>
            <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 max-h-screen">
                <slot name="title"/>
                {items && <y-array array={items}
                         class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                    {Templates.map((Template, index) =>
                        <y-props key={"index"}>
                            <Template cloneNode/>
                        </y-props>
                    )}
                </y-array>}
            </div>
        </host>
    );
}


gallery.props = {
    items: {
        type: Y.Array,
        reflect: false
    }
};

gallery.styles = css`
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	@tailwind screens;

	:host {
		@apply block  mx-auto;
		display: block;
	}
`;





export const Gallery = c(gallery);


 