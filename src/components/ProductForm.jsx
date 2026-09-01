import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { productSchema } from '../schemas/product.schema'

function FieldError({ message }) {
  if (!message) return null

  return <p className="mt-1 text-sm text-red-600">{message}</p>
}

function ProductForm({
  categories,
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel,
  apiError,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label className="mb-1 block text-sm font-semibold" htmlFor="product-name">
          Nombre
        </label>
        <input
          id="product-name"
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-orange-700"
          placeholder="Ej. Chocolate Cake"
          {...register('name')}
        />
        <FieldError message={errors.name?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="product-price">
            Precio
          </label>
          <input
            id="product-price"
            type="number"
            min="0"
            step="0.01"
            className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-orange-700"
            placeholder="0.00"
            {...register('price')}
          />
          <FieldError message={errors.price?.message} />
        </div>

        <div>
          <label
            className="mb-1 block text-sm font-semibold"
            htmlFor="product-category"
          >
            Categoría
          </label>
          <select
            id="product-category"
            className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 outline-none focus:border-orange-700"
            {...register('categoryId')}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <FieldError message={errors.categoryId?.message} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold" htmlFor="product-image">
          URL de imagen
        </label>
        <input
          id="product-image"
          type="url"
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-orange-700"
          placeholder="https://example.com/dessert.jpg"
          {...register('image')}
        />
        <FieldError message={errors.image?.message} />
      </div>

      {apiError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          No se pudo guardar el producto. Inténtalo nuevamente.
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="rounded-full border border-stone-300 px-6 py-3 font-semibold text-stone-700 hover:border-stone-500"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-full bg-orange-700 px-6 py-3 font-semibold text-white hover:bg-orange-800 disabled:cursor-wait disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default ProductForm
