/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../components/UI/notification/Notification'
import { FILE, IMAGE } from '../utils/constants/general'

export const uploadFile = createAsyncThunk(
   'task/uploadFile',
   async (
      { lessonTasks, taskName, lessonId },
      { rejectWithValue, dispatch }
   ) => {
      const formData = new FormData()
      try {
         const images = lessonTasks.filter((task) => task.taskType === IMAGE)
         const files = lessonTasks.filter((task) => task.taskType === FILE)
         console.log('files before upload', files)
         const uploadedImages = await Promise.all(
            images.map(async (task) => {
               formData.append('file', task.selectedImagefile)
               const result = await fileFetch({
                  path: 'api/file',
                  body: formData,
                  method: 'POST',
               })
               return { ...result, id: task.id }
            })
         )
         console.log('images after upload', uploadedImages)
         const lessonTaskWithUploadedImages = lessonTasks.map((task) => {
            const updatedTask = { taskType: task.taskType, name: '', value: '' }
            uploadedImages.forEach((image) => {
               if (task.id === image.id) {
                  updatedTask.value = image.url
               }
            })
            return updatedTask
         })
         console.log('updated tasks', lessonTaskWithUploadedImages)
         // const imageUrl = promise.map((image) => {
         //    return {
         //       value: image.url,
         //       name: 'image',
         //       taskType: IMAGE,
         //    }
         // })
         // const promiseFile = await Promise.all(
         //    lessonTasks.map((task) => {
         //       formData.append('file', task.selectedFile)
         //       const result = fileFetch({
         //          path: 'api/file',
         //          body: formData,
         //          method: 'POST',
         //       })
         //       return result
         //    })
         // )
         // const fileUrl = promiseFile.map((el) => {
         //    return {
         //       value: el.url,
         //       name: 'file',
         //       taskType: FILE,
         //    }
         // })
         // dispatch(
         //    sendLessonTask({
         //       tasks: {
         //          taskName,
         //          taskTypeRequests: [...imageUrl, ...fileUrl],
         //       },
         //       lessonId,
         //    })
         // )
      } catch (error) {
         rejectWithValue(error.message)
      }
   }
)

export const sendLessonTask = createAsyncThunk(
   'task/sendLessonTask',
   async ({ tasks, lessonId }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/tasks/${lessonId}`,
            method: 'POST',
            body: tasks,
         })
         showSuccessMessage('task successfully created')
         return response
      } catch (error) {
         showErrorMessage("can't create lesson")
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
