import { useQuery } from '@tanstack/react-query'
import {
  getProductById,
  isProductNotFoundError,
} from '../services/products.service'

function useProduct(id) {
  const query = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    retry: false,
  })

  const isNotFound = isProductNotFoundError(query.error)

  return {
    ...query,
    product: query.data,
    isNotFound,
  }
}

export default useProduct
