// Типы для Redux store
import { AudioState } from './audioSlice';
import { LocaleState } from './localeSlice';

export interface RootState {
  audio: AudioState;
  locale: LocaleState;
}

export type AppDispatch = any; // Будет переопределен в store.ts 