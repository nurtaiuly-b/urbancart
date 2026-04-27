<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const isSubmitted = ref(false);

const schemea = toTypedSchema(
  z.object({
    name: z.string().min(2, "Enter your name"),
    email: z
      .string()
      .nonempty("Enter your email")
      .email("Invalid email format"),
    message: z
      .string()
      .nonempty("Enter your message")
      .min(10, "We want to know more!"),
  }),
);

const { handleSubmit, errors, defineField, isSubmitting, resetForm } = useForm({
  validationSchema: schemea,
});

const [name, nameProps] = defineField("name");
const [email, emailProps] = defineField("email");
const [message, messageProps] = defineField("message");

const onSubmit = handleSubmit(async (values) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  isSubmitted.value = true;
  resetForm();

  setTimeout(() => {
    isSubmitted.value = false;
  }, 4000);
});

</script>

<template>
  <form class="border-2 border-black bg-white p-6 shadow-[8px_8px_0_#111]">
    <div class="grid gap-5">
      <label class="block">
        <span class="text-sm font-black uppercase tracking-wide text-black"
          >Name</span
        >
        <input
          v-model="name"
          :props="nameProps"
          type="text"
          class="mt-2 w-full border-2 border-black px-4 py-3 text-sm font-semibold outline-none transition focus:bg-lime-50"
          placeholder="Jane Cooper"
        />
        <span class="text-red-500 text-sm">{{ errors.name }}</span>
      </label>

      <label class="block">
        <span class="text-sm font-black uppercase tracking-wide text-black"
          >Email</span
        >
        <input
          v-model="email"
          :props="emailProps"
          type="email"
          class="mt-2 w-full border-2 border-black px-4 py-3 text-sm font-semibold outline-none transition focus:bg-lime-50"
          placeholder="jane@example.com"
        />
        <span class="text-red-500 text-sm">{{ errors.email }}</span>
      </label>

      <label class="block">
        <span class="text-sm font-black uppercase tracking-wide text-black"
          >Message</span
        >
        <textarea
          v-model="message"
          :props="messageProps"
          rows="5"
          class="mt-2 w-full resize-none border-2 border-black px-4 py-3 text-sm font-semibold outline-none transition focus:bg-lime-50"
          placeholder="Tell us what you need."
        />
        <span class="text-red-500 text-sm">{{ errors.message }}</span>
      </label>

      <button
        @click="onSubmit"
        type="submit"
        class="border-2 border-black bg-black px-5 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-lime-300 hover:text-black"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? "Processing..." : "Send message" }}
      </button>
    </div>

    <div
      v-if="isSubmitted"
      class="mt-5 border-2 border-black bg-lime-300 p-4 text-sm font-black uppercase text-black"
    >
      Thank you! We will get back to you as soon as possible.
    </div>
  </form>
</template>
