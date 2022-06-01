import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'

const initState = {
   taskName: '',
   file: null,
   image: null,
   linkText: null,
   link: null,
   text: null,
}

export const uploadImages = createAsyncThunk(
   'listing/uploadImageListing',
   async ({ listOfImg, data }, { rejectWithValue, dispatch }) => {
      const formData = new FormData()
      try {
         const promise = await Promise.all(
            listOfImg.map((image) => {
               formData.set('file', image)
               const images = fileFetch({
                  path: 'api/file',
                  body: formData,
                  method: 'POST',
               })
               console.log(images)
               return images
            })
         )
         const images = promise.map((image) => image.id)
         console.log(images)
         dispatch(
            addListing({
               listingData: {
                  ...data,
                  images,
               },
               // navigateAfterSuccessUpload,
            })
         )
      } catch (error) {
         rejectWithValue(error.message)
      }
   }
)

export const addListing = createAsyncThunk(
   'listing/addListing',
   // eslint-disable-next-line consistent-return
   async ({ listingData }, { rejectWithValue }) => {
      try {
         const result = await baseFetch({
            path: 'api/task/2',
            method: 'POST',
            body: { ...listingData },
         })
         return result
      } catch (error) {
         rejectWithValue(error)
      }
   }
)
export const taskSlice = createSlice({
   name: 'task',
   initialState: initState,
   reducers: {
      selectFile(state, action) {
         state.file = action.payload
      },
      selectImage(state, action) {
         state.image = action.payload
      },
      addlink(state, action) {
         const { link, linkText } = action.payload
         state.linkText = linkText
         state.link = link
      },
      addtext(state, action) {
         state.text = action.payload
      },
   },
})

export const taskActions = taskSlice.actions
