<script setup lang="ts">
import {
  PRODUCT_SOURCE_URL,
  PRODUCT_FETCH_LIMIT,
  mapSourceProductsToProducts,
  selectStoreProducts,
  type ProductsResponse,
} from '~/composables/useProducts'

const { data: featuredProducts, pending, error } = await useAsyncData(
  'home-products',
  async () => {
    const response = await $fetch<ProductsResponse>(`${PRODUCT_SOURCE_URL}?limit=${PRODUCT_FETCH_LIMIT}`)

    return mapSourceProductsToProducts(selectStoreProducts(response.products)).slice(0, 3)
  },
  {
    default: () => [],
  },
)

useSeoMeta({
  title: 'UrbanCart - Daily Goods For City Movement',
  description: 'Shop bold everyday goods, clean carry pieces, and city-ready essentials from UrbanCart.',
})
</script>

<template>
  <main>
    <section class="border-b-2 border-black bg-[#f3f0e8]">
      <div class="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1fr_0.92fr] lg:items-stretch lg:py-14">
        <div>
          <p class="inline-block border-2 border-black bg-lime-300 px-3 py-2 text-xs font-black uppercase tracking-[0.2em]">
            New season drop
          </p>
          <h1 class="mt-5 max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight text-black sm:text-6xl lg:text-7xl">
            Everyday gear with sharper edges.
          </h1>
          <p class="mt-6 max-w-xl text-lg font-medium leading-8 text-neutral-700">
            Shop city-ready essentials, carry pieces, and daily layers designed to move from weekday errands to late-night plans.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <NuxtLink
              to="/products"
              class="inline-flex items-center justify-center border-2 border-black bg-black px-6 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-lime-300 hover:text-black"
            >
              Shop the drop
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="inline-flex items-center justify-center border-2 border-black bg-white px-6 py-4 text-sm font-black uppercase tracking-wide text-black transition hover:bg-black hover:text-white"
            >
              Our story
            </NuxtLink>
          </div>

          <div class="mt-10 grid max-w-xl grid-cols-3 border-2 border-black bg-white text-center">
            <div class="border-r-2 border-black p-4">
              <p class="text-2xl font-black">24</p>
              <p class="mt-1 text-xs font-bold uppercase text-neutral-600">Fresh picks</p>
            </div>
            <div class="border-r-2 border-black p-4">
              <p class="text-2xl font-black">30</p>
              <p class="mt-1 text-xs font-bold uppercase text-neutral-600">Day returns</p>
            </div>
            <div class="p-4">
              <p class="text-2xl font-black">$80</p>
              <p class="mt-1 text-xs font-bold uppercase text-neutral-600">Free ship</p>
            </div>
          </div>
        </div>

        <div class="border-2 border-black bg-white p-4 shadow-[10px_10px_0_#111]">
          <div class="mb-4 flex items-center justify-between border-b-2 border-black pb-3">
            <p class="text-sm font-black uppercase tracking-[0.2em]">Top picks</p>
            <p class="bg-lime-300 px-2 py-1 text-xs font-black uppercase">Limited</p>
          </div>

          <div v-if="pending" class="border-2 border-black bg-[#f3f0e8] p-6 text-sm font-bold text-neutral-700">
            Loading the shelf...
          </div>
          <div v-else-if="error" class="border-2 border-red-700 bg-red-50 p-6 text-sm font-bold text-red-700">
            The shelf is unavailable right now.
          </div>
          <div v-else class="grid gap-4">
            <NuxtLink
              v-for="product in featuredProducts.slice(0, 2)"
              :key="product.id"
              :to="`/products/${product.id}`"
              class="grid grid-cols-[96px_1fr] gap-4 border-2 border-black bg-[#f3f0e8] p-3 transition hover:bg-lime-100"
            >
              <img
                :src="product.thumbnail"
                :alt="product.name"
                class="size-24 border-2 border-black bg-white object-contain p-2"
                loading="lazy"
              >
              <div>
                <p class="inline-block bg-lime-300 px-2 py-1 text-[11px] font-black uppercase tracking-wide">
                  {{ product.category }}
                </p>
                <h2 class="mt-3 font-black uppercase leading-6 text-black">{{ product.name }}</h2>
                <p class="mt-2 text-sm font-bold text-neutral-600">{{ product.brand }} / {{ product.rating }} rating</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b-2 border-black bg-lime-300 py-4">
      <div class="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-2 px-5 text-sm font-black uppercase tracking-[0.2em]">
        <span>Fast shipping</span>
        <span>Hardwearing picks</span>
        <span>New drops weekly</span>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-5 py-14">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.2em] text-neutral-600">Featured goods</p>
          <h2 class="mt-2 text-4xl font-black uppercase text-black">Built for the daily rotation</h2>
        </div>
        <NuxtLink to="/products" class="border-b-2 border-black text-sm font-black uppercase tracking-wide">
          View all items
        </NuxtLink>
      </div>

      <div v-if="pending" class="mt-8 border-2 border-black bg-white p-6 font-bold text-neutral-700">
        Loading products...
      </div>
      <div v-else-if="error" class="mt-8 border-2 border-red-700 bg-red-50 p-6 font-bold text-red-700">
        Products are unavailable right now.
      </div>
      <div v-else class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </main>
</template>
