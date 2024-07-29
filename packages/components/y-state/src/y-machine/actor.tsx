import {c, useEffect, useMemo, useRef, useState} from "atomico";
import {AnyStateMachine, createActor, createMachine} from "xstate";
import * as Y from "yjs";
import {NavItemElement} from "./event";
import {useInspect} from "./inspect";
import {hydrateHooks} from "./hydrate";
import {useFragment} from "@y-block/dom";
import {useRender} from "@atomico/hooks/use-render";
import {syncFragment} from "./machine";

export const YActor = c(function yActor({id, machine}:{id:string, machine: AnyStateMachine}) {
    const doc= useMemo(()=>new Y.Doc())
    const stateMachineFragmet = useMemo(()=>doc.getXmlFragment(id), [doc])
    const yMachineText = useMemo(()=>doc.getText(`${machine.id}-text`), [doc])
    const [state, setState]= useState("idle")

    const machineHooks= {
        "state": {
            createDom(e: Y.XmlHook) {
                const element = document.createElement('y-state')
                element.textContent = e.get('id')
                element.slot = e.get('key')
                element.setAttribute('id', e.get('id'))
                element.setAttribute('key', e.get('key'))
                e.get("events")?.forEach((event: string) => {
                    const eventElement = document.createElement('nav-item') as NavItemElement
                    eventElement.meta = {}
                    eventElement.type = event
                    eventElement.send = (e)=>{
                        console.debug("sending event", e, actor)
                        actor?.send(e)
                    }
                    eventElement.slot = "event"
                    element.appendChild(eventElement)
                })
                // Object.assign(element, e.toJSON())
                return element
            }
        }
    }

    const {inspect} =useInspect()
    const actor =  useMemo(()=>  inspect && createActor(machine, {
        inspect: inspect
    }), [machine, id, inspect])

    useEffect(() => {
        syncFragment(stateMachineFragmet, yMachineText, machineHooks)

    },[yMachineText, stateMachineFragmet,machineHooks])

 
    useEffect(() => {
        hydrateHooks(machine, stateMachineFragmet)
    },[  stateMachineFragmet, machine])


    const refDom = useRef()
    useEffect(() => {
        actor?.subscribe((state) => {
            console.debug('new state', state.value, state)
            setState(state.value)
        } )
        actor?.start()
    }   ,[actor])
    useFragment(refDom, stateMachineFragmet, machineHooks)

    useRender(() => {
        return (<>
                <y-cm text={yMachineText} />
            </>
        )
    })
    return (
        <host shadowDom>
            <h1>actor : {actor?.id}</h1>
            <y-snapshot ref={refDom} state={state}/>
        </host>
    );
},{
    props : {
        id:String,

        machine: {
            type: Object,
            value: function () {
                return createMachine({
                    id: "toggle",
                    initial: "idle",
                    states: {
                        idle: {
                            on: {
                                FETCH: "pending"
                            }
                        },
                        pending: {
                            on: {
                                RESOLVE: "resolved",
                                REJECT: "rejected"
                            }
                        },
                        resolved: {
                            meta:{
                                color: "green",
                                animation: "spin 2s linear infinite"
                            },
                        },
                        rejected: {
                            meta:{
                                color: "red",
                                animation: "spin 2s linear infinite"
                            },
                        }
                    }
                });
            }
        }
    }
})


customElements.define("y-snapshot",  c(({state}) => {
    return <host shadowDom> 
        <slot name={state} />
    </host>
},{
    props: {
        state: {
            type: String,
            reflect: true
        }
    }
}));

customElements && customElements.define && customElements.define("y-actor", YActor);
