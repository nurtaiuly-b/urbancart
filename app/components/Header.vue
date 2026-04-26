<script setup lang="ts">
const route = useRoute()

const links = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function isActive(path: string) {
  return route.path === path || (path !== '/' && route.path.startsWith(path))
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b-2 border-black bg-white">
    <div class="bg-black px-5 py-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-lime-300">
      Free shipping over $80 / New drops every Friday
    </div>

    <div class="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <NuxtLink to="/" class="flex items-center gap-3 text-black">
        <span class="grid size-10 place-items-center border-2 border-black bg-lime-300 text-sm font-black">
          UC
        </span>
        <span class="text-xl font-black uppercase tracking-tight">UrbanCart</span>
      </NuxtLink>

      <nav class="flex flex-wrap gap-2 text-sm font-black uppercase tracking-wide">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="border-2 border-transparent px-3 py-2 text-neutral-700 transition hover:border-black hover:bg-lime-300 hover:text-black"
          :class="isActive(link.to) ? 'border-black bg-black text-white hover:bg-black hover:text-white' : ''"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
