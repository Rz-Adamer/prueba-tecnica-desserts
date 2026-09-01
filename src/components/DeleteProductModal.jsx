function DeleteProductModal({ product, onCancel, onConfirm, isDeleting, error }) {
  if (!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <section
        className="w-full max-w-md rounded-xl bg-white p-7 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-product-title"
      >
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-red-100 text-2xl text-red-700">
          <span aria-hidden="true">!</span>
        </div>
        <h2 id="delete-product-title" className="text-2xl font-bold">
          Eliminar producto
        </h2>
        <p className="mt-3 text-stone-600">
          ¿Estás seguro de eliminar <strong>{product.name}</strong>? Esta acción no
          se puede deshacer.
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            No se pudo eliminar el producto.
          </p>
        )}

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-full border border-stone-300 px-5 py-3 font-semibold"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="rounded-full bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800 disabled:cursor-wait disabled:opacity-60"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default DeleteProductModal
