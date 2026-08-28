import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

async function getProduct(id) {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const response = await axios.get(`http://localhost:3000/products/${id}`)

  return response.data
}

function ProductDetailSkeleton() {
  return (
    <div className="grid animate-pulse gap-8 md:grid-cols-2" aria-hidden="true">
      <div className="aspect-square w-full rounded-xl bg-stone-200" />
      <div className="flex flex-col justify-center space-y-4">
        <div className="h-4 w-24 rounded-full bg-stone-200" />
        <div className="h-10 w-3/4 rounded-full bg-stone-300" />
        <div className="h-6 w-20 rounded-full bg-stone-300" />
        <div className="h-12 w-44 rounded-full bg-stone-200" />
      </div>
    </div>
  )
}

function ProductDetail() {
  const { id } = useParams()
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    retry: false,
  })

  const isNotFound = axios.isAxiosError(error) && error.response?.status === 404

  if (isNotFound) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-rose-50 px-6 text-center text-stone-900">
        <div className="max-w-md rounded-xl bg-white p-10 shadow-sm">
          <p className="text-6xl font-bold text-orange-700">404</p>
          <h1 className="mt-4 text-2xl font-bold">Producto no encontrado</h1>
          <p className="mt-3 text-stone-500">
            El producto que buscas no existe o ya no está disponible.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block rounded-full bg-orange-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-800"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-rose-50 px-6 text-center text-stone-900">
        <div>
          <h1 className="text-2xl font-bold">No pudimos cargar el producto</h1>
          <Link className="mt-6 inline-block font-semibold text-orange-700" to="/">
            Volver al inicio
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-rose-50 px-6 py-8 text-stone-900 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="mb-8 inline-flex font-semibold text-orange-700 hover:text-orange-800"
        >
          ← Volver a Desserts
        </Link>

        {isLoading ? (
          <>
            <span className="sr-only">Cargando detalle del producto...</span>
            <ProductDetailSkeleton />
          </>
        ) : (
          <article className="grid gap-8 rounded-xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-8">
            <img
              className="aspect-square w-full rounded-xl object-cover"
              src={product.image}
              alt={product.name}
            />

            <div className="flex flex-col justify-center">
              <p className="text-sm text-stone-500">{product.category}</p>
              <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>
              <p className="mt-4 text-2xl font-bold text-orange-700">
                ${product.price.toFixed(2)}
              </p>
              <p className="mt-6 leading-7 text-stone-600">
                Disfruta este delicioso postre preparado para completar tu pedido.
              </p>
              <Link
                to="/"
                className="mt-8 w-fit rounded-full bg-orange-700 px-7 py-3 font-semibold text-white transition-colors hover:bg-orange-800"
              >
                Seguir comprando
              </Link>
            </div>
          </article>
        )}
      </div>
    </main>
  )
}

export default ProductDetail
