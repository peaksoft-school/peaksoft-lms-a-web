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
      deleteOption(state, action) {
         const { optionId, questionId } = action.payload
         const question = state.questions.find(
            (question) => question.id === questionId
         )
         const filteredOptions = question.options.filter(
            (option) => option.id !== optionId
         )
         question.options = filteredOptions
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
      deleteQuestion(state, action) {
         const filteredQuestions = state.questions.filter(
            (question) => question.id !== action.payload
         )
         state.questions = filteredQuestions
      },
   },
})

export const testActions = createTestSlice.actions
