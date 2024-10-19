<script setup>
import {Repl, ReplStore} from '@pdanpdan/vue-repl'
// import CodeMirror from '@pdanpdan/vue-repl/codemirror-editor'
// import Monaco from '@pdanpdan/vue-repl/monaco-editor'
import CodeMirror from "~/components/codemirror.vue";

const store = new ReplStore({
  // initialize repl with previously serialized state
  serializedState: location.hash.slice(1),

  // starts on the output pane (mobile only) if the URL has a showOutput query
  showOutput: true,
  // starts on a different tab on the output pane if the URL has a outputMode query
  // and default to the "preview" tab
  outputMode:  'preview',

  // // specify the default URL to import Vue runtime from in the sandbox
  // // default is the CDN link from jsdelivr.com with version matching Vue's version
  // // from peerDependency
  // defaultVueRuntimeURL: 'cdn link to vue.runtime.esm-browser.js',
})

// persist state to URL hash
watchEffect(() => history.replaceState({}, '', store.serialize()))

// pre-set import map
store.setImportMap({
  imports: {
    vue:"https://esm.sh/vue",
    xstate: 'https://esm.sh/xstate',
    ai: 'https://esm.sh/ai'
  },
})


</script>

<template>
  <div class="w-full h-full bg-amber-500">
    <Repl class="w-full h-full" :editor="CodeMirror" :store="store" />
  </div>
</template>