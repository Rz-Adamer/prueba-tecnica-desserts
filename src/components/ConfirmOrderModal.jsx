import useCartStore from '../stores/useCartStore'

function ConfirmOrderModal({ onClose }) {
  const items = useCartStore((state) => state.items)
  const getTotal = useCartStore((state) => state.getTotal)
  const clearCart = useCartStore((state) => state.clearCart)
  const total = getTotal()

  const handleStartNewOrder = () => {
    clearCart()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <section
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-2xl sm:p-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirmed-title"
      >
        <div className="mb-6 flex size-12 items-center justify-center rounded-full border-2 border-green-600 text-2xl text-green-600">
          <span aria-hidden="true">✓</span>
        </div>

        <h2 id="order-confirmed-title" className="text-4xl font-bold text-stone-900">
          Order Confirmed
        </h2>
        <p className="mt-2 text-stone-500">We hope you enjoy your food!</p>

        <div className="mt-8 rounded-lg bg-rose-50 p-5">
          <div className="divide-y divide-stone-200">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 py-4 first:pt-0"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="size-12 rounded-md object-cover"
                    src={item.image}
                    alt=""
                  />
                  <div>
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <p className="mt-1 text-sm">
                      <span className="mr-4 font-semibold text-orange-700">
                        {item.quantity}x
                      </span>
                      <span className="text-stone-500">
                        @ ${item.price.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
                <strong className="text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-stone-200 pt-5">
            <span className="text-sm text-stone-600">Order Total</span>
            <strong className="text-2xl">${total.toFixed(2)}</strong>
          </div>
        </div>

        <button
          type="button"
          className="mt-8 w-full rounded-full bg-orange-700 px-6 py-4 font-semibold text-white transition-colors hover:bg-orange-800"
          onClick={handleStartNewOrder}
        >
          Start New Order
        </button>
      </section>
    </div>
  )
}

export default ConfirmOrderModal
