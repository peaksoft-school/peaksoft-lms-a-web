/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'
import { FILE, IMAGE } from '../utils/constants/general'

// const initState = {
//    taskName: '',
//    text: null,
//    files: [],
//    image: {
//       images: [],
//       files: [],
//    },
//    links: [],
//    code: null,
// }

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
               taskType: IMAGE,
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
               taskType: FILE,
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
const initState = {
   lessonTasks: [],
}
export const taskSlice = createSlice({
   name: 'task',
   initialState: initState,
   reducers: {
      addTask(state, action) {
         console.log(action.payload)
         state.lessonTasks.push(action.payload)
      },
      deleteTask(state, action) {
         console.log(action.payload)
         const id = action.payload
         state.lessonTasks = state.lessonTasks.filter((el) => el.id !== id)
      },
   },
})

export const taskActions = taskSlice.actions
