import {
    ActorRefFrom,
    type AnyActorLogic,
    type AnyStateMachine,
    type ContextFrom,
    createActor,
    type EventDescriptor,
    type  EventFrom,
    type  SnapshotFrom, StateNode
} from "xstate";

import * as Y from "yjs";
import {h} from "atomico";
type ActorCreate<TLogic extends AnyActorLogic> = typeof createActor<TLogic>

function toDashName(str: string):string {
    if (str != str.toLowerCase()) {
        str = str.replace(/[a-z]([A-Z])/g, m => "-" + m.toLowerCase());
    }
    return str;    
}
 

export function hydrate<TLogic extends AnyStateMachine>(
    logic:  TLogic,
    fragment: Y.XmlFragment
) {
    type TActorRef = ReturnType<ActorCreate<TLogic>>
    // type TLogic = TActorRef["logic"]
    type TSnapshot = SnapshotFrom<TLogic>
    type TContext = ContextFrom<TLogic>
    type TEvent = EventFrom<TLogic>
    type TEventDescriptors = EventDescriptor<TEvent>
    type TDefinition = TActorRef["logic"]
    type TMeta = TLogic["config"]["meta"]
    type TState = typeof logic.states
    type TStateKeys = keyof TState

    function clearEmpty(param: Y.XmlElement<{ [p: string]: string }>[]) {
        return param.filter((e) => e.length > 0)
    }

    function stateElement(state:StateNode<any, any> ): Y.XmlElement {
           const element=  new Y.XmlElement('y-state')
            element.setAttribute('id',state.id)
            element.setAttribute('slot', "state")
        
          const hook = new Y.XmlHook('state');
          hook.set('type',state.type)
          hook.set('id',state.id)
          hook.set('initial',state.initial)
          hook.set('parent',state.parent?.id)
          hook.set('path',state.path.join('.'))
          hook.set('meta', state.meta)
          hook.set('tags', state.tags)
          element.push([hook] as any as Y.XmlElement[])
          const events = state.ownEvents.map(event=>{
              const eventElement = new Y.XmlElement('y-event')
              eventElement.setAttribute('type',event)
              eventElement.setAttribute('slot', "event")
              const hook = new Y.XmlHook('event');
              hook.set('type',event) 
              eventElement.push([  hook ] as any as Y.XmlElement[]) 
              return eventElement
          
         }) as any as Y.XmlElement[]
         
         const states = Object.values(state.states).map(state=>stateElement(state))

        element.push( [...events, ...states])
        return element
   
   }
   
    // const element = stateElement(logic.root)
    const machine = new Y.XmlElement('state-machine')
    machine.insert(0,Object.values(logic.states).map(state=>stateElement(state)))

    // fragment.insert(0,Object.values(logic.states).map(state=>stateElement(state)))
    fragment.insert(0,[machine])
    return fragment
     
}


export function hydrateHooks<TLogic extends AnyStateMachine>(
    logic:  TLogic,
    fragment: Y.XmlFragment
) {
    type TActorRef = ReturnType<ActorCreate<TLogic>>
    // type TLogic = TActorRef["logic"]
    type TSnapshot = SnapshotFrom<TLogic>
    type TContext = ContextFrom<TLogic>
    type TEvent = EventFrom<TLogic>
    type TEventDescriptors = EventDescriptor<TEvent>
    type TDefinition = TActorRef["logic"]
    type TMeta = TLogic["config"]["meta"]
    type TState = typeof logic.states
    type TStateKeys = keyof TState


    function stateElement(state:StateNode<any, any> ): Y.XmlElement {
        const hook = new Y.XmlHook('state');
        hook.set('type',state.type)
        hook.set('id',state.id)
        hook.set('key',state.key)
        hook.set('initial',state.initial)
        hook.set('parent',state.parent?.id)
        hook.set('path',state.path.join('.'))
        hook.set('meta', state.meta)
        hook.set('tags', state.tags)
        hook.set('on', state.on)
        hook.set('after', state.after)
        hook.set('invoke', state.invoke)
        hook.set('entry', state.entry)
        hook.set('exit', state.exit)
        hook.set('events', state.events)
        return hook as any as Y.XmlElement
 
    }

    
    // const element = stateElement(logic.root)
    // const machine = new Y.XmlElement('state-machine')
    // machine.insert(0,Object.values(logic.states).map(state=>stateElement(state)))

    fragment.insert(0,Object.values(logic.states).map(state=>stateElement(state)))
    // fragment.insert(0,[machine])
    return fragment

}
export function hydrateActor<TActor extends ActorRefFrom<AnyStateMachine>>(actor: TActor , fragment: Y.XmlFragment) {
     const element = new Y.XmlElement('y-actor')
     element.setAttribute('id', actor.id)
     const snapshot = actor.getSnapshot() 
     element.setAttribute('state', snapshot.value)
     // element.setAttribute('context', JSON.stringify(snapshot.context))
     const contextElement = new Y.XmlElement('y-context')
     Object.entries(snapshot.context) && Object.entries(snapshot.context).forEach(([key, value])=>{
         contextElement.setAttribute(key, value?.toString())
         })
    
    element.push([contextElement])
    
    actor.subscribe((state)=>{
        element.setAttribute('state', state.value)
         Object.entries(snapshot.context) && Object.entries(snapshot.context).forEach(([key, value])=>{
            contextElement.setAttribute(key, value?.toString())
        })
     })
    fragment.insert(0,[element])
}
