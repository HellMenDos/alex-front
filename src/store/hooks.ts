import store, { rootReducer } from './store'

export type RootType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch