import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'

const initialState = {
   newGroupData: [],
   studentsIState: [],
   isLoading: null,
   singleGroup: [],
   allPages: null,
   successMessage: null,
   error: null,
}

export const addNewGroup = createAsyncThunk(
   'groups/addNewGroup',
   async ({ groupData, file }, { rejectWithValue, dispatch }) => {
      try {
         const formData = new FormData()
         formData.append('file', file)
         const fileResponse = await fileFetch({
            path: 'api/file',
            method: 'POST',
            body: formData,
         })

         const data = await fileResponse.url.toString()
         const response = await baseFetch({
            path: 'api/groups',
            method: 'POST',
            body: { ...groupData, image: data },
         })
         dispatch(groupsPagination(groupData.page))

         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const deleteGroup = createAsyncThunk(
   'groups/deleteGroup',
   async ({ id, page }, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/groups/${id}`,
            method: 'DELETE',
         })
         dispatch(groupsPagination(page))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getSingleGroup = createAsyncThunk(
   'groups/getSingleGroup',
   async (id, { dispatch }) => {
      dispatch(groupActions.singleGroupNull())
      try {
         const response = await baseFetch({
            path: `api/groups/${id}`,
            method: 'GET',
         })
         dispatch(groupActions.getSingleGroupValue(response))
         return response
      } catch (error) {
         return error.message
      }
   }
)

export const updateSingleGroup = createAsyncThunk(
   'groups/updateSingleGroup',
   async ({ groupUpdateInfo, file }, { rejectWithValue, dispatch }) => {
      try {
         const editedGroup = new FormData()
         editedGroup.append('file', file)
         const fileResponse = await fileFetch({
            path: 'api/file',
            method: 'POST',
            body: editedGroup,
         })
         const data = await fileResponse.url.toString()

         const response = await baseFetch({
            path: `api/groups/${groupUpdateInfo.id}`,
            method: 'PUT',
            body: { ...groupUpdateInfo, image: data },
         })
         dispatch(groupsPagination(groupUpdateInfo.page))

         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const groupsPagination = createAsyncThunk(
   'groups/groupsPagination',
   async (page, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/groups/pagination',
            method: 'GET',
            params: {
               page,
               size: 3,
            },
         })
         dispatch(groupActions.pagination(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getGroupsStudents = createAsyncThunk(
   'groups/getStudents',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/groups/students/${id}`,
            method: 'GET',
         })

         dispatch(groupActions.getStudentsList(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const groupsSlice = createSlice({
   name: 'groups',
   initialState,
   reducers: {
      getSingleGroupValue: (state, action) => {
         state.singleGroup = action.payload
      },
      singleGroupNull: (state) => {
         state.singleGroup = null
      },
      pagination: (state, action) => {
         state.newGroupData = action.payload.responseList
         state.currentPage = action.payload.currentPage
         state.allPages = action.payload.totalPage
      },
      getStudentsList(state, action) {
         state.studentsIState = action.payload
      },
   },
   extraReducers: {
      [addNewGroup.pending]: (state) => {
         state.isLoading = true
      },
      [addNewGroup.fulfilled]: (state) => {
         state.isLoading = false
      },
      [addNewGroup.rejected]: (state) => {
         state.isLoading = false
      },
      [updateSingleGroup.fulfilled]: (state, action) => {
         state.singleGroup = action.payload
      },
   },
})
export const groupActions = groupsSlice.actions
