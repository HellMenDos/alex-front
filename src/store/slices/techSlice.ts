import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Tech } from '../../common/types';
import { TechService } from '../../services/TechService';


interface Store {
    techs: Tech[]
}

const initialState: Store = {
    techs: []
};

export const fetchAllTechs = createAsyncThunk(
    'techs/fetchAllTechs',
    async (_, thunkAPI) => {
      return await TechService().all()
    }
  )
  
const techSlice = createSlice({
    name: 'techs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllTechs.fulfilled, (state, action) => {
          state.techs = [ ...action.payload ]
        })
      },
});

export default techSlice.reducer