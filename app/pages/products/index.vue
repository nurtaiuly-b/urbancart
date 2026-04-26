<script setup lang="ts">
import {
  PRODUCT_SOURCE_URL,
  PRODUCT_FETCH_LIMIT,
  mapSourceProductsToProducts,
  selectStoreProducts,
  type ProductsResponse,
} from '~/composables/useProducts'

const search = ref('')
const selectedCategory = ref('All')

const { data: products, pending, error } = await useAsyncData(
  'products',
  async () => {
    const response = await $fetch<ProductsResponse>(`${PRODUCT_SOURCE_URL}?limit=${PRODUCT_FETCH_LIMIT}`)

    return mapSourceProductsToProducts(selectStoreProducts(response.products))
  },
  {
    default: () => [],
  },
)

const categories = computed(() => {
  return ['All', ...new Set(products.value.map((product) => product.category))]
})

const filteredProducts = computed(() => {
  const term = search.value.trim().toLowerCase()

  return products.value.filter((product) => {
    const matchesSearch = !term || product.name.toLowerCase().includes(term)
    const matchesCategory = selectedCategory.value === 'All' || product.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

function resetFilters() {
  search.value = ''
  selectedCategory.value = 'All'
}

useSeoMeta({
  title: 'Shop All - UrbanCart',
  description: 'Shop all UrbanCart goods, including daily layers, carry pieces, and city-ready essentials.',
})
</script>

<template>
  <main class="mx-auto max-w-7xl px-5 py-12">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="inline-block border-2 border-black bg-lime-300 px-3 py-2 text-xs font-black uppercase tracking-[0.2em]">Shop all</p>
        <h1 class="mt-4 text-4xl font-black uppercase text-black sm:text-6xl">Fresh goods for every day</h1>
        <p class="mt-4 max-w-2xl text-lg font-medium leading-8 text-neutral-700">
          Filter the latest UrbanCart shelf by drop, search for a staple, and find the next piece for your rotation.
        </p>
      </div>
      <p class="border-2 border-black bg-white px-4 py-3 text-sm font-black uppercase">
        {{ filteredProducts.length }} of {{ products.length }} items
      </p>
    </div>

    <section class="mt-8 border-2 border-black bg-white p-4 shadow-[6px_6px_0_#111]">
      <div class="grid gap-4 md:grid-cols-[1fr_220px_auto] md:items-end">
        <label class="block">
          <span class="text-sm font-black uppercase tracking-wide text-black">Search</span>
          <input
            v-model="search"
            type="search"
            placeholder="Search by product name"
            class="mt-2 w-full border-2 border-black px-4 py-3 text-sm font-semibold outline-none transition focus:bg-lime-50"
          >
        </label>

        <label class="block">
          <span class="text-sm font-black uppercase tracking-wide text-black">Drop</span>
          <select
            v-model="selectedCategory"
            class="mt-2 w-full border-2 border-black px-4 py-3 text-sm font-semibold outline-none transition focus:bg-lime-50"
          >
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </label>

        <button
          type="button"
          class="border-2 border-black bg-black px-4 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-lime-300 hover:text-black"
          @click="resetFilters"
        >
          Reset
        </button>
      </div>
    </section>

    <div v-if="pending" class="mt-8 border-2 border-black bg-white p-6 font-bold text-neutral-700">
      Loading the shelf...
    </div>
    <div v-else-if="error" class="mt-8 border-2 border-red-700 bg-red-50 p-6 font-bold text-red-700">
      The shelf is unavailable right now. Please try again later.
    </div>
    <div v-else-if="!filteredProducts.length" class="mt-8 border-2 border-black bg-white p-8 text-center">
      <h2 class="text-2xl font-black uppercase text-black">No products found</h2>
      <p class="mt-2 font-medium text-neutral-700">Try another search term or drop.</p>
      <button
        type="button"
        class="mt-5 border-2 border-black bg-black px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-lime-300 hover:text-black"
        @click="resetFilters"
      >
        Clear filters
      </button>
    </div>
    <div v-else class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </main>
</template>
