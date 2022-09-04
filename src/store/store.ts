import { combineReducers, configureStore } from '@reduxjs/toolkit'
import post from './slices/postSlice'

export const rootReducer = combineReducers({ post })

const store = configureStore({
    reducer: rootReducer,
})

export default store