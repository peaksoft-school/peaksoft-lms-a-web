import { createSlice } from '@reduxjs/toolkit'

const initState = {
   taskName: '',
   file: null,
   image: null,
   linkText: null,
   link: null,
}
export const taskSlice = createSlice({
   name: 'task',
   initialState: initState,
   reducers: {
      selectFile(state, action) {
         state.file = action.payload
      },
      selectImage(state, action) {
         state.image = action.payload
      },
      addlink(state, action) {
         console.log(action.payload)
         const { link, linkText } = action.payload
         state.linkText = linkText
         state.link = link
      },
   },
})

export const taskActions = taskSlice.actions
