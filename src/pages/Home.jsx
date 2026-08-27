import { useState } from 'react'
import CartDrawer from '../components/CartDrawer'
import ConfirmOrderModal from '../components/ConfirmOrderModal'
import ProductCard from '../components/ProductCard'
import database from '../../db.json'

const { products } = database

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <main className="min-h-screen bg-rose-50 px-6 py-8 text-stone-900 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <section aria-labelledby="desserts-title">
            <h1 id="desserts-title" className="mb-8 text-4xl font-bold">
              Desserts
            </h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  category={product.category}
                  name={product.name}
                  price={product.price}
                  isSelected={product.id === 2}
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
