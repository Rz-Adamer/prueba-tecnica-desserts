import axios from 'axios'
import apiClient from './apiClient'

/** @typedef {import('../interfaces/product').Product} Product */
/** @typedef {import('../interfaces/product').ProductInput} ProductInput */
/** @typedef {import('../interfaces/product').ProductFilters} ProductFilters */
/** @typedef {import('../interfaces/product').PaginatedProducts} PaginatedProducts */

const ARTIFICIAL_DELAY = 1200

function delay(milliseconds = ARTIFICIAL_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

/**
 * @param {ProductFilters} filters
 * @returns {Promise<PaginatedProducts>}
 */
export async function getProducts({ search, category, page }) {
  const response = await apiClient.get('/products', {
    params: {
      _page: page,
      _per_page: 8,
      'name:contains': search.trim() || undefined,
      categoryId: category || undefined,
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

/**
 * @param {ProductInput} product
 * @returns {Promise<Product>}
 */
export async function createProduct(product) {
  const response = await apiClient.post('/products', product)

  return response.data
}

/**
 * @param {string} id
 * @param {ProductInput} product
 * @returns {Promise<Product>}
 */
export async function updateProduct(id, product) {
  const response = await apiClient.put(`/products/${id}`, product)

  return response.data
}

/** @param {string} id */
export async function deleteProduct(id) {
  await apiClient.delete(`/products/${id}`)
}

export function isProductNotFoundError(error) {
  return axios.isAxiosError(error) && error.response?.status === 404
}
