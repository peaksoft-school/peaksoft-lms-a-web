import { BASE_URL } from '../utils/constants/general'

export const baseFetch = async (options) => {
   try {
      const { path, body, method, params } = options
      const requestOptions = {
         method: method || 'GET',
         headers: { 'Content-Type': 'application/json' },
      }
      if (method !== 'GET') {
         requestOptions.body = JSON.stringify(body || {})
      }
      if (params) {
         const queryParamsStringValue = Object.keys(params)
            .map((paramKey) => `${paramKey}=${params[paramKey]}`)
            .join('&')
         const path = `${path}?${queryParamsStringValue}`
      }
      const response = await fetch(`${BASE_URL}/${path}`, requestOptions)
      if (!response.ok) {
         throw new Error('Some thing went wrong')
      }
      return response.json()
   } catch (e) {
      throw new Error(e.message)
   }
}
