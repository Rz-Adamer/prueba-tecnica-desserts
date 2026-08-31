import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/productsApi'

function useProducts(search, category) {
  const query = useQuery({
    queryKey: ['products', search, category],
    queryFn: () => getProducts({ search, category }),
  })

  return {
    ...query,
    products: query.data ?? [],
  }
}

export default useProducts
