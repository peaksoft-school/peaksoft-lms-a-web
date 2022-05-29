import { createSlice } from '@reduxjs/toolkit'

const initState = {
   taskName: '',
   file: null,
   image: null,
}
export const taskSlice = createSlice({
   name: 'task',
   initialState: initState,
   reducers: {
      selectFile(state, action) {
         console.log(action.payload)
         state.file = action.payload
      },
      selectImage(state, action) {
         console.log(action.payload)
         state.image = action.payload
      },
   },
})

export const taskActions = taskSlice.actions
