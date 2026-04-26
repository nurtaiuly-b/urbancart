<script setup lang="ts">
import {
  PRODUCT_SOURCE_URL,
  formatPrice,
  mapSourceProductToProduct,
  mapSourceProductsToProducts,
  type ProductsResponse,
  type SourceProduct,
} from '~/composables/useProducts'

const route = useRoute()
const productId = Number(route.params.id)
const addedToBag = ref(false)

if (!Number.isFinite(productId)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
  })
}

const { data, pending, error } = await useAsyncData(
  `product-${productId}`,
  async () => {
    const sourceProduct = await $fetch<SourceProduct>(`${PRODUCT_SOURCE_URL}/${productId}`)

    if (!sourceProduct?.id) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product not found',
      })
    }

    const relatedResponse = await $fetch<ProductsResponse>(
      `${PRODUCT_SOURCE_URL}/category/${sourceProduct.category}?limit=5`,
    )

    return {
      product: mapSourceProductToProduct(sourceProduct),
      relatedProducts: mapSourceProductsToProducts(relatedResponse.products)
        .filter((product) => product.id !== sourceProduct.id)
        .slice(0, 3),
    }
  },
)

const product = computed(() => data.value?.product)
const relatedProducts = computed(() => data.value?.relatedProducts ?? [])

function addToBag() {
  addedToBag.value = true
}

useSeoMeta({
  title: () => product.value ? `${product.value.name} - UrbanCart` : 'Product - UrbanCart',
  description: () => product.value?.description ?? 'Shop the latest UrbanCart goods.',
})
</script>

<template>
  <main class="mx-auto max-w-7xl px-5 py-12">
    <NuxtLink to="/products" class="border-b-2 border-black text-sm font-black uppercase tracking-wide">
      Back to shop
    </NuxtLink>

    <div v-if="pending" class="mt-8 border-2 border-black bg-white p-6 font-bold text-neutral-700">
      Loading product details...
    </div>

    <div v-else-if="error" class="mt-8 border-2 border-red-700 bg-red-50 p-6 font-bold text-red-700">
      Product details could not be loaded.
    </div>

    <template v-else-if="product">
      <section class="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-start">
        <div class="overflow-hidden border-2 border-black bg-white shadow-[10px_10px_0_#111]">
          <img
            :src="product.image"
            :alt="product.name"
            class="aspect-square w-full bg-[#f3f0e8] object-contain p-8"
          >
        </div>

        <div class="border-2 border-black bg-white p-6">
          <p class="inline-block bg-lime-300 px-3 py-2 text-xs font-black uppercase tracking-[0.2em]">
            {{ product.category }}
          </p>
          <h1 class="mt-5 text-4xl font-black uppercase leading-tight text-black sm:text-5xl">
            {{ product.name }}
          </h1>
          <p class="mt-3 text-sm font-black uppercase tracking-[0.2em] text-neutral-500">
            {{ product.brand }} / {{ product.availabilityStatus }}
          </p>
          <p class="mt-5 text-base font-medium leading-8 text-neutral-700">
            {{ product.description }}
          </p>

          <div class="mt-8 grid gap-4 sm:grid-cols-3">
            <div class="border-2 border-black bg-[#f3f0e8] p-4">
              <p class="text-sm font-bold uppercase text-neutral-600">Price</p>
              <p class="mt-1 text-2xl font-black text-black">{{ formatPrice(product.price) }}</p>
            </div>
            <div class="border-2 border-black bg-[#f3f0e8] p-4">
              <p class="text-sm font-bold uppercase text-neutral-600">Rating</p>
              <p class="mt-1 text-2xl font-black text-black">{{ product.rating }} / 5</p>
            </div>
            <div class="border-2 border-black bg-[#f3f0e8] p-4">
              <p class="text-sm font-bold uppercase text-neutral-600">Stock</p>
              <p class="mt-1 text-2xl font-black text-black">{{ product.stock }}</p>
            </div>
          </div>

          <button
            type="button"
            class="mt-8 w-full border-2 border-black bg-black px-5 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-lime-300 hover:text-black"
            @click="addToBag"
          >
            {{ addedToBag ? 'Added to bag' : 'Add to bag' }}
          </button>

          <div class="mt-6 grid gap-3 text-sm font-semibold text-neutral-700">
            <p class="border-l-4 border-lime-300 pl-3">{{ product.shippingInformation }}.</p>
            <p class="border-l-4 border-lime-300 pl-3">{{ product.returnPolicy }}.</p>
            <p class="border-l-4 border-lime-300 pl-3">{{ product.reviewCount }} verified customer reviews.</p>
          </div>
        </div>
      </section>

      <section v-if="relatedProducts.length" class="mt-14">
        <div class="flex items-end justify-between gap-4">
          <div>
            <p class="text-sm font-black uppercase tracking-[0.2em] text-neutral-600">Related</p>
            <h2 class="mt-2 text-3xl font-black uppercase text-black">More from {{ product.category }}</h2>
          </div>
        </div>

        <div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            v-for="item in relatedProducts"
            :key="item.id"
            :product="item"
          />
        </div>
      </section>
    </template>
  </main>
</template>
