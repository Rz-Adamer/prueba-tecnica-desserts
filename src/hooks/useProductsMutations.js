import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '../services/products.service'

const TOAST_DURATION = 6000

const showTimedToast = (message, type = 'success') =>
  toast[type](message, { duration: TOAST_DURATION })

function useProductsMutations() {
  const queryClient = useQueryClient()
  const invalidateProducts = () => {
    void queryClient.invalidateQueries({ queryKey: ['products'] })
  }
  const notifyMutationError = () =>
    showTimedToast(
      'No se pudo completar la operación. Inténtalo nuevamente.',
      'error',
    )

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      showTimedToast('Producto creado exitosamente')
      invalidateProducts()
    },
    onError: notifyMutationError,
  })

  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }) => updateProduct(id, product),
    onSuccess: (_updatedProduct, { id }) => {
      showTimedToast('Producto editado exitosamente')
      invalidateProducts()
      void queryClient.invalidateQueries({ queryKey: ['product', id] })
    },
    onError: notifyMutationError,
  })

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      showTimedToast('Producto eliminado exitosamente')
      invalidateProducts()
    },
    onError: notifyMutationError,
  })

  return {
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
  }
}

export default useProductsMutations
