import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/products.service'

function useProducts(search, category, page) {
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

export default useProducts
