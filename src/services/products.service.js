import axios from 'axios'
import apiClient from './apiClient'

/** @typedef {import('../interfaces/product').Product} Product */
/** @typedef {import('../interfaces/product').ProductFilters} ProductFilters */

const ARTIFICIAL_DELAY = 1200

function delay(milliseconds = ARTIFICIAL_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

/**
 * @param {ProductFilters} filters
 * @returns {Promise<Product[]>}
 */
export async function getProducts({ search, category }) {
  const response = await apiClient.get('/products', {
    params: {
      'name:contains': search.trim() || undefined,
      category: category || undefined,
    },
  })

  await delay()

  return response.data
}

/**
 * @param {string} id
 * @returns {Promise<Product>}
 */
export async function getProductById(id) {
  await delay()

  const response = await apiClient.get(`/products/${id}`)

  return response.data
}

export function isProductNotFoundError(error) {
  return axios.isAxiosError(error) && error.response?.status === 404
}
