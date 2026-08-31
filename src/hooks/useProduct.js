import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getProductById } from '../api/productsApi'

function useProduct(id) {
  const query = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    retry: false,
  })

  const isNotFound =
    axios.isAxiosError(query.error) && query.error.response?.status === 404

  return {
    ...query,
    product: query.data,
    isNotFound,
  }
}

export default useProduct
