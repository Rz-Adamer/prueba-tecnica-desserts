import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre no puede superar los 80 caracteres'),
  price: z.coerce
    .number({ error: 'Ingresa un precio válido' })
    .positive('El precio debe ser mayor a 0'),
  categoryId: z.coerce
    .number({ error: 'Selecciona una categoría' })
    .int()
    .positive('Selecciona una categoría'),
  image: z
    .string()
    .trim()
    .url('Ingresa una URL de imagen válida'),
})
