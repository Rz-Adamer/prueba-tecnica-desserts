export interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
}

export interface ProductFilters {
  search: string
  category: string
}
