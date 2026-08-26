function ProductCard({ image, category, name, price }) {
  return (
    <article>
      <img
        className="aspect-square w-full rounded-lg object-cover"
        src={image}
        alt={name}
      />

      <div className="pt-4">
        <p className="text-sm text-stone-500">{category}</p>
        <h2 className="text-base font-semibold text-stone-900">{name}</h2>
        <p className="font-semibold text-orange-700">${price.toFixed(2)}</p>
      </div>
    </article>
  )
}

export default ProductCard
