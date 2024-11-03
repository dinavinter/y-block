import { gte } from 'semver'
 import type { ImportMap } from '@vue/repl'
import type { MaybeRef } from '@vueuse/core'
import type { Ref } from 'vue'
import {useLocalStorage} from '@vueuse/core'
export type Versions = Record<VersionKey, string>

export interface Dependency {
  pkg?: string
  version?: string
  path: string
  href?: string
}

export type Cdn = 'unpkg' | 'jsdelivr' | 'jsdelivr-fastly'
export const cdn = useLocalStorage<Cdn>('setting-cdn', 'jsdelivr')

export const genCdnLink = (
  pkg: string,
  version: string | undefined,
  path: string,
) => {
  version = version ? `@${version}` : ''
  switch (cdn.value) {
    case 'jsdelivr':
      return `https://cdn.jsdelivr.net/npm/${pkg}${version}${path}`
    case 'jsdelivr-fastly':
      return `https://fastly.jsdelivr.net/npm/${pkg}${version}${path}`
    case 'unpkg':
      return `https://unpkg.com/${pkg}${version}${path}`
  }
}

export const genCompilerSfcLink = (version: string) => {
  return genCdnLink(
    '@vue/compiler-sfc',
    version,
    '/dist/compiler-sfc.esm-browser.js',
  )
}

export const genImportMap = (
  { vue, elementPlus }: Partial<Versions> = {},
  nightly: boolean,
): ImportMap => {
  const deps: Record<string, Dependency> = {
    vue: {
      pkg: '@vue/runtime-dom',
      version: vue,
      path: '/dist/runtime-dom.esm-browser.js',
    },
    '@vue/shared': {
      version: vue,
      path: '/dist/shared.esm-bundler.js',
    },
    'element-plus': {
      pkg: nightly ? '@element-plus/nightly' : 'element-plus',
      version: elementPlus,
      path: '/dist/index.full.min.mjs',
    },
    'element-plus/': {
      pkg: 'element-plus',
      version: elementPlus,
      path: '/',
    },
    '@element-plus/icons-vue': {
      version: '2',
      path: '/dist/index.min.js',
    }
    ,
    "xstate": {
      pkg: "xstate",
      version: "5.18.2",
      href: "https://cdn.jsdelivr.net/npm/xstate/+esm"
    },
    "atomico": {
      pkg: "atomico",
      version: "1.79.2",
      href: "https://esm.sh/atomico@1.79.2"
    },
    "@template/": {
      pkg: "template",
      version: "1.0.0",
      href: "/_nuxt/template/"
    },
    "ai": {
      pkg: "ai",
      version: "3.4.16",
      href: "https://esm.sh/ai"
    },
    "@ai-sdk/openai": {
      pkg: "@ai-sdk/openai",
      version: "0.0.68",
      href: "https://esm.sh/@ai-sdk/openai@0.0.68"
    },
    "sap-ai-token": {
      pkg: "sap-ai-token",
      version: "1.0.0",
      href: "/_nuxt/template/sap-ai-token"
    },
    "@langchain/openai": {
        pkg: "@langchain/openai",
        version: "0.3.11",
        href: "https://esm.sh/@langchain/openai@0.3.11"
       },
    "@langchain/core": {
        pkg: "@langchain/core",
        version: "0.3.13",
        href: "https://esm.sh/@langchain/core@0.3.13"
    },
    "@atomico/vue": {
        pkg: "@atomico/vue",
        version: "0.3.1",
        href: "https://esm.sh/@atomico/vue@0.3.1"
    }
  }

  return {
    imports: Object.fromEntries(
      Object.entries(deps).map(([key, dep]) => [
        key,
        dep.href ?  dep.href: genCdnLink(dep.pkg ?? key, dep.version, dep.path),
      ]),
    ),
  }
}

export const getVersions = (pkg: MaybeRef<string>) => {
  const url = computed(
    () => `https://data.jsdelivr.com/v1/package/npm/${unref(pkg)}`,
  )
  return useFetch(url, {
    initialData: [],
    afterFetch: (ctx) => ((ctx.data = ctx.data.versions), ctx),
    refetch: true,
  }).json<string[]>().data as Ref<string[]>
}

export const getSupportedVueVersions = () => {
  const versions = getVersions('vue')
  return computed(() =>
    versions.value.filter((version) => gte(version, '3.2.0')),
  )
}

export const getSupportedTSVersions = () => {
  const versions = getVersions('typescript')
  return computed(() =>
    versions.value.filter(
      (version) => !version.includes('dev') && !version.includes('insiders'),
    ),
  )
}

export const getSupportedEpVersions = (nightly: MaybeRef<boolean>) => {
  const pkg = computed(() =>
    unref(nightly) ? '@element-plus/nightly' : 'element-plus',
  )
  const versions = getVersions(pkg)
  return computed(() => {
    if (unref(nightly)) return versions.value
    return versions.value.filter((version) => gte(version, '1.1.0-beta.18'))
  })
}
