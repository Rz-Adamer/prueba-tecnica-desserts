import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '../services/products.service'

function useProductsMutations() {
  const queryClient = useQueryClient()
  const invalidateProducts = () =>
    queryClient.invalidateQueries({ queryKey: ['products'] })

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: invalidateProducts,
  })

  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }) => updateProduct(id, product),
    onSuccess: invalidateProducts,
  })

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: invalidateProducts,
  })

  return {
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
  }
}

export default useProductsMutations
