import axiosClient from './axiosClient'

const ARTIFICIAL_DELAY = 1200

function delay(milliseconds = ARTIFICIAL_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export async function getProducts({ search, category }) {
  const response = await axiosClient.get('/products', {
    params: {
      'name:contains': search.trim() || undefined,
      category: category || undefined,
    },
  })

  await delay()

  return response.data
}

export async function getProductById(id) {
  await delay()

  const response = await axiosClient.get(`/products/${id}`)

  return response.data
}
