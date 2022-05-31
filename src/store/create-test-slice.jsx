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
               another: false,
            },
         ],
      },
   ],
}
// questions.filter((obj) => Object.keys(obj).filter((key) => key !== 'id'))
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
            option: '',
            isTrue: false,
            another: false,
         })
      },
      addOptionAnother(state, action) {
         const question = state.questions.find(
            (question) => question.id === action.payload
         )
         const option = question.options.at(-1)
         question.options.push({
            id: option.id + 1,
            option: 'Другое...',
            isTrue: false,
            another: true,
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
      changeOptionToMore(state, action) {
         const question = state.questions.find(
            (question) => question.id === action.payload
         )
         question.questionType = 'MORE'
      },
      changeOptionToOne(state, action) {
         const question = state.questions.find(
            (question) => question.id === action.payload
         )
         question.questionType = 'ONE'
      },
      chooseOption(state, action) {
         const { questionId, optionId } = action.payload
         const question = state.questions.find(
            (question) => question.id === questionId
         )
         const option = question.options.find(
            (option) => option.id === optionId
         )
         option.isTrue = !option.isTrue
      },
      saveOptionData(state, action) {
         const { optionValue, questionId, optionId } = action.payload
         const question = state.questions.find(
            (question) => question.id === questionId
         )
         const option = question.options.find(
            (option) => option.id === optionId
         )
         option.option = optionValue
      },
      saveQuestionData(state, action) {
         const { questionValue, questionId } = action.payload
         const question = state.questions.find(
            (question) => question.id === questionId
         )
         question.question = questionValue
      },
      saveTestTitle(state, action) {
         state.testName = action.payload
      },
      cloneQuestion(state, action) {
         const question = state.questions.find(
            (question) => question.id === action.payload
         )
         const questionId = state.questions.at(-1)
         state.questions.push({ ...question, id: questionId.id + 1 })
      },
   },
})

export const testActions = createTestSlice.actions
