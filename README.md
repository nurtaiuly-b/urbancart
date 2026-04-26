# UrbanCart

UrbanCart is a responsive ecommerce storefront built with Nuxt, Vue, TypeScript, and Tailwind CSS. It presents a small product catalog with real product data from the DummyJSON Products API.

The project is designed as a clean portfolio piece: simple enough to understand quickly, but complete enough to show real frontend skills such as routing, API data fetching, reactive filtering, reusable components, typed data mapping, and responsive UI design.

## Features

- Multi-page Nuxt application with Home, Shop, Product Details, About, and Contact pages
- Product catalog loaded from the DummyJSON Products API
- Dynamic product detail route: `/products/[id]`
- Reactive product search and category filtering with Vue `ref` and `computed`
- Shared product mapper composable for converting API data into UI-friendly product objects
- Loading, error, and empty states for a better user experience
- Responsive ecommerce layout built with Tailwind utility classes
- Store-style product cards with image, category, brand, price, discount, and rating
- Customer support contact form UI with local reactive state
- SEO metadata for main pages with `useSeoMeta`

## Tech Stack

- Nuxt 4
- Vue 3 Composition API
- TypeScript
- Tailwind CSS
- Nuxt `useAsyncData` and `$fetch` for API requests
- DummyJSON Products API
- File-based routing with Nuxt pages

## Pages

| Route | Description |
| --- | --- |
| `/` | Store homepage with hero section, featured products, and collection highlights |
| `/products` | Product grid with search, category filter, loading state, error state, and empty state |
| `/products/[id]` | Product detail page with image, price, stock, rating, shipping info, return policy, and related products |
| `/about` | Store story and quality promise |
| `/contact` | Customer support page with a reactive contact form UI |

## Project Structure

```text
app/
  components/
    Header.vue
    Footer.vue
    ProductCard.vue
  composables/
    useProducts.ts
  layouts/
    default.vue
  pages/
    index.vue
    about.vue
    contact.vue
    products/
      index.vue
      [id].vue
```

## Data Layer

Product data is fetched from:

```text
https://dummyjson.com/products
```

The app keeps API-specific fields inside `app/composables/useProducts.ts`. This composable defines TypeScript types and helper functions that convert raw API products into the product shape used by the UI.

Example mapped fields:

- `title` becomes `name`
- `thumbnail` and `images` become product images
- `category` is formatted for display
- `price`, `rating`, `stock`, `brand`, shipping, and return data are passed into the product pages and cards

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the app for production |
| `npm run generate` | Generate a static version of the app |
| `npm run preview` | Preview the production build locally |
| `npm run postinstall` | Prepare Nuxt after dependency installation |

## What This Project Demonstrates

- Building a structured Nuxt app with file-based routing
- Using Vue Composition API in real pages and components
- Fetching remote data with Nuxt server-aware composables
- Creating reusable typed data helpers with TypeScript
- Managing UI state with `ref`, `reactive`, and `computed`
- Designing a responsive storefront with Tailwind CSS
- Handling API loading, error, and empty states
- Keeping the frontend simple without adding unnecessary state libraries or UI kits

## Notes

This is a frontend-focused project. The contact form and add-to-bag button use local UI state only and do not submit data to a backend or create real orders.
