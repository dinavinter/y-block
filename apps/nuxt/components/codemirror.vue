 

<script setup lang="ts">
import {
  inject,
  onMounted,
  onWatcherCleanup,
  useTemplateRef,
  watch,
  watchEffect,
} from 'vue'
 import {tsExtension as extensions} from "~/composable/tsExtensions";
import type {CodeMirrorRef} from "#build/nuxt-codemirror";

const theme = ref<'light' | 'dark' | 'none'>('light');
const editor = ref<CodeMirrorRef>();
 
 interface Props {
  mode?: string  
  value?: string
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'htmlmixed',
  value: "console.log('Hello, World!')",
  readonly: false,
})

const code = ref(props.value);

function debounce(fn: Function, n = 100) {
  let handle: any
  return (...args: any[]) => {
    if (handle) clearTimeout(handle)
    handle = setTimeout(() => {
      fn(...args)
    }, n)
  }
}


 

const emit = defineEmits<(e: 'change', value: string) => void>()
const handleChange = (value: string, viewUpdate: ViewUpdate) => {
  console.log('Value changed:', value)
  emit('change', value)
  console.log('View updated:', viewUpdate)
}
const emitChangeEvent = (value: string) => {
  console.log('change event', value)
  emit('change', value)
}

onMounted(() => { 
  watchEffect(() => {
    if (props.value !== code.value){
      code.value = props.value
    }
    
    // const cur = editor.value?.state.doc.toString()
    // if (props.value !== cur) {
    //   editor.value.state?.selection.replaceRange({
    //     from: editor.value.state.doc.posAt(0),
    //     to: editor.value.state.doc.posAt(editor.value.state.doc.length),
    //   }, props.value)
    // }
  }, [{
    props: ['value']
  }])

  // watchEffect(() => {
  //   editor.setOption('mode', props.mode)
  // })
 

  // watch(
  //     autoSave,
  //     (autoSave) => {
  //       if (autoSave) {
  //         editor.on('change', emitChangeEvent)
  //         onWatcherCleanup(() => editor.off('change', emitChangeEvent))
  //       }
  //     },
  //     { immediate: true },
  // )
})
</script>
  
<template>
  
    <NuxtCodeMirror
        ref="codemirror"
        v-model="code"
        basic-setup
        auto-save="true"
        style="width: 100%; height: 100%"
        :theme="theme"
        placeholder="Enter your code here..."
        :auto-focus="true"
        :editable="true"
        :basic-setup="true"
        :indent-with-tab="true"
        :extensions="extensions"
        @on-change="handleChange" 
        height="100%" 

    />
 
</template>
