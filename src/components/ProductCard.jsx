import QuantityStepper from './QuantityStepper'

function ProductCard({ image, category, name, price, isSelected = false, quantity = 1 }) {
  return (
    <article>
      <div className="relative mb-6">
        <img
          className={`aspect-square w-full rounded-lg object-cover ${
            isSelected ? 'outline-2 outline-orange-700' : ''
          }`}
          src={image}
          alt={name}
        />
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
