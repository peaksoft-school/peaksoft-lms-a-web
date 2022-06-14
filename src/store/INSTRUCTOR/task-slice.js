import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../../api/baseFetch'
import { fileFetch } from '../../api/fileFetch'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../components/UI/notification/Notification'
import { FILE, IMAGE, LESSON_TASK } from '../../utils/constants/general'
import { localStorageHelper } from '../../utils/helpers/general'

export const uploadFile = createAsyncThunk(
   'task/uploadFile',
   async (
      {
         lessonTasks,
         taskName,
         lessonId,
         navigateToMaterials,
         isUpdate,
         taskId,
      },
      { rejectWithValue, dispatch }
   ) => {
      const formData = new FormData()
      try {
         const images = lessonTasks.filter((task) => task.taskType === IMAGE)
         const files = lessonTasks.filter((task) => task.taskType === FILE)

         const uploadedImages = await Promise.all(
            images.map(async (task) => {
               if (task.selectedImageFile) {
                  formData.set('file', task.selectedImageFile)
                  const result = await fileFetch({
                     path: 'api/file',
                     method: 'POST',
                     body: formData,
                  })
                  return { value: result.url, id: task.id }
               }
               return task
            })
         )
         const uploadedFiles = await Promise.all(
            files.map(async (file) => {
               if (file.selectedFile) {
                  formData.set('file', file.selectedFile)
                  const fileResult = await fileFetch({
                     path: 'api/file',
                     method: 'POST',
                     body: formData,
                  })
                  return { value: fileResult.url, id: file.id }
               }
               return file
            })
         )
         const lessonTaskWithUploadedTasks = lessonTasks.map((task) => {
            const updatedTask = {
               taskType: task.taskType,
               name: task.name,
               value: task.value,
            }
            uploadedFiles.forEach((file) => {
               if (task.id === file.id) {
                  updatedTask.value = file.value
               }
            })
            uploadedImages.forEach((image) => {
               if (task.id === image.id) {
                  updatedTask.value = image.value
               }
            })
            return updatedTask
         })
         if (isUpdate) {
            dispatch(
               editTask({
                  tasks: {
                     taskName,
                     taskTypeRequests: lessonTaskWithUploadedTasks,
                  },
                  taskId,
                  navigateToMaterials,
               })
            )
         } else {
            dispatch(
               sendLessonTask({
                  tasks: {
                     taskName,
                     taskTypeRequests: lessonTaskWithUploadedTasks,
                  },
                  lessonId,
                  navigateToMaterials,
               })
            )
         }
      } catch (error) {
         rejectWithValue(error.message)
      }
   }
)

export const sendLessonTask = createAsyncThunk(
   'task/sendLessonTask',
   async (
      { tasks, lessonId, navigateToMaterials },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const response = await baseFetch({
            path: `api/tasks/${lessonId}`,
            method: 'POST',
            body: tasks,
         })
         showSuccessMessage('Задание успешно создано')
         navigateToMaterials()
         dispatch(taskActions.clearTask())
         return response
      } catch (error) {
         showErrorMessage('Не удалось создать задание')
         return rejectWithValue(error)
      }
   }
)

export const getLessonTask = createAsyncThunk(
   'task/getLeassonTask',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/tasks/${id}`,
            method: 'GET',
         })
         dispatch(taskActions.setLessonTask(response))
         return response
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const editTask = createAsyncThunk(
   'task/editTask',
   async (
      { tasks, taskId, navigateToMaterials },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const response = await baseFetch({
            path: `api/tasks/${taskId}`,
            method: 'PUT',
            body: tasks,
         })
         showSuccessMessage('Изменения успешно сохранены')
         dispatch(taskActions.clearTask())
         navigateToMaterials()
         return response
      } catch (error) {
         showErrorMessage('Не удалось изменить данные')
         return rejectWithValue(error)
      }
   }
)

export const deleteLessonTask = createAsyncThunk(
   'task/deleteTask',
   async (taskId, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/tasks/${taskId}`,
            method: 'DELETE',
         })
         return response
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

const initState = {
   task: {
      taskName: '',
      lessonTasks: [],
   },
   isLoading: false,
}

const taskData = localStorageHelper.laod(LESSON_TASK)
   ? { ...initState, task: localStorageHelper.laod(LESSON_TASK) }
   : initState

const setFulfilled = (state) => {
   state.isLoading = false
}

const setPending = (state) => {
   state.isLoading = true
}

export const taskSlice = createSlice({
   name: 'task',
   initialState: taskData,
   reducers: {
      setTaskName(state, action) {
         state.task.taskName = action.payload
      },
      addTask(state, action) {
         state.task.lessonTasks.push(action.payload)
      },
      deleteTask(state, action) {
         const id = action.payload
         state.task.lessonTasks = state.task.lessonTasks.filter(
            (el) => el.id !== id
         )
      },
      setText(state, action) {
         const { id, textValue } = action.payload
         state.task.lessonTasks = state.task.lessonTasks.map((el) => {
            if (el.id === id) {
               return {
                  ...el,
                  value: textValue,
               }
            }
            return el
         })
      },
      setCode(state, action) {
         const { id, code } = action.payload
         state.task.lessonTasks = state.task.lessonTasks.map((el) => {
            if (el.id === id) {
               return {
                  ...el,
                  value: code,
               }
            }
            return el
         })
      },
      setLessonTask(state, action) {
         const { taskTypeResponses, taskName } = action.payload
         state.task.taskName = taskName
         state.task.lessonTasks = taskTypeResponses
      },
      clearTask(state) {
         state.task.taskName = ''
         state.task.lessonTasks = []
      },
   },
   extraReducers: {
      [sendLessonTask.pending]: setPending,
      [sendLessonTask.fulfilled]: setFulfilled,
      [sendLessonTask.rejected]: setFulfilled,
      [uploadFile.pending]: setPending,
      [uploadFile.fulfilled]: setFulfilled,
      [uploadFile.rejected]: setFulfilled,
      [editTask.pending]: setPending,
      [editTask.fulfilled]: setFulfilled,
      [editTask.rejected]: setFulfilled,
      [getLessonTask.pending]: setPending,
      [getLessonTask.fulfilled]: setFulfilled,
      [getLessonTask.rejected]: setFulfilled,
   },
})

export const taskActions = taskSlice.actions
