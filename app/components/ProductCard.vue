<script setup lang="ts">
import type { Product } from '~/composables/useProducts'
import { formatPrice } from '~/composables/useProducts'

defineProps<{
  product: Product
}>()
</script>

<template>
  <article class="group overflow-hidden border-2 border-black bg-white transition hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_#111]">
    <NuxtLink :to="`/products/${product.id}`" class="block h-full">
      <div class="aspect-square border-b-2 border-black bg-[#f3f0e8] p-4">
        <img
          :src="product.thumbnail"
          :alt="product.name"
          class="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          loading="lazy"
        >
      </div>

      <div class="p-4 text-black">
        <div class="flex items-center justify-between gap-3">
          <p class="bg-lime-300 px-2 py-1 text-[11px] font-black uppercase tracking-wide">
            {{ product.category }}
          </p>
          <p class="text-xs font-bold text-neutral-600">-{{ Math.round(product.discountPercentage) }}%</p>
        </div>

        <h3 class="mt-4 min-h-14 text-base font-black uppercase leading-7">
          {{ product.name }}
        </h3>
        <p class="mt-1 text-xs font-bold uppercase tracking-wide text-neutral-500">
          {{ product.brand }}
        </p>

        <div class="mt-5 flex items-center justify-between gap-4 border-t-2 border-black pt-4">
          <span class="text-lg font-black">{{ formatPrice(product.price) }}</span>
          <span class="text-xs font-black uppercase tracking-wide text-neutral-600">{{ product.rating }} / 5</span>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
