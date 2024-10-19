
<!--
// const { status, data: map } = useAsyncData('fsmap',async ()=>await fsMap());

// const { status, data: extensions } = useAsyncData('worker',async ()=> a);

// const websiteConfig = useState(new Map<string, string>())
//
// await callOnce(async () => {
//   websiteConfig.value = await fsMap()
// })


// const { data:extensions , status} = useLazyAsyncData("extensions",async () => local(fsts), {
//   key: `extensions`,
//   server:false,
//   default() {
//     // Find the individual post from the cache and set it as the default value.
//     return  []
//   }
// })

-->

<script setup lang="ts">
// import { EditorView, basicSetup } from "codemirror";
 import type {CodeMirrorRef} from "#build/nuxt-codemirror";
import {fsMap, local} from "~/composable/tscm";
// import welcomeCode from '~/template/welcome.ts?raw'
// import {fsMap, local} from "~/composable/tscm";
import {tsExtension as extensions} from "~/composable/tsExtensions";
const code = ref("console.log('Hello, World!')");
const theme = ref<'light' | 'dark' | 'none'>('light');
const codemirror = ref<CodeMirrorRef>();
 
// const { data:fsts } = useAsyncData("fsMap",async ()=> await fsMap())
// const { data:extensions , status} = useLazyAsyncData("extensions",async () => local(fsts), {
//   key: `extensions`,
//   server:false,
//   default() {
//     // Find the individual post from the cache and set it as the default value.
//     return  []
//   }
// })

onMounted(() => {
    watchEffect(async () => {
    
    if (codemirror.value) {
      console.log('ref', codemirror.value.view);
    }
  })
});
const status = ref('loaded');

</script>
<template>
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div v-else>

  <NuxtCodeMirror
      ref="codemirror"
      v-model="code"
      :extensions="extensions"
      basic-setup
      auto-save="true"
      style="width: 500px; height: 400px"
      :theme="theme"
      placeholder="Enter your code here..."
      :auto-focus="true"
      :editable="true"
      :basic-setup="true"
      :indent-with-tab="true"
  />
  </div>

</template>
