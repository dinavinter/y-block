<script setup language="ts">
import { Repl, useStore, useVueImportMap } from '@vue/repl'
import Codemirror from "~/components/codemirror.vue";
// import { 
//   File } from '@vue/repl'
import {ref} from "vue";
// import {genImportMap} from "~/composable/dependency";
// import tsconfigCode from '~/template/tsconfig.json?raw'
// import welcomeCode from '~/template/welcome.vue?raw'
// import mainCode from '~/template/main.vue?raw'
import {useStore as useReplStore} from "~/composable/store";
// const {
//   importMap: builtinImportMap,
//   vueVersion,
//   productionMode,
// } = useVueImportMap()

//
//
// const versions = reactive({
//   vue: 'latest',
//   elementPlus:'latest',
//   typescript: 'latest',
// })
// const MAIN_FILE = 'src/PlaygroundMain.vue'
// const APP_FILE = 'src/App.vue'

//
// const files={
//   APP_FILE: `${welcomeCode}`,
//   MAIN_FILE: `${mainCode}`,
//   "tsconfig.json":  `${tsconfigCode}`, 
//   "import-map.json":  JSON.stringify(genImportMap(versions, false), undefined, 2)
// } 
// console.log("files",   files[MAIN_FILE] )
// const store = useStore({
//   builtinImportMap,
//   files: ref( {
//     [APP_FILE]: new File(APP_FILE, files[APP_FILE]),
//     [MAIN_FILE]: new File(MAIN_FILE, files[MAIN_FILE],true),
//     "tsconfig.json": new File("tsconfig.json", files["tsconfig.json"]),
//    "import-map.json": new File("import-map.json", files["import-map.json"])
//   }),
//  mainFilename: ref(MAIN_FILE),
//  activeFilename: ref(APP_FILE),
// sfcOptions: {
//    
//   },
//   // activeFilename: "src/App.vue",
//   vueVersion: computed(() => "latest"),
//   typescriptVersion: "latest"})
const loading = ref(true)
const store = useReplStore({
  serializedState: location.hash.slice(1),
  initialized: () => {
    loading.value = false
  },
})


// store.activeFile.code = files[APP_FILE]

const previewOptions = {
  headHTML: `
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,container-queries"><\/script>
    
  `,
}
 </script>

<template>
  <div v-if="!loading" antialiased>

    <Repl style="height: 60%"
          :editor="Codemirror"
          :store="store"
          :previewOptions="previewOptions"
          :clear-console="false"
          :preview-theme="true"

    />

  </div>
  <template v-else>
    <div v-loading="{ text: 'Loading...' }" h-100vh />
  </template>
</template>