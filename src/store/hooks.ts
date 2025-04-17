import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store, { rootReducer } from './store'

export type RootType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector;

