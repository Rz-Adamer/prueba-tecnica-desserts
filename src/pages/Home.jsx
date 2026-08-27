import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import CartDrawer from '../components/CartDrawer'
import ConfirmOrderModal from '../components/ConfirmOrderModal'
import ProductCard from '../components/ProductCard'
import ProductSkeleton from '../components/ProductSkeleton'

async function getProducts() {
  const response = await axios.get('http://localhost:3000/products')

  await new Promise((resolve) => setTimeout(resolve, 1200))

  return response.data
}

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <>
      <main className="min-h-screen bg-rose-50 px-6 py-8 text-stone-900 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <section aria-labelledby="desserts-title">
            <h1 id="desserts-title" className="mb-8 text-4xl font-bold">
              Desserts
            </h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {isLoading && (
                <>
                  <span className="sr-only">Cargando productos...</span>
                  {Array.from({ length: 6 }, (_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </>
              )}

              {isError && <p>Error al cargar</p>}

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
