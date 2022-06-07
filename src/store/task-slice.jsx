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

         const uploadedFiles = await Promise.all(
            files.map(async (file) => {
               formData.append('file', file.selectedFile)
               const fileResult = await fileFetch({
                  path: 'api/file',
                  method: 'POST',
                  body: formData,
               })
               return { ...fileResult, id: file.id }
            })
         )
         const lessonTaskWithUploadedTasks = lessonTasks.map((task) => {
            const updatedTask = {
               taskType: task.taskType,
               name: task.name,
               value: JSON.stringify(task.value),
            }
            uploadedFiles.forEach((file) => {
               if (task.id === file.id) {
                  updatedTask.value = file.url
               }
            })
            uploadedImages.forEach((image) => {
               if (task.id === image.id) {
                  updatedTask.value = image.url
               }
            })
            return updatedTask
         })
         dispatch(
            sendLessonTask({
               tasks: {
                  taskName,
                  taskTypeRequests: lessonTaskWithUploadedTasks,
               },
               lessonId,
            })
         )
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
         showErrorMessage("can't create task")
         return rejectWithValue(error)
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
