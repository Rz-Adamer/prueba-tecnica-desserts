import { useQuery } from '@tanstack/react-query'
import {
  getProductById,
  getProducts,
  isProductNotFoundError,
} from '../services/products.service'

export function useProductsQuery(search, category, page) {
  const query = useQuery({
    queryKey: ['products', search, category, page],
    queryFn: () => getProducts({ search, category, page }),
  })

  return {
    ...query,
    products: query.data?.data ?? [],
    totalPages: query.data?.pages ?? 1,
    totalItems: query.data?.items ?? 0,
  }
}

export function useProductQuery(id) {
  const query = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    retry: false,
  })

  return {
    ...query,
    product: query.data,
    isNotFound: isProductNotFoundError(query.error),
  }
}
