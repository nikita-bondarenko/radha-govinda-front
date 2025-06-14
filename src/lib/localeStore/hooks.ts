import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'
import { LocaleState } from './localeSlice'
import { LocaleDispatch, LocaleStore } from './localeStore'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useLocaleDispatch: () => LocaleDispatch = useDispatch
export const useLocaleSelector: TypedUseSelectorHook<LocaleState> = useSelector
export const useLocaleStore: () => LocaleStore = useStore