import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import CartDrawer from '../components/CartDrawer'
import ConfirmOrderModal from '../components/ConfirmOrderModal'
import ProductCard from '../components/ProductCard'
import ProductSkeleton from '../components/ProductSkeleton'

const categories = [
  'Waffle',
  'Crème Brûlée',
  'Macaron',
  'Tiramisu',
  'Baklava',
  'Pie',
  'Cake',
  'Brownie',
  'Panna Cotta',
]

async function getProducts({ search, category }) {
  const response = await axios.get('http://localhost:3000/products', {
    params: {
      'name:contains': search.trim() || undefined,
      category: category || undefined,
    },
  })

  await new Promise((resolve) => setTimeout(resolve, 1200))

  return response.data
}

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', search, category],
    queryFn: () => getProducts({ search, category }),
  })

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
                  onChange={(event) => setSearch(event.target.value)}
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
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((categoryOption) => (
                    <option key={categoryOption} value={categoryOption}>
                      {categoryOption}
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
                    image={product.image}
                    category={product.category}
                    name={product.name}
                    price={product.price}
                    isSelected={Number(product.id) === 2}
                    quantity={4}
                  />
                ))}
            </div>
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
