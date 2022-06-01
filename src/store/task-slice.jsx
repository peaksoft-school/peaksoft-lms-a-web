/* eslint-disable consistent-return */
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
      links: [],
   },
   code: null,
}

export const uploadImages = createAsyncThunk(
   'task/uploadImage',
   async ({ images, taskName }, { rejectWithValue, dispatch }) => {
      console.log(images)
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
               value: image,
               taskType: 'IMAGE',
            }
         })
         dispatch(
            addTask({
               taskName,
               taskTypeEntity: [...imageUrl],
            })
         )
      } catch (error) {
         rejectWithValue(error.message)
      }
   }
)

export const addTask = createAsyncThunk(
   'task/addTask',
   async (tasks, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: 'api/task/2',
            method: 'POST',
            body: { ...tasks },
         })
         console.log(response)
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
         const { nameOfFile, files } = action.payload
         state.file.fileName = state.file.fileName.concat(nameOfFile)
         state.file.files = state.file.files.concat(files)
      },
      selectImage(state, action) {
         const { images, files } = action.payload
         state.image.images = state.image.images.concat(images)
         state.image.files = state.image.files.concat(files)
      },
      addlink(state, action) {
         const { link, textLink } = action.payload
         state.link.linkText = state.link.linkText.concat(textLink)
         state.link.links = state.link.links.concat(link)
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
         state.file.fileName = state.file.fileName.filter(
            (el, i) => i !== index
         )
         state.file.files = state.file.files.filter((el, i) => i !== index)
      },
      deleteLink(state, action) {
         const index = action.payload
         state.link.linkText = state.link.linkText.filter(
            (el, i) => i !== index
         )
         state.link.links = state.link.links.filter((el, i) => i !== index)
      },
   },
})

export const taskActions = taskSlice.actions
