import { Link } from 'react-router-dom'
import useCartStore from '../stores/useCartStore'
import QuantityStepper from './QuantityStepper'

function ProductCard({ id, image, category, name, price }) {
  const cartItem = useCartStore((state) =>
    state.items.find((item) => String(item.id) === String(id)),
  )
  const addProduct = useCartStore((state) => state.addProduct)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const isSelected = Boolean(cartItem)
  const quantity = cartItem?.quantity ?? 0
  const product = { id, image, category, name, price }

  return (
    <article>
      <div className="relative mb-6">
        <Link
          to={`/producto/${id}`}
          className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
          aria-label={`Ver detalle de ${name}`}
        >
          <img
            className={`aspect-square w-full rounded-lg object-cover transition-opacity hover:opacity-90 ${
              isSelected ? 'outline-2 outline-orange-700' : ''
            }`}
            src={image}
            alt={name}
          />
        </Link>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <QuantityStepper
            isSelected={isSelected}
            quantity={quantity}
            onAdd={() => addProduct(product)}
            onDecrease={() => decreaseQuantity(id)}
            onIncrease={() => increaseQuantity(id)}
          />
        </div>
      </div>

      <div>
        <span className="inline-flex rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-800">
          {category}
        </span>
        <h2 className="mt-2 text-base font-semibold text-stone-900">{name}</h2>
        <p className="font-semibold text-orange-700">${price.toFixed(2)}</p>
      </div>
    </article>
  )
}

export default ProductCard
