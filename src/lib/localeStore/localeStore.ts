import { configureStore } from '@reduxjs/toolkit'
import locale from '../localeStore/localeSlice'
export const createLocaleStore = (preloadedState?: unknown) => {
  return configureStore({
    reducer: {
      locale
    },
    preloadedState
  })
}

// Удобный алиас для использования без аргументов (на клиенте)
export const localeStore = () => createLocaleStore();

// Infer the type of makeStore
export type LocaleStore = ReturnType<typeof createLocaleStore>
export type LocaleState = ReturnType<LocaleStore['getState']>
export type LocaleDispatch = LocaleStore['dispatch']

