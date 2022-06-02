/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'

const initState = {
   taskName: '',
   text: null,
   files: [],
   image: {
      images: [],
      files: [],
   },
   links: [],
   code: null,
}

export const uploadImages = createAsyncThunk(
   'task/uploadImage',
   async (
      { images, files, taskName, lessonId },
      { rejectWithValue, dispatch }
   ) => {
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
               return result
            })
         )
         const imageUrl = promise.map((image) => {
            return {
               value: image.url,
               taskType: 'IMAGE',
            }
         })
         const promiseFile = await Promise.all(
            files.map((file) => {
               formData.set('file', file.selectedFile)
               const result = fileFetch({
                  path: 'api/file',
                  body: formData,
                  method: 'POST',
               })
               return result
            })
         )
         const fileUrl = promiseFile.map((el) => {
            return {
               value: el.url,
               taskType: 'FILE',
            }
         })
         dispatch(
            addTask({
               tasks: {
                  taskName,
                  taskTypeEntity: [...imageUrl, ...fileUrl],
               },
               lessonId,
            })
         )
      } catch (error) {
         rejectWithValue(error.message)
      }
   }
)

export const addTask = createAsyncThunk(
   'task/addTask',
   async ({ tasks, lessonId }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/tasks/${lessonId}`,
            method: 'POST',
            body: { ...tasks },
         })
         return response
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

export const taskSlice = createSlice({
   name: 'task',
   initialState: initState,
   reducers: {
      addtext(state, action) {
         state.text = action.payload
      },
      selectFile(state, action) {
         const file = action.payload
         state.files = state.files.concat(file)
      },
      selectImage(state, action) {
         const { images, selectedImagefile } = action.payload
         state.image.images = state.image.images.concat(images)
         state.image.files = state.image.files.concat(selectedImagefile)
      },
      addlink(state, action) {
         const { link } = action.payload
         state.links = state.links.concat(link)
      },
      addCode(state, action) {
         state.code = action.payload
      },
      deleteImage(state, action) {
         const index = action.payload
         state.image.images = state.image.images.filter((el, i) => i !== index)
         state.image.files = state.image.files.filter((el, i) => i !== index)
      },
      deleteFile(state, action) {
         const index = action.payload
         state.files = state.files.filter((el, i) => i !== index)
      },
      deleteLink(state, action) {
         const index = action.payload
         state.links = state.links.filter((el, i) => i !== index)
      },
   },
})

export const taskActions = taskSlice.actions
