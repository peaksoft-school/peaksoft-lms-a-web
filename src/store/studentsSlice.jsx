import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'

const initState = {
   studentData: [],
   groups: [],
   isLoading: null,
   singleStudent: null,
   totalPages: null,
   isSuccess: null,
   presentPage: null,
   error: null,
}

export const addStudent = createAsyncThunk(
   'students/addStudents',
   async ({ value, id, page, studyFormat }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/students/withGroup',
            method: 'POST',
            body: { ...value, groupId: id },
         })
         dispatch(getStudentsWithPagination({ page, studyFormat }))
         dispatch(studentsActions.showSuccessModal('Cтудент успешно создан'))
         return response
      } catch (error) {
         dispatch(
            studentsActions.showErrorMessage('Не удалось добавить cтудентa')
         )
         return rejectWithValue(error.message)
      }
   }
)
export const getStudents = createAsyncThunk(
   'students/getStudents',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/students',
            method: 'GET',
         })
         dispatch(studentsActions.getStudentData(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getSingleStudent = createAsyncThunk(
   'students/getSingleStudent',
   async (studentId, { rejectWithValue, dispatch }) => {
      dispatch(studentsActions.clearSingleStudentData())
      try {
         const response = await baseFetch({
            path: `api/students/${studentId}`,
            method: 'GET',
         })

         dispatch(studentsActions.getSingleStudentData(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const deleteStudent = createAsyncThunk(
   'students/deleteStudent',
   async ({ id, page, studyFormat }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/students/${id}`,
            method: 'DELETE',
         })
         dispatch(getStudentsWithPagination({ page, studyFormat }))
         dispatch(studentsActions.showSuccessModal('Cтудент успешно удален'))
         return response
      } catch (error) {
         dispatch(
            studentsActions.showErrorMessage('Не удалось удалить cтудентa')
         )
         return rejectWithValue(error.message)
      }
   }
)
export const editStudent = createAsyncThunk(
   'students/editStudent',
   async (
      { id, data, groupid, page, studyFormat },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const response = await baseFetch({
            path: `api/students/${id}`,
            method: 'PUT',
            body: { ...data, groupId: groupid },
         })
         dispatch(getStudentsWithPagination({ page, studyFormat }))
         dispatch(
            studentsActions.showSuccessModal('Изменения успешно сохранены')
         )
         return response
      } catch (error) {
         dispatch(
            studentsActions.showErrorMessage('Не удалось изменить данные')
         )
         return rejectWithValue(error.message)
      }
   }
)
export const sendStudentsAsExcel = createAsyncThunk(
   'students/sendStudents',
   async ({ file, id, page, studyFormat }, { rejectWithValue, dispatch }) => {
      try {
         const formData = new FormData()
         formData.append('file', file)
         const response = await fileFetch({
            path: `api/students/import/${id}`,
            method: 'POST',
            body: formData,
         })
         dispatch(getStudentsWithPagination({ page, studyFormat }))
         dispatch(studentsActions.showSuccessModal('Данные успешно сохранены'))
         return response
      } catch (error) {
         dispatch(studentsActions.showErrorMessage(error.message))
         return rejectWithValue(error.message)
      }
   }
)
export const getGroups = createAsyncThunk(
   'students/getGroups',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/groups',
            method: 'GET',
         })
         dispatch(studentsActions.getGroups(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getStudentsWithPagination = createAsyncThunk(
   'students/getStudentsWithPagination',
   async ({ page, studyFormat }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/students/pagination',
            method: 'GET',
            params: {
               page,
               size: 10,
               studyFormat,
            },
         })
         dispatch(studentsActions.getStudentDataWithPagination(response))
         return response
      } catch (error) {
         dispatch(
            studentsActions.showErrorMessage(
               'Что-то пошло не так, попробуйте еще раз'
            )
         )
         return rejectWithValue(error.message)
      }
   }
)
const setFulfilled = (state) => {
   state.isLoading = false
}
const setPending = (state) => {
   state.isLoading = true
}
const setError = (state) => {
   state.isLoading = false
}

export const studentsSlice = createSlice({
   name: 'students',
   initialState: initState,
   reducers: {
      getStudentData(state, action) {
         state.studentData = action.payload
      },
      getSingleStudentData(state, action) {
         state.singleStudent = action.payload
      },
      clearSingleStudentData(state) {
         state.singleStudent = null
      },
      getGroups(state, action) {
         state.groups = action.payload
      },
      getStudentDataWithPagination(state, action) {
         state.studentData = action.payload.responseList
         state.totalPages = action.payload.totalPage
         state.presentPage = action.payload.currentPage
      },
      showSuccessModal(state, action) {
         state.isSuccess = action.payload
      },
      showErrorMessage(state, action) {
         state.error = action.payload
      },
   },
   extraReducers: {
      [addStudent.pending]: setPending,
      [addStudent.fulfilled]: setFulfilled,
      [addStudent.rejected]: setError,
      [getStudents.pending]: setPending,
      [getStudents.fulfilled]: setFulfilled,
      [getStudents.rejected]: setError,
      [deleteStudent.pending]: setPending,
      [deleteStudent.fulfilled]: setFulfilled,
      [deleteStudent.rejected]: setError,
      [editStudent.pending]: setPending,
      [editStudent.fulfilled]: setFulfilled,
      [editStudent.rejected]: setError,
      [sendStudentsAsExcel.pending]: setPending,
      [sendStudentsAsExcel.fulfilled]: setFulfilled,
      [sendStudentsAsExcel.rejected]: setError,
      [getStudentsWithPagination.pending]: setPending,
      [getStudentsWithPagination.fulfilled]: setFulfilled,
      [getStudentsWithPagination.rejected]: setError,
   },
})

export const studentsActions = studentsSlice.actions
