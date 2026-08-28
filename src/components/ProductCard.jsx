import { Link } from 'react-router-dom'
import QuantityStepper from './QuantityStepper'

function ProductCard({ id, image, category, name, price, isSelected = false, quantity = 1 }) {
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
          <QuantityStepper isSelected={isSelected} quantity={quantity} />
        </div>
      </div>

      <div>
        <p className="text-sm text-stone-500">{category}</p>
        <h2 className="text-base font-semibold text-stone-900">{name}</h2>
        <p className="font-semibold text-orange-700">${price.toFixed(2)}</p>
      </div>
    </article>
  )
}

export default ProductCard
