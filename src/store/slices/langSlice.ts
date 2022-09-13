import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Lang } from '../../common/types';
import { LangService } from '../../services/LangService';

interface Store {
    langs: Lang[]
}

const initialState: Store = {
    langs: []
};

export const fetchAllLangs = createAsyncThunk(
    'langs/fetchAllLangs',
    async (_, thunkAPI) => {
      return await LangService().all()
    }
  )
  
const langSlice = createSlice({
    name: 'langs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllLangs.fulfilled, (state, action) => {
          state.langs = [ ...action.payload ]
        })
      },
});

export default langSlice.reducer