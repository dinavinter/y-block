import {c, css, h, Host, useCallback, useEffect, useEvent, useHost, useMemo, useRef} from "atomico";
import {EditorView, keymap} from "@codemirror/view";
import {yCollab, yUndoManagerKeymap} from "y-codemirror.next";
import {ChangeSet, EditorState, Extension} from "@codemirror/state";
import {indentSelection} from "@codemirror/commands";
import {icon} from "./indent";
import {useDocStore, useDocText} from "@y-block/store";

type CustomDetail = {
    value: string,
    changeset?: ChangeSet,
}

type YText = ReturnType<typeof useDocText>

export const YCm = c(function yClm({store, text, extensions}: { store: string, text: YText , extensions:Array<Extension>}): Host<{
    onChange: CustomEvent<CustomDetail>
}> {
    const ref = useRef()

    const {awareness} = useDocStore();
    text = text ?? useDocText(store);
    // awareness = awareness ?? store_awareness;
    const dispatch = useEvent("change", {bubbles: true});

    const hostDiv = document.createElement('div');
    const host = useHost()
    const indent = useCallback(() => {
        if (!codemirror) return;
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
                codemirror?.update([transaction])
            )
        })

        codemirror?.dispatch({
            selection: currentSelection
        })


    },)

    const watcher = useMemo(() => EditorView.updateListener.of((view) => {
        if (!view.docChanged) return;
        dispatch({value: `${view.state.doc}`.trim()})
        console.debug('cmCode:watcher', {transactions: view.transactions, view})
    }))


    const codemirror = useMemo((): EditorView => {
        if (awareness && text && host.current) {
            return new EditorView({
                extensions: [
                    ...extensions,
                    watcher,
                    keymap.of([...yUndoManagerKeymap]),
                    yCollab(text, awareness)
                ],
                parent: hostDiv,
                root: host.current.shadowRoot || undefined,
                state: EditorState.create({

                    extensions: [
                        ...extensions,
                        watcher,

                        keymap.of([...yUndoManagerKeymap]),
                        yCollab(text, awareness),


                    ]
                })
            })
        }

        return codemirror


    }, [host.current, text, awareness]);


    // useEffect(() => {
    //     text?.observe((event, trx) => {
    //         console.debug('Codemirror content changed:event', "\tchanges: ", event.delta, "\ttarget: ", event.target.toJSON(), "\tcurrentTarget: ", event.currentTarget.toJSON(), "\ttarget.doc: ", event.target.doc?.getText('codemirror').toJSON())
    //         console.debug('Codemirror content changed:tesxt', text.toJSON())
    //         console.debug('Codemirror content changed:trx', JSON.stringify(trx.doc.toJSON()))
    //         if (trx.origin === 'codemirror') {
    //             console.debug('Codemirror content changed:origin', trx.origin)
    //             return
    //         }
    //
    //     })
    // }, [text])


    // useEffect(() => {
    //     console.log('cmCode:useEffect', {codemirror, doc})
    //     setAwareness && setAwareness({})
    //
    // }, [setAwareness])

    return <host class={"h-full"}>
        <div class={"h-full"}>
            <nav class=" sticky top-0 bg-white/75">
                <button type="button" title="Indent" onclick={indent} class="full-rounded shadow-md ">
                    {icon()}
                    {/* <iconify-icon icon="mdi:format-indent-increase"></iconify-icon> */}
                </button>
            </nav>
            <div ref={ref} autofocus class="codemirror-host cm-s-twilight border-2  h-full w-full min-h-96 ">
                {h(codemirror?.dom, {
                    style: {
                        minHeight: '30rem',
                        height: '100%',
                        width: '100%',
                        minWidth: '30rem'
                    }
                })}
            </div>
        </div>
    </host>

}, {
    props: {
        extensions: {type: Array, value: []},
        value: {type: String, value: ''},
        language: {type: String, value: 'html'},
        text: {type: Object, value: undefined as unknown as YText},
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



    `
})

 