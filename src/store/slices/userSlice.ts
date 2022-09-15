import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserService } from '../../services/UserService';
import { User } from '../../common/types';

interface Store {
    user: User | {}
}

const initialState: Store = {
  user: {}
};

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (_, thunkAPI) => {
      return await UserService().me()
    }
  )
  
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      Exit(state): void {
        state.user = {}
      }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
          state.user = action.payload as User
        })
      },
});

export default userSlice.reducer

export const { Exit } = userSlice.actions;
