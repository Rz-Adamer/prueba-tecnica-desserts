import apiClient from './apiClient.js'

/** @typedef {import('../interfaces/category').Category} Category */

/** @returns {Promise<Category[]>} */
export async function getCategories() {
  const response = await apiClient.get('/categories')

  return response.data
}
