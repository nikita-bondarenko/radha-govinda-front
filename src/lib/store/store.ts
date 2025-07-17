import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit'
import audio from './audioSlice'
import locale from './localeSlice'
import { loadState, saveState } from './persistConfig'
import { audioMiddleware } from './audioMiddleware'

const rootReducer = combineReducers({
      audio: audio,
  locale: locale,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedState = loadState() as Partial<RootState> | undefined;
console.log('persistedState', persistedState)

// Debounce для сохранения состояния
let saveTimeout: NodeJS.Timeout | null = null;

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(audioMiddleware)
});

store.subscribe(() => {
  const state = store.getState();
  
  // Очищаем предыдущий таймаут
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
  
  // Сохраняем состояние с небольшой задержкой для оптимизации
  saveTimeout = setTimeout(() => {
    saveState({
      audio: state.audio,
      locale: state.locale,
    });
  }, 100); // 100ms debounce
});


// Удобный алиас для использования без аргументов (на клиенте)

// Infer the type of makeStore
export type AppStore = ReturnType<typeof createStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = AppStore['dispatch']

