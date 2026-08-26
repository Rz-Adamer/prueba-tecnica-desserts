function ConfirmOrderModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <section
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl sm:p-10"
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
            <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
              <div>
                <h3 className="text-sm font-semibold">Classic Tiramisu</h3>
                <p className="mt-2 text-sm">
                  <span className="mr-4 font-semibold text-orange-700">1x</span>
                  <span className="text-stone-500">@ $5.50</span>
                </p>
              </div>
              <strong className="text-sm">$5.50</strong>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <div>
                <h3 className="text-sm font-semibold">Vanilla Bean Crème Brûlée</h3>
                <p className="mt-2 text-sm">
                  <span className="mr-4 font-semibold text-orange-700">4x</span>
                  <span className="text-stone-500">@ $7.00</span>
                </p>
              </div>
              <strong className="text-sm">$28.00</strong>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <div>
                <h3 className="text-sm font-semibold">Vanilla Panna Cotta</h3>
                <p className="mt-2 text-sm">
                  <span className="mr-4 font-semibold text-orange-700">2x</span>
                  <span className="text-stone-500">@ $6.50</span>
                </p>
              </div>
              <strong className="text-sm">$13.00</strong>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-stone-200 pt-5">
            <span className="text-sm text-stone-600">Order Total</span>
            <strong className="text-2xl">$46.50</strong>
          </div>
        </div>

        <button
          type="button"
          className="mt-8 w-full rounded-full bg-orange-700 px-6 py-4 font-semibold text-white transition-colors hover:bg-orange-800"
          onClick={onClose}
        >
          Start New Order
        </button>
      </section>
    </div>
  )
}

export default ConfirmOrderModal
