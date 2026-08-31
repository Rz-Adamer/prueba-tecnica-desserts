import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const hasSameId = (firstId, secondId) => String(firstId) === String(secondId)

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addProduct: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) =>
            hasSameId(item.id, product.id),
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                hasSameId(item.id, product.id)
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          }

          return {
            items: [...state.items, { ...product, quantity: 1 }],
          }
        }),

      removeProduct: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => !hasSameId(item.id, productId)),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            hasSameId(item.id, productId)
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.flatMap((item) => {
            if (!hasSameId(item.id, productId)) return [item]
            if (item.quantity <= 1) return []

            return [{ ...item, quantity: item.quantity - 1 }]
          }),
        })),

      getTotal: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'desserts-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

export default useCartStore
