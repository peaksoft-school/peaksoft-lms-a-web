/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit'
import { TEST_KEY } from '../utils/constants/general'
import { localStorageHelper } from '../utils/helpers/general'

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

const testData = localStorageHelper.laod(TEST_KEY)
   ? localStorageHelper.laod(TEST_KEY)
   : initState

export const createTestSlice = createSlice({
   name: 'test',
   initialState: testData,
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
         if (question.options.length > 1) {
            const filteredOptions = question.options.filter(
               (option) => option.id !== optionId
            )
            question.options = filteredOptions
         }
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
         if (state.questions.length > 1) {
            const filteredQuestions = state.questions.filter(
               (question) => question.id !== action.payload
            )
            state.questions = filteredQuestions
         }
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
      test(state) {
         let newState = {
            questionType: '',
            question: '',
         }
         let newState1 = {
            option: '',
            isTrue: '',
         }
         state.questions.map((question) => {
            newState = {
               questionType: question.questionType,
               question: question.question,
            }
            question.options.map((option) => {
               newState1 = {
                  option: option.option,
                  isTrue: option.isTrue,
               }
               return option
            })
            return question
         })
         const newData = {
            testName: state.testName,
            questions: [{ ...newState, options: [{ ...newState1 }] }],
         }
      },
   },
})

export const testActions = createTestSlice.actions
