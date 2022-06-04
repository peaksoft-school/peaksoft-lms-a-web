/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'
import { FILE, IMAGE } from '../utils/constants/general'

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
         state.lessonTasks.push(action.payload)
      },
      deleteTask(state, action) {
         const id = action.payload
         state.lessonTasks = state.lessonTasks.filter((el) => el.id !== id)
      },
      addText(state, action) {
         const { id, textValue } = action.payload
         state.lessonTasks = state.lessonTasks.map((el) => {
            if (el.id === id) {
               return {
                  ...el,
                  value: textValue,
               }
            }
            return el
         })
      },
      addCode(state, action) {
         const { id, code } = action.payload
         state.lessonTasks = state.lessonTasks.map((el) => {
            if (el.id === id) {
               return {
                  ...el,
                  value: code,
               }
            }
            return el
         })
      },
   },
})

export const taskActions = taskSlice.actions
