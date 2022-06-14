/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseFetch } from '../../api/baseFetch'
import { TEST_KEY } from '../../utils/constants/general'
import { localStorageHelper } from '../../utils/helpers/general'

const initState = {
   test: {
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
   },
   isLoading: false,
}

export const addTest = createAsyncThunk(
   'lesson/addTest',
   async ({ value, id }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/tests/save/${id}`,
            method: 'POST',
            body: value,
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getTest = createAsyncThunk(
   'lesson/getTest',
   async (id, { rejectWithValue, dispatch }) => {
      try {
         const response = await baseFetch({
            path: `api/tests/get/${id}`,
            method: 'GET',
         })
         dispatch(testActions.getTest(response))
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const removeTest = createAsyncThunk(
   'lesson/deleteTest',
   async (id, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/tests/delete/${id}`,
            method: 'DELETE',
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const editTest = createAsyncThunk(
   'lesson/editTest',
   async ({ value, id }, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/tests/update/${id}`,
            method: 'PUT',
            body: value,
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

const testData = localStorageHelper.laod(TEST_KEY)
   ? { ...initState, test: localStorageHelper.laod(TEST_KEY) }
   : initState

export const createTestSlice = createSlice({
   name: 'test',
   initialState: testData,
   reducers: {
      addOption(state, action) {
         const question = state.test.questions.find(
            (question) => question.id === action.payload
         )
         const option = question.options.at(-1)
         question.options.push({
            id: option.id + 1,
            option: '',
            isTrue: false,
         })
      },
      addOptionAnother(state, action) {
         const question = state.test.questions.find(
            (question) => question.id === action.payload
         )
         const option = question.options.at(-1)
         question.options.push({
            id: option.id + 1,
            option: 'Другое...',
            isTrue: false,
         })
      },
      deleteOption(state, action) {
         const { optionId, questionId } = action.payload
         const question = state.test.questions.find(
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
         const question = state.test.questions.at(-1)
         state.test.questions.push({
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
         if (state.test.questions.length > 1) {
            const filteredQuestions = state.test.questions.filter(
               (question) => question.id !== action.payload
            )
            state.test.questions = filteredQuestions
         }
      },
      changeOptionToMore(state, action) {
         const question = state.test.questions.find(
            (question) => question.id === action.payload
         )
         question.questionType = 'MANY'
         question.options = question.options.map((option) => {
            option.isTrue = false
            return option
         })
      },
      changeOptionToOne(state, action) {
         const question = state.test.questions.find(
            (question) => question.id === action.payload
         )
         question.questionType = 'ONE'
         question.options = question.options.map((option) => {
            option.isTrue = false
            return option
         })
      },
      chooseOptionMany(state, action) {
         const { questionId, optionId, checked } = action.payload
         const question = state.test.questions.find(
            (question) => question.id === questionId
         )
         question.options = question.options.map((option) => {
            if (option.id === optionId && checked) {
               option.isTrue = true
            } else if (option.id === optionId && !checked) {
               option.isTrue = false
            }
            return option
         })
      },
      chooseOptionOne(state, action) {
         const { questionId, optionId } = action.payload
         const question = state.test.questions.find(
            (question) => question.id === questionId
         )
         question.options = question.options.map((option) => {
            if (option.id === optionId) {
               option.isTrue = true
            } else {
               option.isTrue = false
            }
            return option
         })
      },
      saveOptionData(state, action) {
         const { optionValue, questionId, optionId } = action.payload
         const question = state.test.questions.find(
            (question) => question.id === questionId
         )
         const option = question.options.find(
            (option) => option.id === optionId
         )
         option.option = optionValue
      },
      saveQuestionData(state, action) {
         const { questionValue, questionId } = action.payload
         const question = state.test.questions.find(
            (question) => question.id === questionId
         )
         question.question = questionValue
      },
      saveTestTitle(state, action) {
         state.test.testName = action.payload
      },
      cloneQuestion(state, action) {
         const question = state.test.questions.find(
            (question) => question.id === action.payload
         )
         const questionId = state.test.questions.at(-1)
         state.test.questions.push({ ...question, id: questionId.id + 1 })
      },
      clearTest(state) {
         state.test.questions = [
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
         ]
         state.test.testName = ''
      },
      getTest(state, action) {
         state.test = action.payload
      },
   },
   extraReducers: {
      [addTest.pending]: (state) => {
         state.isLoading = true
      },
      [addTest.fulfilled]: (state) => {
         state.isLoading = false
      },
      [addTest.rejected]: (state) => {
         state.isLoading = false
      },
   },
})

export const testActions = createTestSlice.actions
