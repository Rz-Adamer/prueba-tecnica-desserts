import useCartStore from '../stores/useCartStore'

function CartDrawer({ onConfirm }) {
  const items = useCartStore((state) => state.items)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const getTotal = useCartStore((state) => state.getTotal)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const total = getTotal()

  return (
    <aside
      className="h-fit rounded-xl bg-white p-6"
      aria-labelledby="cart-title"
    >
      <h2 id="cart-title" className="text-2xl font-bold text-orange-700">
        Your Cart ({itemCount})
      </h2>

      {items.length === 0 ? (
        <div className="flex min-h-52 flex-col items-center justify-center gap-4 text-center">
          <span className="text-5xl" aria-hidden="true">🧁</span>
          <p className="font-semibold text-stone-500">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <>
          <div className="mt-4 divide-y divide-stone-200">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div>
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="mt-2 flex gap-3 text-sm">
                    <span className="font-semibold text-orange-700">
                      {item.quantity}x
                    </span>
                    <span className="text-stone-500">
                      @ ${item.price.toFixed(2)}
                    </span>
                    <span className="font-semibold text-stone-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  className="flex size-5 shrink-0 items-center justify-center rounded-full border border-stone-400 text-xs text-stone-500 transition-colors hover:border-stone-900 hover:text-stone-900"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => removeProduct(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between py-6">
            <span className="text-sm text-stone-600">Order Total</span>
            <strong className="text-2xl">${total.toFixed(2)}</strong>
          </div>

          <div className="mb-6 flex items-center justify-center gap-2 rounded-lg bg-rose-50 px-3 py-4 text-center text-xs text-stone-600">
            <span className="text-green-700" aria-hidden="true">♧</span>
            <p>
              This is a <strong className="text-stone-900">carbon-neutral</strong>{' '}
              delivery
            </p>
          </div>

          <button
            type="button"
            className="w-full rounded-full bg-orange-700 px-6 py-4 font-semibold text-white transition-colors hover:bg-orange-800"
            onClick={onConfirm}
          >
            Confirm Order
          </button>
        </>
      )}
    </aside>
  )
}

export default CartDrawer
