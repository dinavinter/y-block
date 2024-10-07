import {c, css, h, Host, Props, useCallback, useEffect, useEvent, useHost, useMemo, useRef, useState} from "atomico";
import * as awarenessProtocol from 'y-protocols/awareness';
import {EditorView, keymap} from "@codemirror/view";
import {DefaultConfig as config} from "./config";
import {yCollab, yUndoManagerKeymap} from "y-codemirror.next";
import {  ChangeSet, EditorState} from "@codemirror/state";
import {indentSelection} from "@codemirror/commands";
import * as Y from "yjs";
import { icon } from "./indent";
import {Doc} from "yjs";
import {useStore} from "@atomico/store";
import {useSyncedDoc, YDocStore} from "@y-block/store";
type CustomDetail = {
    value: string,
    changeset?: ChangeSet,
}
export const YCm = c (function yClm ({store, text, awareness}): Host<{ onChange: CustomEvent<CustomDetail> }> {
    const ref = useRef()

    // const doc= useSyncedDoc();
    const {doc, awareness:store_awareness} = useStore(YDocStore);
     
    text = text ?? useMemo(() => doc?.getText(store), [doc, store]);
    awareness = awareness ?? store_awareness;
    const dispatch = useEvent("Change", {bubbles: true});

    const hostDiv = document.createElement('div');
    const host = useHost()
    const indent= useCallback(() => { 
        const currentSelection = codemirror.state.selection;

        codemirror.dispatch({
            selection: {
                anchor: 0,
                head: codemirror.state.doc.length
            }
        })


        indentSelection({
            state: codemirror.state,
            dispatch: transaction => (
                codemirror.update([transaction])
            )
        })

        codemirror.dispatch({
            selection: currentSelection
        })



    },  )

    const watcher = useMemo(() => EditorView.updateListener.of((view) => {
        if (!view.docChanged) return;
        dispatch({value: `${view.state.doc}`.trim()})
        console.debug('cmCode:watcher', { transactions:view.transactions, view })
    }))


    const codemirror = useMemo(() => {
       return new EditorView({
            extensions: [
                ...config.extensions,
                watcher,

                keymap.of([...yUndoManagerKeymap]),
                yCollab(text, awareness)
            ],
            parent: hostDiv,
            root: host.current.shadowRoot || undefined,
            state: EditorState.create({

                extensions: [
                    ...config.extensions,
                    watcher,

                    keymap.of([...yUndoManagerKeymap]),
                    yCollab(text, awareness),


                ]
            })
        })

    }, [host.current, ref.current, text, awareness]);
    text?.observe( (event, trx)=> {
        console.log('Codemirror content changed:event' ,  "\tchanges: ", event.delta, "\ttarget: ", event.target.toJSON() ,"\tcurrentTarget: ", event.currentTarget.toJSON(),"\ttarget.doc: ", event.target.doc?.getText('codemirror').toJSON())
        console.log('Codemirror content changed:tesxt' , text.toJSON())
        console.log('Codemirror content changed:trx' , JSON.stringify(trx.doc.toJSON()))
        if(trx.origin === 'codemirror') {
            console.log('Codemirror content changed:origin' , trx.origin)
            return
        }

    })



    // useEffect(() => {
    //     console.log('cmCode:useEffect', {codemirror, doc})
    //     setAwareness && setAwareness({})
    //
    // }, [setAwareness])

    return <host  class={"h-full"}>
        <div  class={"h-full"}>
            <nav class=" sticky top-0 bg-white/75">
                <button type="button" title="Indent" onclick={indent} class="full-rounded shadow-md ">
                    {icon()}
                    {/* <iconify-icon icon="mdi:format-indent-increase"></iconify-icon> */}
                </button>
            </nav>
            <div ref={ref} autofocus class="codemirror-host cm-s-twilight border-2  h-full w-full min-h-96 ">
                {h(codemirror?.dom, { 
                    style: {
                        minHeight:'30rem',
                        height: '100%',
                        width: '100%',
                        minWidth: '30rem'
                    }
                })}
            </div>
        </div>
    </host>

}, {
    props:{
        value: {type: String, value: ''},
        language: {type: String, value: 'html'},
        text: {type: Y.Text, value: undefined as unknown as Y.Text},
        awareness: {type: Object, value: undefined as unknown as awarenessProtocol.Awareness },
        store: {type: String, value: 'codemirror'}
    },
    styles: css`
    @tailwind base;
    @tailwind components;
        
        
    @tailwind utilities;
    @tailwind screens;
    @tailwind forms;
    @tailwind typography;
        
    ::selection {
        @apply bg-pink-500;
    }
    :host {
        display: block;
        width: 100%;
        height: 100%;
    }
    .cm-wrap {
        height: 300px;
        border: 1px solid #ddd
    }

    .cm-scroller {
        overflow: auto;
    }

    .codemirror-host {
        height: 100%;
        width: 100%;
        min-height: 300px;
    }
        
        
    `
})

 