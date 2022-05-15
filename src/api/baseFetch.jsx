import { BASE_URL } from '../utils/constants/general'
import { store } from '../store'

export const baseFetch = async (options) => {
   const secretToken = store.getState().auth.user.token
   try {
      const { path, body, method, params } = options
      const requestOptions = {
         method: method || 'GET',
         headers: secretToken
            ? {
                 'Content-Type': 'application/json',
                 Authentication: `Bearer ${secretToken}`,
              }
            : {
                 'Content-Type': 'application/json',
              },
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
      const result = await response.json()
      if (!response.ok) {
         let errorMessage = 'Some thing went wrong'
         if (result && result.message) {
            errorMessage = result.message
         }
         throw new Error(errorMessage)
      }
      return result
   } catch (e) {
      throw new Error(e.message)
   }
}
