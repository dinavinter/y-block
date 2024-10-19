<!-- eslint-disable no-useless-escape -->
<script setup lang="ts">
import { type ReplProps} from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'
import { ref, watchEffect, onMounted, computed } from 'vue'
import { Repl, useStore, SFCOptions, useVueImportMap } from '@vue/repl'

import tsconfigCode from '~/template/tsconfig.json?raw'
import welcomeCode from '~/template/welcome.vue?raw'
import mainCode from '~/template/main.vue?raw'

const loading = ref(true)
const replRef = ref<InstanceType<typeof Repl>>()


const previewOptions = {
  headHTML: `
    <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"><\/script>
    <script>
      window.__unocss = {
        rules: [],
        presets: [],
      }
    <\/script>
  `,
  showRuntimeErrors: true,
  showRuntimeWarnings: true,


} satisfies ReplProps["previewOptions"]



const setVH = () => {
  document.documentElement.style.setProperty('--vh', window.innerHeight + `px`)
}
window.addEventListener('resize', setVH)
setVH()

const useSSRMode = ref(false)

const AUTO_SAVE_STORAGE_KEY = 'vue-sfc-playground-auto-save'
const initAutoSave: boolean = JSON.parse(
    localStorage.getItem(AUTO_SAVE_STORAGE_KEY) ?? 'true',
)
const autoSave = ref(initAutoSave)

const { productionMode, vueVersion, importMap } = useVueImportMap({
  runtimeDev: import.meta.env.PROD
      ? `${location.origin}/vue.runtime.esm-browser.js`
      : `${location.origin}/src/vue-dev-proxy`,
  runtimeProd: import.meta.env.PROD
      ? `${location.origin}/vue.runtime.esm-browser.prod.js`
      : `${location.origin}/src/vue-dev-proxy-prod`,
  serverRenderer: import.meta.env.PROD
      ? `${location.origin}/server-renderer.esm-browser.js`
      : `${location.origin}/src/vue-server-renderer-dev-proxy`,
})

let hash = location.hash.slice(1)
if (hash.startsWith('__DEV__')) {
  hash = hash.slice(7)
  productionMode.value = false
}
if (hash.startsWith('__PROD__')) {
  hash = hash.slice(8)
  productionMode.value = true
}
if (hash.startsWith('__SSR__')) {
  hash = hash.slice(7)
  useSSRMode.value = true
}

// enable experimental features
const sfcOptions = computed(
    (): SFCOptions => ({
      script: {
        inlineTemplate: productionMode.value,
        isProd: productionMode.value,
        propsDestructure: true,
      },
      style: {
        isProd: productionMode.value,
      },
      template: {
        isProd: productionMode.value,
        compilerOptions: {
          isCustomElement: (tag: string) =>
              tag === 'mjx-container' || tag.startsWith('custom-'),
        },
      },
    }),
)
const theme = new URLSearchParams(location.search).get('theme')
if (theme === 'dark') {
  dark.value = true
}

// const dark = useDark()

// const storeState: Partial<StoreState> = toRefs(
//     reactive({
//       files: {"src/app.vue": new File("src/app.vue", welcomeCode),"tsconfig.json": new File("tsconfig.json", tsconfigCode), "import-map.json": new File("import-map.json", JSON.stringify(genImportMap(versions, nightly.value), undefined, 2))},
//       mainFile: "src/app.vue",
//       activeFilename: "src/app.vue",
//       vueVersion: computed(() => "latest"),
//       typescriptVersion: "latest",
//       builtinImportMap:{
//         imports: {
//           "xstate": "https://cdn.jsdelivr.net/npm/xstate/+esm"
//         }
//       },
//       template: {
//         welcomeSFC: mainCode,
//       },
//       sfcOptions: {
//         script: {
//           propsDestructure: true,
//         },
//       }
//     })
// )
// const store = useStore(storeState)

const store = useStore(
    {
      builtinImportMap: importMap,
      vueVersion,
      sfcOptions,
    },
    hash,
)
// @ts-expect-error
globalThis.store = store

 

// eslint-disable-next-line no-console
console.log('Store:', store)

const handleKeydown = (evt: KeyboardEvent) => {
  if ((evt.ctrlKey || evt.metaKey) && evt.code === 'KeyS') {
    evt.preventDefault()
    return
  }
}

// persist state
watchEffect(() =>
    history.replaceState(
        {},
        '',
        `${location.origin}${location.pathname}#${store.serialize()}`,
    ),
)

const refreshPreview = () => {
  replRef.value?.reload()
}

watch(autoSave, setAutoSaveState)
</script>

<template>
  <div v-if="!loading" antialiased>
    <Header :store="store" @refresh="refreshPreview" />
    <Repl
        v-model="autoSave"
        ref="replRef"
        :theme="dark ? 'dark' : 'light'"
        :preview-theme="true"
        :store="store"
        :editor="CodeMirror"
        :preview-options="previewOptions"
        :clear-console="false"
        @keydown="handleKeydown"
    />
  </div>
  <template v-else>
    <div v-loading="{ text: 'Loading...' }" h-100vh />
  </template>
</template>

<style>
body {
  --at-apply: m-none text-13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
  Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --base: #444;
  --nav-height: 50px;
}

.vue-repl {
  height: calc(100vh - var(--nav-height)) !important;
}

.dark .vue-repl,
.vue-repl {
  --color-branding: var(--el-color-primary) !important;
}

.dark body {
  background-color: #1a1a1a;
}
</style>
