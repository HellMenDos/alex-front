/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, Question, Favourite } from '../../common/types';
import { CommentsService } from '../../services/CommentsService';
import { FavouritesService } from '../../services/FavouritesService';
import { QuestionService } from '../../services/QuestionService';


interface Store {
  questions: Question[]
  comments: Comment[]
  favourites: Favourite[]
}

const initialState: Store = {
  questions: [],
  comments: [],
  favourites: []
};

type questionParams = { lang: string, level: string, tech: string }

export const fetchAllQuestions = createAsyncThunk(
    'questions/fetchAllQuestions',
    async ({lang, level, tech}: questionParams, thunkAPI) => {
      return await QuestionService().get(lang, level, tech)
    }
)

export const fetchAllComments = createAsyncThunk(
  'questions/fetchAllComments',
  async (questionId: number, thunkAPI) => {
    return await CommentsService().getAll(questionId)
  }
)

export const fetchAllFavourite = createAsyncThunk(
  'questions/fetchAllFavourite',
  async (questionId: number, thunkAPI) => {
    return await FavouritesService().getAll(questionId)
  }
)
  
  
const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // @ts-ignore
        builder.addCase(fetchAllFavourite.fulfilled, (state, action) => {
          state.favourites = [ ...action.payload  as Favourite[]  ]
        }),
        builder.addCase(fetchAllQuestions.fulfilled, (state, action) => {
          state.questions = [ ...action.payload  as Question[]  ]
        })
        builder.addCase(fetchAllComments.fulfilled, (state, action) => {
          state.comments = [ ...action.payload  as Comment[]  ]
        })
      },
});

export default questionsSlice.reducer