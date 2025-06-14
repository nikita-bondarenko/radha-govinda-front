import { configureStore } from '@reduxjs/toolkit'
import audio from './audioSlice'
import locale from '../localeStore/localeSlice'
export const createStore = (preloadedState?: unknown) => {
  return configureStore({
    reducer: {
      audio: audio,
    },
    preloadedState
  })
}

// Удобный алиас для использования без аргументов (на клиенте)
export const store = () => createStore();

// Infer the type of makeStore
export type AppStore = ReturnType<typeof createStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

