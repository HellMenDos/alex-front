import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '../../common/types';
import { QuestionService } from '../../services/QuestionService';


interface Store {
  questions: Question[]
}

const initialState: Store = {
  questions: []
};

type questionParams = { lang: string, level: string, tech: string }
export const fetchAllQuestions = createAsyncThunk(
    'questions/fetchAllQuestions',
    async ({lang, level, tech}: questionParams, thunkAPI) => {
      return await QuestionService().get(lang, level, tech)
    }
  )
  
const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllQuestions.fulfilled, (state, action) => {
          state.questions = [ ...action.payload  as Question[]  ]
        })
      },
});

export default questionsSlice.reducer