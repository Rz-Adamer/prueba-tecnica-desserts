import { useState } from 'react'
import CartDrawer from '../components/CartDrawer'
import ConfirmOrderModal from '../components/ConfirmOrderModal'
import ProductCard from '../components/ProductCard'
import ProductSkeleton from '../components/ProductSkeleton'
import useCategories from '../hooks/useCategories'
import { useProductsQuery } from '../hooks/useProductsQueries'

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const {
    products,
    totalPages,
    isLoading,
    isError,
  } = useProductsQuery(search, category, page)
  const {
    categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories()

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setPage(1)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
    setPage(1)
  }

  const getCategoryName = (categoryId) =>
    categories.find((item) => String(item.id) === String(categoryId))?.name ??
    'Sin categoría'

  return (
    <>
      <main className="min-h-screen bg-rose-50 px-6 py-8 text-stone-900 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <section aria-labelledby="desserts-title">
            <h1 id="desserts-title" className="mb-8 text-4xl font-bold">
              Desserts
            </h1>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <label className="sr-only" htmlFor="product-search">
                  Buscar por nombre
                </label>
                <input
                  id="product-search"
                  type="search"
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-orange-700"
                  placeholder="Buscar postres por nombre..."
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="category-filter">
                  Filtrar por categoría
                </label>
                <select
                  id="category-filter"
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition-colors focus:border-orange-700 sm:w-52"
                  value={category}
                  onChange={handleCategoryChange}
                  disabled={isCategoriesLoading || isCategoriesError}
                >
                  <option value="">
                    {isCategoriesLoading
                      ? 'Cargando categorías...'
                      : isCategoriesError
                        ? 'Categorías no disponibles'
                        : 'Todas las categorías'}
                  </option>
                  {categories.map((categoryOption) => (
                    <option key={categoryOption.id} value={categoryOption.id}>
                      {categoryOption.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {isLoading && (
                <>
                  <span className="sr-only">Cargando productos...</span>
                  {Array.from({ length: 6 }, (_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </>
              )}

              {isError && <p className="md:col-span-3">Error al cargar</p>}

              {!isLoading && !isError && products.length === 0 && (
                <p className="rounded-lg bg-white p-8 text-center text-stone-600 md:col-span-3">
                  No encontramos postres que coincidan con tu búsqueda.
                </p>
              )}

              {!isLoading &&
                !isError &&
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    category={getCategoryName(product.categoryId)}
                    name={product.name}
                    price={product.price}
                  />
                ))}
            </div>

            {!isLoading && !isError && products.length > 0 && (
              <nav
                className="mt-10 flex items-center justify-center gap-4"
                aria-label="Paginación de productos"
              >
                <button
                  type="button"
                  className="rounded-full border border-orange-700 px-5 py-2 font-semibold text-orange-700 transition-colors hover:bg-orange-700 hover:text-white disabled:cursor-not-allowed disabled:border-stone-300 disabled:text-stone-400 disabled:hover:bg-transparent"
                  disabled={page === 1}
                  onClick={() => setPage((currentPage) => currentPage - 1)}
                >
                  Anterior
                </button>

                <span className="text-sm font-semibold text-stone-700">
                  Página {page} de {totalPages}
                </span>

                <button
                  type="button"
                  className="rounded-full border border-orange-700 px-5 py-2 font-semibold text-orange-700 transition-colors hover:bg-orange-700 hover:text-white disabled:cursor-not-allowed disabled:border-stone-300 disabled:text-stone-400 disabled:hover:bg-transparent"
                  disabled={page === totalPages}
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                >
                  Siguiente
                </button>
              </nav>
            )}
          </section>

          <CartDrawer onConfirm={() => setIsModalOpen(true)} />
        </div>
      </main>

      {isModalOpen && (
        <ConfirmOrderModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}

export default Home
