import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../services/categories.service'

function useCategories() {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  return {
    ...query,
    categories: query.data ?? [],
  }
}

export default useCategories
