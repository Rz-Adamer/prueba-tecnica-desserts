function ProductSkeleton() {
  return (
    <article className="animate-pulse" aria-hidden="true">
      <div className="relative mb-6">
        <div className="aspect-square w-full rounded-lg bg-stone-200" />
        <div className="absolute bottom-0 left-1/2 h-11 w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-stone-300" />
      </div>

      <div className="space-y-2">
        <div className="h-3 w-20 rounded-full bg-stone-200" />
        <div className="h-4 w-3/4 rounded-full bg-stone-300" />
        <div className="h-4 w-16 rounded-full bg-stone-300" />
      </div>
    </article>
  )
}

export default ProductSkeleton
