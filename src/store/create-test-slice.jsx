import { createSlice } from '@reduxjs/toolkit'

const initState = {
   testName: '',
   questions: [
      {
         id: 1,
         question: '',
         questionType: 'ONE',
         options: [
            {
               id: 1,
               option: '',
               isTrue: false,
            },
         ],
      },
   ],
}

export const createTestSlice = createSlice({
   name: 'test',
   initialState: initState,
   reducers: {
      addOption(state, action) {
         const question = state.questions.find(
            (question) => question.id === action.payload
         )
         const option = question.options.at(-1)
         question.options.push({
            id: option.id + 1,
         })
      },
      addQuestion(state) {
         const question = state.questions.at(-1)
         state.questions.push({
            id: question.id + 1,
            question: '',
            questionType: 'ONE',
            options: [
               {
                  id: 1,
                  option: '',
                  isTrue: false,
               },
            ],
         })
      },
   },
})

export const testActions = createTestSlice.actions
