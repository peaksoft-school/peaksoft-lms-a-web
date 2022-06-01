import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'

const initState = {
   taskName: '',
   text: null,
   file: {
      fileName: [],
      files: [],
   },
   image: {
      images: [],
      files: [],
   },
   link: {
      linkText: [],
      link: [],
   },
}

export const uploadImages = createAsyncThunk(
   'listing/uploadImageListing',
   async ({ images, lessonTask }, { rejectWithValue, dispatch }) => {
      const formData = new FormData()
      try {
         const promise = await Promise.all(
            images.map((image) => {
               formData.set('file', image)
               const result = fileFetch({
                  path: 'api/file',
                  body: formData,
                  method: 'POST',
               })
               console.log(result)
               return result
            })
         )
         const imagesId = promise.map((image) => image.url)
         console.log(imagesId)
         dispatch(
            addListing({
               listingData: {
                  ...lessonTask,
                  taskTypeEntity: [
                     ...lessonTask.taskTypeEntity,
                     { ...lessonTask.taskTypeEntity[0], value: imagesId },
                  ],
               },
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
         state.image.images = state.image.images.concat(action.payload.images)
         state.image.files = state.image.files.concat(action.payload.files)
      },
      addlink(state, action) {
         const { link, linkText } = action.payload
         state.linkText = linkText
         state.link = link
      },
      addtext(state, action) {
         state.text = action.payload
      },
      deleteFile(state, action) {
         const index = action.payload
         state.image.images = state.image.images.filter((el, i) => i !== index)
         state.image.files = state.image.files.filter((el, i) => i !== index)
      },
   },
})

export const taskActions = taskSlice.actions
