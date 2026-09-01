function QuantityStepper({
  isSelected = false,
  quantity = 1,
  onAdd,
  onDecrease,
  onIncrease,
}) {
  if (!isSelected) {
    return (
      <button
        type="button"
        className="flex w-40 items-center justify-center gap-2 rounded-full border border-stone-400 bg-white px-4 py-3 text-sm font-semibold text-stone-900 transition-colors hover:border-orange-700 hover:text-orange-700"
        onClick={onAdd}
      >
        <svg
          className="size-5 text-orange-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20.5 7H6" />
          <circle cx="10" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
        Add to Cart
      </button>
    )
  }

  return (
    <div className="flex w-40 items-center justify-between rounded-full bg-orange-700 px-3 py-3 text-white">
      <button
        type="button"
        className="flex size-5 items-center justify-center rounded-full border border-white transition-colors hover:bg-white hover:text-orange-700"
        aria-label="Decrease quantity"
        onClick={onDecrease}
      >
        <span aria-hidden="true">−</span>
      </button>

      <span className="text-sm font-semibold" aria-label={`Quantity: ${quantity}`}>
        {quantity}
      </span>

      <button
        type="button"
        className="flex size-5 items-center justify-center rounded-full border border-white transition-colors hover:bg-white hover:text-orange-700"
        aria-label="Increase quantity"
        onClick={onIncrease}
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  )
}

export default QuantityStepper
