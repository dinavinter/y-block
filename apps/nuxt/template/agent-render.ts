import 'atomico/ssr/load'
import {c, html, render} from "atomico";
import {ComponentPublicInstance, defineComponent, VNode} from "vue";
import {renderToString,renderToWebStream} from "vue/server-renderer";
import {ActionArgs, emit, EventObject, MachineContext, type ParameterizedObject, sendTo} from "xstate";
import {auto} from "@atomico/vue";
import {VNodeAny} from "atomico/types/vnode";
//
// export type StreamOptions ={ html: Atomico<any,any, any> ; text:Atomico<any,any, any> ; json:Atomico<any,any, any> ; href:string
//    connect: (options?:{event?:string, swap?:string}) => Record<string,any>
// };
// export type RenderStream = StreamOptions & {
//     service:(id?: string) => RenderStream;
//     event:(type:string)=>StreamOptions
//
// };
//
//  export function workflowStream(workflow: string ):RenderStream {
//     return {
//         href: workflow,
//         event: (type: string) => streamElements(workflow, type),
//         service: (id?: string) => workflowStream(`${workflow}/${id}` ),
//         html: streamElements(workflow).html,
//         connect: streamElements(workflow).connect
//     }
// }
// export function streamElements(workflow: string, type?: string | undefined):StreamOptions {
//     const href = `${workflow}${type ? `/events/${type}` : ''}`;
//
//      return {
//          href,
//         
//          connect(options)  {
//              const {event, swap}= options ||{ }
//              return {
//                  'hx-swap': swap || 'beforeend' ,
//                  'sse-swap':event || type,
//                  'sse-connect': `${workflow}/events`,
//                  'ext':'sse'
//              }
//             
//          },
//          html:c(({workflow,type}) => html` <host   ext="sse" sse-connect="${workflow}/events" sse-swap="${type}" hx-swap="beforeend" />`, {
//             props: {
//                 workflow: {type: String, reflect: true, value: workflow},
//                 type: {type: String, reflect: true, value: type}
//             } 
//         })
//        
//     }
// }
//


//render action

export type Html<R = any>={(
        strings: TemplateStringsArray,
        ...values: any[]
    ): R;}





export type NodeExpression<TContext extends MachineContext, TExpressionEvent extends EventObject, TParams extends ParameterizedObject['params'] | undefined, TEvent extends EventObject>=(args:ActionArgs<TContext, TExpressionEvent, TEvent> & { html:Html},params:TParams) => VNodeAny;

export function render<TContext extends MachineContext & {stream?: RenderStream }, TExpressionEvent extends EventObject, TParams extends ParameterizedObject['params'] | undefined, TEvent extends EventObject >( nodeOrExpr:NodeExpression<TContext, TExpressionEvent, TParams, TEvent>  | VNodeAny, ) {
    return renderTo('render', nodeOrExpr)
}



let typeI = 0
export function renderTo<TContext extends MachineContext, TExpressionEvent extends EventObject, TParams extends ParameterizedObject['params'] | undefined, TEvent extends EventObject >(type:string, nodeOrExpr:NodeExpression<TContext, TExpressionEvent, TParams, TEvent>  | VNodeAny, ) {
    const expr = typeof nodeOrExpr === 'function' ? nodeOrExpr : () => nodeOrExpr;
    const comp= c(({params, ...args}:ActionArgs<TContext, TExpressionEvent, TEvent> & {  params:TParams}) => {
        const node = expr( {
            ...args,
            html: html,
        }, params);
         
        console.error('rendering', node);
        if(!node.render){
            console.error('No render method',type, node);
            debugger;
            return  html`<div> ${node.toString()} </div>`
        } 
        return html`<${node.render()} />`
    },{ props: {
            params: {type: Object, default: () => ({})},
            self: {type: Object, default: () => ({id: 'self'}), reflect: false},
            context: {type: Object, default: () => ({})}
        }
    })
    const compv = auto(comp);
    // const Comp    = defineComponent (({params, ...args}:ActionArgs<TContext, TExpressionEvent, TEvent> & {  params:TParams}) => {
    //        const Node = expr( {
    //            ...args,
    //            html: html,
    //         }, params);
    //       //
    //       // return  ()=> expr( {
    //       //     ...args,
    //       //     html: html,
    //      // }, params)
    // },{
    //     render(this: ComponentPublicInstance){
    //         return  html`<${Node} />`
    //     },
    //     name: `e-${type}${typeI++ === 0 ? '-' : typeI}  `,
    //     props: {
    //         params: {type: Object, default: () => ({})},
    //         self: {type: Object, default: () => ({id: 'self'}), reflect:false},
    //         context: {type: Object, default: () => ({})},
    //     }
    // })

    // const node = {
    //     props: ['postTitle'],
    //     emits: ['updatePost'],
    //     template: `<h3>{{ postTitle }}</h3> `
    // }
    return emit(({context, self, ...args}: ActionArgs<TContext, TExpressionEvent, TEvent>, params: TParams) => {
         const node=   expr({
            self,
            html, ...args,
            context: context
        }, params);
        if(!node.render){
            console.error('No render method',type, node);
            debugger;
            return {
                type,
                    event:type,
                self,
                params,
                context,
                event: type,
            ...args,
                comp:compv,
                data:   html`<div> no render </div>`.render()  //JSON.stringify(html`<${comp} ...${args} params=${params} self=${self} context=${context} />`.render())
            };
         }

        return {
            type,
            event:type,
            self,
            params,
            context,
            event: type,
            ...args,
            comp:compv,
            data:  node.render()  //JSON.stringify(html`<${comp} ...${args} params=${params} self=${self} context=${context} />`.render())
        };
        return renderEvent(
            type,
            self,
            h(comp, {
                ...args,
                params,
                self,
                context
            }),
            );
    })

    function renderEvent(type:string, self: {id: string}, node:VNode<Element>) {
        //  if(!node?.render) {
        //      console.log('No render method',type, node);
        //      debugger;
        //      return {
        //          type: type,
        //          event: type,
        //          data: node.toString(),
        //      };
        //  }
        // const rendered = node.render() as unknown as {
        //     type: string,
        //     name: string,
        //     nodeName: string,
        //     attributes: any,
        //     innerHTML: string,
        //     outerHTML: string,
        // };
        // const rendered = await renderToString(node);
        // console.log(rendered);
        const event = {
            type: type,
            event: type,
            actor: self.id,
            node: node,
            data: renderToWebStream(node),
        } satisfies EventMessage & { type: typeof type, event: string}
        console.log(event, node);
      
        return event 
    }


}