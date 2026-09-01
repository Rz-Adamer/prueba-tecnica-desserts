import { useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteProductModal from '../components/DeleteProductModal'
import ProductForm from '../components/ProductForm'
import useCategories from '../hooks/useCategories'
import useProductsMutations from '../hooks/useProductsMutations'
import { useProductsQuery } from '../hooks/useProductsQueries'

const emptyProduct = {
  name: '',
  price: '',
  categoryId: '',
  image: '',
}

function ProductAdmin() {
  const [page, setPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productToDelete, setProductToDelete] = useState(null)
  const { products, totalPages, isLoading, isError } = useProductsQuery('', '', page)
  const { categories, isLoading: isCategoriesLoading } = useCategories()
  const {
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
  } = useProductsMutations()

  const activeMutation = selectedProduct
    ? updateProductMutation
    : createProductMutation

  const getCategoryName = (categoryId) =>
    categories.find((category) => String(category.id) === String(categoryId))
      ?.name ?? 'Sin categoría'

  const openCreateForm = () => {
    createProductMutation.reset()
    updateProductMutation.reset()
    setSelectedProduct(null)
    setIsFormOpen(true)
  }

  const openEditForm = (product) => {
    createProductMutation.reset()
    updateProductMutation.reset()
    setSelectedProduct(product)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setSelectedProduct(null)
  }

  const handleSaveProduct = async (values) => {
    try {
      if (selectedProduct) {
        await updateProductMutation.mutateAsync({
          id: selectedProduct.id,
          product: values,
        })
      } else {
        await createProductMutation.mutateAsync(values)
      }

      closeForm()
    } catch {
      return
    }
  }

  const openDeleteModal = (product) => {
    deleteProductMutation.reset()
    setProductToDelete(product)
  }

  const handleDeleteProduct = async () => {
    try {
      await deleteProductMutation.mutateAsync(productToDelete.id)
      setProductToDelete(null)

      if (products.length === 1 && page > 1) {
        setPage((currentPage) => currentPage - 1)
      }
    } catch {
      return
    }
  }

  const defaultValues = selectedProduct
    ? {
        name: selectedProduct.name,
        price: selectedProduct.price,
        categoryId: selectedProduct.categoryId,
        image: selectedProduct.image,
      }
    : emptyProduct

  return (
    <main className="min-h-screen bg-rose-50 px-6 py-8 text-stone-900 sm:px-10 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link className="font-semibold text-orange-700 hover:text-orange-800" to="/">
              ← Volver a la tienda
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Administrar productos</h1>
          </div>
          <button
            type="button"
            className="rounded-full bg-orange-700 px-6 py-3 font-semibold text-white hover:bg-orange-800"
            onClick={openCreateForm}
          >
            Crear producto
          </button>
        </div>

        {isFormOpen && (
          <section className="mb-8 rounded-xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-2xl font-bold">
              {selectedProduct ? 'Editar producto' : 'Nuevo producto'}
            </h2>
            <ProductForm
              key={selectedProduct?.id ?? 'new-product'}
              categories={categories}
              defaultValues={defaultValues}
              onSubmit={handleSaveProduct}
              onCancel={closeForm}
              isSubmitting={activeMutation.isPending}
              submitLabel={selectedProduct ? 'Guardar cambios' : 'Crear producto'}
              apiError={activeMutation.isError}
            />
          </section>
        )}

        <section className="overflow-hidden rounded-xl bg-white shadow-sm">
          {isLoading || isCategoriesLoading ? (
            <p className="p-8 text-center text-stone-500">Cargando productos...</p>
          ) : isError ? (
            <p className="p-8 text-center text-red-700">
              No se pudo cargar la administración de productos.
            </p>
          ) : products.length === 0 ? (
            <p className="p-8 text-center text-stone-500">No hay productos.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-3xl text-left">
                <thead className="bg-stone-100 text-sm text-stone-600">
                  <tr>
                    <th className="px-5 py-4">Producto</th>
                    <th className="px-5 py-4">Categoría</th>
                    <th className="px-5 py-4">Precio</th>
                    <th className="px-5 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            className="size-12 rounded-lg object-cover"
                            src={product.image}
                            alt=""
                          />
                          <span className="font-semibold">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-800">
                          {getCategoryName(product.categoryId)}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-semibold">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold hover:border-orange-700 hover:text-orange-700"
                            onClick={() => openEditForm(product)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-700 hover:text-white"
                            onClick={() => openDeleteModal(product)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {!isLoading && !isError && products.length > 0 && (
          <nav className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              className="rounded-full border border-orange-700 px-5 py-2 font-semibold text-orange-700 disabled:opacity-40"
              disabled={page === 1}
              onClick={() => setPage((currentPage) => currentPage - 1)}
            >
              Anterior
            </button>
            <span className="text-sm font-semibold">
              Página {page} de {totalPages}
            </span>
            <button
              type="button"
              className="rounded-full border border-orange-700 px-5 py-2 font-semibold text-orange-700 disabled:opacity-40"
              disabled={page === totalPages}
              onClick={() => setPage((currentPage) => currentPage + 1)}
            >
              Siguiente
            </button>
          </nav>
        )}
      </div>

      <DeleteProductModal
        product={productToDelete}
        onCancel={() => setProductToDelete(null)}
        onConfirm={handleDeleteProduct}
        isDeleting={deleteProductMutation.isPending}
        error={deleteProductMutation.isError}
      />
    </main>
  )
}

export default ProductAdmin
