import { BASE_URL } from '../utils/constants/general'
import { store } from '../store'

export const fileFetch = async (options) => {
   const { token } = store.getState().auth.user
   try {
      const { path, body, method } = options
      const requestOptions = {
         method: method || 'GET',
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }
      if (method !== 'GET') {
         requestOptions.body = body || {}
      }

      const response = await fetch(`${BASE_URL}/${path}`, requestOptions)
      const result = await response.json()
      console.log(result)
      if (!response.ok) {
         let errorMessage = 'Some thing went wrong'
         if (result && result.message) {
            errorMessage = result.message
         }
         throw new Error(errorMessage)
      }
      return result
   } catch (error) {
      throw new Error(error.message)
   }
}
