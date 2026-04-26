<script setup lang="ts">
useSeoMeta({
  title: 'About - UrbanCart',
  description: 'Learn about UrbanCart, a shop for everyday goods, sharp layers, and useful city essentials.',
})
</script>

<template>
  <main class="mx-auto max-w-7xl px-5 py-12">
    <section class="border-2 border-black bg-white p-6 shadow-[8px_8px_0_#111] sm:p-8">
      <p class="inline-block bg-lime-300 px-3 py-2 text-xs font-black uppercase tracking-[0.2em]">About UrbanCart</p>
      <h1 class="mt-5 max-w-4xl text-4xl font-black uppercase leading-tight text-black sm:text-6xl">
        Goods made for city routines and weekend movement.
      </h1>
      <p class="mt-6 max-w-3xl text-lg font-medium leading-8 text-neutral-700">
        UrbanCart curates practical pieces with bold color, simple function, and a clean streetwear attitude. We focus on products that earn a place in your daily rotation.
      </p>
    </section>

    <section class="mt-8 grid gap-5 md:grid-cols-3">
      <article class="border-2 border-black bg-white p-5">
        <h2 class="text-xl font-black uppercase text-black">Small drops</h2>
        <p class="mt-3 text-sm font-medium leading-6 text-neutral-700">
          We keep the shelf focused, release new picks often, and avoid clutter that slows down your choice.
        </p>
      </article>
      <article class="border-2 border-black bg-lime-300 p-5">
        <h2 class="text-xl font-black uppercase text-black">Daily quality</h2>
        <p class="mt-3 text-sm font-bold leading-6 text-neutral-800">
          Our picks are selected for repeat wear, practical carry, and a look that works across the whole week.
        </p>
      </article>
      <article class="border-2 border-black bg-white p-5">
        <h2 class="text-xl font-black uppercase text-black">Fast support</h2>
        <p class="mt-3 text-sm font-medium leading-6 text-neutral-700">
          Questions about orders, sizing, or returns go straight to a support team that answers clearly.
        </p>
      </article>
    </section>

    <section class="mt-8 grid gap-6 border-2 border-black bg-black p-6 text-white md:grid-cols-[0.8fr_1.2fr] md:p-8">
      <div>
        <p class="text-sm font-black uppercase tracking-[0.2em] text-lime-300">Our promise</p>
        <h2 class="mt-3 text-3xl font-black uppercase">No filler. Just useful goods.</h2>
      </div>
      <p class="text-base font-medium leading-8 text-neutral-300">
        Every item is chosen to feel easy to wear, easy to carry, and easy to style. If it does not work for daily life, it does not make the shelf.
      </p>
    </section>
  </main>
</template>
