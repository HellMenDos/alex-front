import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Level } from '../../common/types';
import { LevelService } from '../../services/LevelService';


interface Store {
    levels: Level[]
}

const initialState: Store = {
    levels: []
};

export const fetchAllLevels = createAsyncThunk(
    'levels/fetchAllLevels',
    async (_, thunkAPI) => {
      return await LevelService().all()
    }
  )
  
const levelsSlice = createSlice({
    name: 'levels',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllLevels.fulfilled, (state, action) => {
          state.levels = [ ...action.payload ]
        })
      },
});

export default levelsSlice.reducer