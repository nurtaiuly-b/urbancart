<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  message: '',
})

const submitted = ref(false)

function submitSupportRequest() {
  submitted.value = true
}

useSeoMeta({
  title: 'Contact - UrbanCart',
  description: 'Contact UrbanCart customer support for order help, sizing questions, and returns.',
})
</script>

<template>
  <main class="mx-auto max-w-7xl px-5 py-12">
    <div class="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
      <section>
        <p class="inline-block border-2 border-black bg-lime-300 px-3 py-2 text-xs font-black uppercase tracking-[0.2em]">Customer support</p>
        <h1 class="mt-5 text-4xl font-black uppercase leading-tight text-black sm:text-6xl">
          Need help with an order?
        </h1>
        <p class="mt-5 text-lg font-medium leading-8 text-neutral-700">
          Send a message about shipping, returns, sizing, or a product on the shelf. We usually reply within one business day.
        </p>

        <div class="mt-8 border-2 border-black bg-white p-5 shadow-[6px_6px_0_#111]">
          <p class="text-sm font-black uppercase tracking-wide text-neutral-600">Email</p>
          <a href="mailto:help@urbancart.shop" class="mt-2 block text-xl font-black text-black hover:text-lime-700">
            help@urbancart.shop
          </a>
          <p class="mt-4 text-sm font-semibold text-neutral-700">Monday-Friday / 9AM-6PM</p>
        </div>
      </section>

      <form class="border-2 border-black bg-white p-6 shadow-[8px_8px_0_#111]" @submit.prevent="submitSupportRequest">
        <div class="grid gap-5">
          <label class="block">
            <span class="text-sm font-black uppercase tracking-wide text-black">Name</span>
            <input
              v-model="form.name"
              required
              type="text"
              class="mt-2 w-full border-2 border-black px-4 py-3 text-sm font-semibold outline-none transition focus:bg-lime-50"
              placeholder="Jane Cooper"
            >
          </label>

          <label class="block">
            <span class="text-sm font-black uppercase tracking-wide text-black">Email</span>
            <input
              v-model="form.email"
              required
              type="email"
              class="mt-2 w-full border-2 border-black px-4 py-3 text-sm font-semibold outline-none transition focus:bg-lime-50"
              placeholder="jane@example.com"
            >
          </label>

          <label class="block">
            <span class="text-sm font-black uppercase tracking-wide text-black">Message</span>
            <textarea
              v-model="form.message"
              required
              rows="5"
              class="mt-2 w-full resize-none border-2 border-black px-4 py-3 text-sm font-semibold outline-none transition focus:bg-lime-50"
              placeholder="Tell us what you need."
            />
          </label>

          <button
            type="submit"
            class="border-2 border-black bg-black px-5 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-lime-300 hover:text-black"
          >
            Send message
          </button>
        </div>

        <div v-if="submitted" class="mt-5 border-2 border-black bg-lime-300 p-4 text-sm font-black uppercase text-black">
          Message received. Our support team will reply soon.
        </div>
      </form>
    </div>
  </main>
</template>
