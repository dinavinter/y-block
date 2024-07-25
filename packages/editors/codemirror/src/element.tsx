import {c, css, h, Host, Props, useCallback, useEffect, useEvent, useHost, useMemo, useRef, useState} from "atomico";
import * as awarenessProtocol from 'y-protocols/awareness';
import {EditorView, keymap} from "@codemirror/view";
import {DefaultConfig as config} from "./config";
import {yCollab, yUndoManagerKeymap} from "y-codemirror.next";
import {  ChangeSet, EditorState} from "@codemirror/state";
import {indentSelection} from "@codemirror/commands";
import * as Y from "yjs";
type CustomDetail = {
    value: string,
    changeset?: ChangeSet,
}
export const YCm = c (function yClm ({text, awareness}): Host<{ onChange: CustomEvent<CustomDetail> }> {
    const ref = useRef()

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

    return <host shadowDom>
        <button type="button" title="Indent" onclick={indent} >
            <iconify-icon icon="mdi:format-indent-increase"></iconify-icon>
        </button>
        <div ref={ref} class="codemirror-host cm-s-twilight">
            {h(codemirror?.dom, {

            })}
        </div>
    </host>

}, {
    props:{
        value: {type: String, value: ''},
        language: {type: String, value: 'html'},
        text: {type: Y.Text, value: undefined as unknown as Y.Text},
        awareness: {type: Object, value: undefined as unknown as awarenessProtocol.Awareness },
        
    },
    styles: css`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
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
    }`
})

 