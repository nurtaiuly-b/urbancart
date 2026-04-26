export type SourceProduct = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  thumbnail: string
  images: string[]
  reviews?: Array<{
    rating: number
  }>
  availabilityStatus?: string
  shippingInformation?: string
  returnPolicy?: string
}

export type ProductsResponse = {
  products: SourceProduct[]
  total: number
  skip: number
  limit: number
}

export type Product = {
  id: number
  name: string
  image: string
  thumbnail: string
  images: string[]
  category: string
  rawCategory: string
  collectionId: number
  brand: string
  price: number
  discountPercentage: number
  rating: number
  reviewCount: number
  stock: number
  availabilityStatus: string
  shippingInformation: string
  returnPolicy: string
  description: string
}

export const PRODUCT_SOURCE_URL = 'https://dummyjson.com/products'
export const PRODUCT_FETCH_LIMIT = 24
export const PRODUCTS_LIMIT = 24

export function selectStoreProducts(products: SourceProduct[]) {
  return products.slice(0, PRODUCTS_LIMIT)
}

export function mapSourceProductsToProducts(products: SourceProduct[]) {
  return products.map(mapSourceProductToProduct)
}

export function mapSourceProductToProduct(source: SourceProduct): Product {
  const images = [source.thumbnail, ...(source.images ?? [])].filter((image): image is string => Boolean(image))
  const fallbackImage = 'https://cdn.dummyjson.com/product-images/placeholder.png'
  const mainImage = images[1] ?? images[0] ?? fallbackImage
  const thumbnail = source.thumbnail || mainImage

  return {
    id: source.id,
    name: source.title,
    image: mainImage,
    thumbnail,
    images: images.length ? images : [mainImage],
    category: formatCategory(source.category),
    rawCategory: source.category,
    collectionId: source.id,
    brand: source.brand ?? 'UrbanCart',
    price: source.price,
    discountPercentage: source.discountPercentage,
    rating: source.rating,
    reviewCount: source.reviews?.length ?? Math.max(8, Math.round(source.rating * 12)),
    stock: source.stock,
    availabilityStatus: source.availabilityStatus ?? 'In Stock',
    shippingInformation: source.shippingInformation ?? 'Ships in 2 business days',
    returnPolicy: source.returnPolicy ?? '30 days return policy',
    description: source.description,
  }
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

function formatCategory(category: string) {
  return category
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
