import { products } from './data/products'

function App() {
  return (
    <main className="min-h-screen bg-rose-50 px-6 py-8 text-stone-900 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <section aria-labelledby="desserts-title">
          <h1 id="desserts-title" className="mb-8 text-4xl font-bold">
            Desserts
          </h1>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article key={product.id}>
                <img
                  className="aspect-square w-full rounded-lg object-cover"
                  src={product.image}
                  alt={product.name}
                />
                <div className="pt-4">
                  <p className="text-sm text-stone-500">{product.category}</p>
                  <h2 className="font-semibold">{product.name}</h2>
                  <p className="font-semibold text-orange-700">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="h-fit rounded-xl bg-white p-6" aria-labelledby="cart-title">
          <h2 id="cart-title" className="text-2xl font-bold text-orange-700">
            Your Cart (0)
          </h2>
          <div className="flex min-h-52 items-center justify-center text-center">
            <p className="font-semibold text-stone-500">
              Your added items will appear here
            </p>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default App
