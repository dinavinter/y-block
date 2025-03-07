<script setup lang="ts">
import {assign, createActor, setup} from "xstate";
import {fromAIEventStream} from "@template/ai";
import {openaiGP4o} from "@template/ai";
import {render,renderTo} from "@template/agent-render";
import { Header} from "@template/components/header";
import { ChatBubble} from "@template/components/chatBubble";

import {useTemplateRef, onMounted, ref, h, VNode} from "vue";
import {renderToString} from "vue/server-renderer";
import {VNodeAny} from "atomico/types/vnode";
const machine = setup({
  actors: {
    aiStream: fromAIEventStream({
      model: openaiGP4o(),
      temperature: 0.9
    })
  }
}).createMachine({
  initial: 'idle',
  entry: render(({html}) => html`
        <main class="mx-auto  bg-slate-50 h-full" >
            <${Header} title="The Wiser" />
           <div class="flex flex-col items-center justify-center *:w-1/2 *:justify-center" hx-ext="sse" sse-swap="content" hx-swap="beforeend" />
        </main>`
  ),
  states: {
    idle: {
      entry: render('content',({ html}) => html`<div class="leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 flex-grow " >
                  <${ChatBubble} name="Welcome" 
                               img="https://flowbite.com/docs/images/people/profile-picture-3.jpg" 
                               text="Welcome to The Wiser. Click the button below to start thinking."  >
                    <form>
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" hx-post="events/message" hx-swap="outerHTML"  >Send</button>
                    </form>
                </${ChatBubble}>
        </div>`
      ),
      on: {
        THINK: 'thinking'
      }
    },
    thinking: {
      entry: renderTo('content',({ html}) => html`
                <${ChatBubble} name="Thinker" 
                               img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
                               swap="@thinker.text-delta" />
 
                 `
      ),
      invoke: {
        src: 'aiStream',
        id: 'thinker',
        systemId: 'thinker',
        input: 'Think about a random topic, and then share that thought.'
      },

      on:{
        'output':{
          target: 'done',
          actions: assign( {
            thought: ({  event: {output}}) => output
          })
        }
      }

    },
    done: {
      type: 'final',
      output: ({context}) => context
    }
  },
});

const content = useTemplateRef('content')
 const events =ref([
    
])

onMounted(()=>{
  const service = createActor(machine);
  service.on("*", ({type,data, node, comp}: {type:string, data: VNodeAny, node:VNode}) => {
    if(data){
      console.log("data",type,  {
        data,
        node,
        comp
        
      })

      const el= document.createElement("div")
      el.appendChild(data.cloneNode(true))
      console.log("el", el.innerHTML)
      // this.$refs.event?.appendChild(el)
      events.value = [...events.value, el]

    }
 
    // data.pipeThrough(new TextDecoderStream())
    //     .pipeTo(new WritableStream({
    //   write(chunk) {
    //     console.log("chunk", chunk)
    //    
    //   }
    // }))
    // renderToString(node).then((html) => {
    //   console.log("html", html)
    // })
     
  })
  service.start();
})

</script>

<template>
  <div :ref="event" class="flex flex-col items-center justify-center w-full h-full" >
     <component v-for="e in events" :is="e" class="leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 flex-grow " ></component>
  </div>
  <div class="w-full h-full bg-amber-500">
    <pre>
      <code>
        {{JSON.stringify(machine.toJSON(), null, 2)}}
      </code>
    </pre>
  </div>
</template>