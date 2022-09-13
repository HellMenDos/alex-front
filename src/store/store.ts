import { combineReducers, configureStore } from '@reduxjs/toolkit'
import lang from './slices/langSlice'
import tech from './slices/techSlice'
import level from './slices/levelSlice'
import question from './slices/questionSlice'

export const rootReducer = combineReducers({ lang, tech, level,question })

const store = configureStore({
    reducer: rootReducer,
})

export default store