import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../api/baseFetch'
import { fileFetch } from '../api/fileFetch'

const initialState = {
   newGroupData: [],
   isLoading: null,
   singleGroup: null,
}
export const addNewGroup = createAsyncThunk(
   'groups/addNewGroup',
   async (newGroup, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: 'api/groups',
            method: 'POST',
            body: newGroup,
         })
         dispatch(fetchNewGroups())
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const postFileToBase = createAsyncThunk(
   'groups/postFileToBase',
   async ({ file, groupData }, { dispatch }) => {
      try {
         const formData = new FormData()
         formData.append('file', file)
         const response = await fileFetch({
            path: 'api/file',
            method: 'POST',
            body: formData,
         })
         const data = await response.url.toString()
         if (data) {
            dispatch(addNewGroup({ ...groupData, image: data }))
         }
         return response
      } catch (error) {
         return error.message
      }
   }
)

export const fetchNewGroups = createAsyncThunk(
   'groups/fetchNewGroups',
   async (_, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: 'api/groups',
            method: 'GET',
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const deleteGroup = createAsyncThunk(
   'groups/deleteGroup',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/groups/${id}`,
            method: 'DELETE',
         })
         dispatch(fetchNewGroups())
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

export const updateFile = createAsyncThunk(
   'groups/updateFile',
   async ({ file, groupUpdateInfo }, { dispatch }) => {
      try {
         const editedGroup = new FormData()
         editedGroup.append('file', file)
         const response = await fileFetch({
            path: 'api/file',
            method: 'POST',
            body: editedGroup,
         })
         const data = await response.url.toString()
         if (data) {
            dispatch(updateSingleGroup({ ...groupUpdateInfo, image: data }))
         }
         return response
      } catch (error) {
         return error.message
      }
   }
)

export const updateSingleGroup = createAsyncThunk(
   'groups/updateSingleGroup',
   async (groupUpdateInfo, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/groups/${groupUpdateInfo.id}`,
            method: 'PUT',
            body: groupUpdateInfo,
         })
         dispatch(fetchNewGroups())
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
      [fetchNewGroups.pending]: (state) => {
         state.isLoading = true
      },
      [fetchNewGroups.fulfilled]: (state, action) => {
         state.isLoading = false
         state.newGroupData = action.payload
      },
      [fetchNewGroups.rejected]: (state) => {
         state.isLoading = false
      },
      [updateSingleGroup.fulfilled]: (state, action) => {
         state.singleGroup = action.payload
      },
   },
})
export const groupActions = groupsSlice.actions
