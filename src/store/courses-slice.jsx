import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'

const initState = {
   courses: [],
   сourse: null,
   instructors: [],
   pages: null,
   presentPage: null,
   isLoading: null,
   isSuccess: null,
   errorMessage: null,
   successMessage: null,
}

export const addNewCourse = createAsyncThunk(
   'courses/addNewCourse',
   async ({ file, courseData, currentPage }, { rejectWithValue, dispatch }) => {
      try {
         const formData = new FormData()
         formData.append('file', file)

         const res = await fileFetch({
            path: 'api/file',
            method: 'POST',
            body: formData,
         })
         const data = await res.url.toString()
         const response = await baseFetch({
            path: 'api/courses',
            method: 'POST',
            body: { ...courseData, image: data },
         })
         dispatch(getAllCourses(currentPage))
         dispatch(coursesActions.showSuccessMessage('Курс успешно создан'))
         dispatch(coursesActions.isSucceed(true))
         return response
      } catch (error) {
         dispatch(coursesActions.showErrorMessage('Не удалось создать курс'))
         dispatch(coursesActions.isSucceed(false))
         return rejectWithValue(error.message)
      }
   }
)

export const onEditCourse = createAsyncThunk(
   'courses/editCourse',
   async ({ file, course, currentPage }, { rejectWithValue, dispatch }) => {
      try {
         const formData = new FormData()
         formData.append('file', file)

         const res = await fileFetch({
            path: 'api/file',
            method: 'POST',
            body: formData,
         })
         const data = await res.url.toString()
         const response = await baseFetch({
            path: `api/courses/${course.id}`,
            method: 'PUT',
            body: { ...course, image: data },
         })
         dispatch(getAllCourses(currentPage))
         dispatch(
            coursesActions.showSuccessMessage('Изменения успешно сохранены')
         )
         dispatch(coursesActions.isSucceed(true))
         return response
      } catch (error) {
         dispatch(coursesActions.showErrorMessage('Не удалось изменить данные'))
         dispatch(coursesActions.isSucceed(false))
         return rejectWithValue(error.message)
      }
   }
)

export const deleteCourse = createAsyncThunk(
   'courses/deleteCourse',
   async ({ id, currentPage }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/courses/${id}`,
            method: 'DELETE',
         })
         dispatch(getAllCourses(currentPage))
         dispatch(coursesActions.showSuccessMessage('Вы удалили курс'))
         return response
      } catch (error) {
         dispatch(coursesActions.showErrorMessage('Не удалось удалить курс'))
         return rejectWithValue(error.message)
      }
   }
)

export const getSingleCourse = createAsyncThunk(
   'courses/getSingleCourse',
   async (id, { rejectWithValue, dispatch }) => {
      dispatch(coursesActions.clearCourses())
      try {
         const response = await baseFetch({
            path: `api/courses/${id}`,
            method: 'GET',
         })
         dispatch(coursesActions.getCourse(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const assignTeacherToCourse = createAsyncThunk(
   'courses/assignTeacherToCourse ',
   async ({ courseId, instructorId }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: 'api/courses/assign',
            method: 'POST',
            body: {
               courseId,
               teacherId: instructorId,
            },
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getInstructor = createAsyncThunk(
   'courses/getTeachers',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/instructors',
            method: 'GET',
         })
         dispatch(coursesActions.getInstructors(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getAllCourses = createAsyncThunk(
   'courses/pagination',
   async (currentPage, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/courses/pagination`,
            method: 'GET',
            params: {
               page: currentPage || 1,
               size: 8,
            },
         })
         dispatch(coursesActions.getAllCourses(response))
         return response
      } catch (error) {
         coursesActions.showErrorMessage(
            'Что-то пошло не так, попробуйте еще раз'
         )
         return rejectWithValue(error.message)
      }
   }
)

const setIsLoading = (state) => {
   state.isLoading = false
}

const setPending = (state) => {
   state.isLoading = true
}

export const coursesSlice = createSlice({
   name: 'courses',
   initialState: initState,
   reducers: {
      getCourse(state, action) {
         state.сourse = action.payload
      },
      getInstructors(state, action) {
         state.instructors = action.payload
      },
      getAllCourses(state, action) {
         state.courses = action.payload.responseList
         state.pages = action.payload.totalPage
         state.presentPage = action.payload.currentPage
      },
      clearCourses(state) {
         state.singleCourse = null
      },
      showSuccessMessage(state, action) {
         state.successMessage = action.payload
      },
      showErrorMessage(state, action) {
         state.errorMessage = action.payload
      },
      isSucceed(state, action) {
         state.isSuccess = action.payload
      },
   },
   extraReducers: {
      [addNewCourse.pending]: setPending,
      [addNewCourse.fulfilled]: setIsLoading,
      [addNewCourse.rejected]: setIsLoading,
      [getAllCourses.pending]: setPending,
      [getAllCourses.fulfilled]: setIsLoading,
      [getAllCourses.rejected]: setIsLoading,
      [getSingleCourse.pending]: setPending,
      [getSingleCourse.fulfilled]: setIsLoading,
      [getSingleCourse.rejected]: setIsLoading,
      [deleteCourse.pending]: setPending,
      [deleteCourse.fulfilled]: setIsLoading,
      [deleteCourse.rejected]: setIsLoading,
      [onEditCourse.pending]: setPending,
      [onEditCourse.fulfilled]: setIsLoading,
      [onEditCourse.rejected]: setIsLoading,
      [getInstructor.pending]: setPending,
      [getInstructor.fulfilled]: setIsLoading,
      [getInstructor.rejected]: setIsLoading,
   },
})

export const coursesActions = coursesSlice.actions
