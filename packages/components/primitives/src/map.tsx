// src/map.tsx
import {Any, c, css, useEffect, useProp, useRef, useState} from "atomico";
import * as Y from 'yjs';
import vento from "ventojs";
import { useSlot} from "@atomico/hooks/use-slot";
import {useParent} from "@atomico/hooks";
import {AtomicoThis} from "atomico/types/dom";
import { useRender } from "@atomico/hooks/use-render";

const env = vento();
async function compile(template:string, data:Record<string, any>){
    const {content} = await env.runString(template, data);
    return content;
}

function log(title:string) {
    return (e) => {
        console.log(title, e);
        return e;
    }
}

// src/Debug.tsx

export const Debug = function () {
    const [debug, ] = useProp("debug"); 
    const [data, ] = useProp("data");
    const [templateString, ] = useProp('template');
    const [renderedContent, ] = useProp('content');
    const [error] =  useProp('error'); 
    return debug? <div class="debug-container ">
            <h3>Debug: Current Data</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <h3>Debug: Template</h3>
            <cm-code>{templateString}</cm-code>
            <h3>Debug: Rendered Content</h3>
            <pre>{renderedContent}</pre>
            <h3>Debug: Error</h3>
            <pre>{error}</pre>
            {error ? (
                <div class="error-container">
                    <h3>Template Error</h3>
                    <pre>{error.message}</pre>
                </div>
            )   : null}
        </div> : null;
}

export const YMap = c(function ({ map, debug }) {
    const [data, setData] = useProp("data");
    const [templateString, setTemplateString] = useProp('template'); 
    const [renderedContent, setRenderedContent] = useProp('content');
    const [, setError] =  useProp('error');
    const refSlot = useRef<HTMLSlotElement>(); 
    const templateElements = useSlot<HTMLElement>(refSlot);

    const containerRef = useRef<HTMLDivElement>();
 
    // Update data when map changes
    useEffect(() => {
        if (!map) return;

        // Convert Y.Map to plain object for template rendering
        const updateData = () => { 
            setData(map.toJSON());
        };

        updateData();

        // Observe map changes
        const observer = () => {
            updateData();
        };

        map.observe(observer);

        return () => {
            map.unobserve(observer);
        };
    }, [map, debug]);
    
    //set template content when slot changes
    useEffect(() => { 
        if (!templateElements?.length) return;
        setTemplateString(templateElements.map(el=>el.outerHTML).join(''));
    }, [templateElements]);
    
    //render template when template or data changes
    useEffect(() => {
        if (!templateString || !data) return;
        setError(null);
        compile(templateString, data).then(log("rendered")).then(setRenderedContent).catch(setError);
    }, [templateString, data]);
    
    //update dom with rendered content
    useEffect(() => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = renderedContent;
    }, [renderedContent, containerRef.current]);
  
   
    useRender(() => {
       const Fragment = document.createRange().createContextualFragment(renderedContent);
       const Content = Fragment?.firstElementChild?.cloneNode(true) as HTMLElement;
        Content?.setAttribute("slot", "content");
        // @ts-ignore
        return <Content />;
    }, [renderedContent]);


    return <host shadowDom>
        <template class="template-container">
            <slot ref={refSlot}></slot>
        </template> 
        <slot name="content"></slot>
        <Debug/>
    </host>;
}, {
    props: {
        map: {
            type: Y.Map,
            reflect: false
        },
        debug: {
            type: Boolean,
            reflect: true,
            value: false
        },
        template: {
            type: String,
            reflect: false,
            default: '',
            event: {
                type: "change",
                bubbles: true,
                composed: true,
                detail: "template",
                cancelable: true,
            }
        },
        content: {
            type: String,
            reflect: false,
            default: '',
            event: {
                type: "change",
                bubbles: true,
                composed: true,
                detail: "content",
                cancelable: true,
            },

        },
        data: {
            type: Object,
            reflect: false,
            default: {},
            event: {
                type: "change",
                bubbles: true,
                composed: true,
                detail: "data",
                cancelable: true,
            },
        },
        error: {
            type: Any,
            reflect: false,
            default: null,
            event: {
                type: "change",
                bubbles: true,
                composed: true,
                detail: "error",
                cancelable: true,
            },
        }
    },
    styles: css`
        :host {
            display: block;
        }
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        
    `
});


export type YMapElement = AtomicoThis<typeof YMap>;