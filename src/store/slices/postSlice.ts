import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    loading: false,
    errors: false,
    post: undefined,
    data: [],
    searchData: [],
    userIdFilter: 0
};


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        sortPosts(state): void {
            state.searchData.reverse();
        }
    },
});

export default postSlice.reducer