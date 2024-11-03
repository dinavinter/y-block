<script setup lang="ts">
const { data: info } = await useFetch('/api/info')
const generatedAt = useState(() => new Date().toISOString())
</script>

<template>
  <div id="container">
    <Head>
      <Title>Nuxt on the edge</Title>
      <Meta
          name="description"
          content="HTML, dynamically rendered in a city near you"
      />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:site" content="@nuxt_js" />
      <Meta name="twitter:creator" content="@nuxt_js" />
      <Meta name="twitter:title" content="Nuxt on the edge" />
      <Meta
          name="twitter:description"
          content="HTML, dynamically rendered in a city near you"
      />
      <Meta
          name="twitter:image"
          content="https://nuxt-on-the-edge.vercel.app/og-card.png"
      />
      <Meta name="twitter:image:alt" content="The Vercel and Nuxt logos" />
      <Meta
          name="og:image"
          content="https://nuxt-on-the-edge.vercel.app/og-card.png"
      />
    </Head>
    <div style="height: 100%">
      <main  style="height: 100%">
        <NuxtPage  style="height: 100%"  />
      
      </main> 
    </div> 
  </div>

</template>
 