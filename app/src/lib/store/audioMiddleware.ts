// import { Middleware, createListenerMiddleware } from '@reduxjs/toolkit';
// import { addItemInPreviosAudioBuffer, playNextAudio, playPrevAudio, selectAudio, selectAudioIsPlaying, setAudio, setIsPlaying, setPassedTime, setLeftTime, setProgress, setSelectedCategoryId } from './audioSlice';
// import type { RootState } from './store';

// // Глобальный HTML audio элемент
// let audioElement: HTMLAudioElement | null = null;
// let isInitialized = false;

// // Инициализация аудио элемента


// // Функция для восстановления состояния аудио при загрузке страницы
// const restoreAudioState = (store: any) => {
//   if (isInitialized) return;
  
//   const state = store.getState();
//   const audio = selectAudio(state);
//   const isPlaying = selectAudioIsPlaying(state);
//   const isLooping = state.audio?.isLooping;
  
//   if (audio && audio.Audio?.url) {
//      // console.log('Restoring audio state:', audio.Name, 'isLooping:', isLooping);
//     const audioEl = initAudioElement(store);
//     if (audioEl) {
//       audioEl.src = audio.Audio.url;
//       audioEl.load();
      
//       // Восстанавливаем громкость
//       const volume = state.audio.volume;
//       audioEl.volume = volume / 100;
      
//       // Восстанавливаем позицию воспроизведения
//       const passedTime = state.audio.passedTime;
//       if (passedTime > 0) {
//         audioEl.addEventListener('loadedmetadata', () => {
//           audioEl.currentTime = passedTime;
//         }, { once: true });
//       }
      
//       // Если аудио было воспроизводиться, запускаем его
//       if (isPlaying) {
//           store.dispatch(setIsPlaying(false));
//         // audioEl.addEventListener('canplay', () => {
//         //   audioEl.play().catch((error) => {
//         //     console.error('Failed to play audio on restore:', error);
//         //     // Если не удалось воспроизвести, сбрасываем состояние
//         //     store.dispatch(setIsPlaying(false));
//         //   });
//         // }, { once: true });
//       }
      
//       // Добавляем обработчик ошибок для восстановления
//       const errorHandler = () => {
//         console.error('Audio failed to load during restore');
//         store.dispatch(setIsPlaying(false));
//         audioEl.removeEventListener('error', errorHandler);
//       };
//       audioEl.addEventListener('error', errorHandler);
//     }
//   }
  
//   isInitialized = true;
// };

// // Middleware для обработки аудио
// export const audioMiddleware: Middleware<{}, RootState> = (store) => (next) => (action: any) => {
//   const result = next(action);
//   const state = store.getState();
//   const dispatch = store.dispatch
//   const audio = selectAudio(state);
//   const isPlaying = selectAudioIsPlaying(state);
  
//   // Инициализируем аудио элемент на клиенте
//   const audioEl = initAudioElement(store);
//   if (!audioEl) return result;
  
//   // Восстанавливаем состояние при первом вызове middleware
//   if (!isInitialized && typeof window !== 'undefined') {
//     restoreAudioState(store);
//   }
  
//   // Обрабатываем смену трека
//   if ((action.type === setAudio.type || action.type === playNextAudio.type || action.type === playPrevAudio.type) && audio) {
//      // console.log('Setting new audio:', audio.Name);
//      // console.log('Audio locale:', audio.locale);
//      // console.log('Audio full data:', audio);

//     audioEl.src = audio.Audio.url;
//     audioEl.load();
//     audioEl.play().catch(console.error);
    
//     // Устанавливаем категорию текущего аудио
//     if (audio.AudioCategory?.documentId) {
//       dispatch(setSelectedCategoryId(audio.AudioCategory.documentId));
//        // console.log('Set selected category:', audio.AudioCategory.documentId);
//     }
    
//     // Добавляем в буфер только при setAudio и playNextAudio, НЕ при playPrevAudio
//     if (action.type !== playPrevAudio.type) {
//       dispatch(addItemInPreviosAudioBuffer(audio.documentId))
//     }
//   }

//   // Обрабатываем play/pause
//   if (action.type === 'audio/setIsPlaying' || action.type === 'audio/toggleIsPlaying') {
//     if (isPlaying && audio) {
//       audioEl.play().catch(console.error);
//     } else {
//       audioEl.pause();
//     }
//   }
  
//   // Обрабатываем изменение громкости
//   if (action.type === 'audio/setVolume') {
//     const volume = state.audio.volume;
//     audioEl.volume = volume / 100;
//      // console.log('Volume set to:', volume);
//   }
  
//   return result;
// };

// // Функция для получения текущего времени аудио
// export const getCurrentTime = (): number => {
//   const currentTime = audioElement?.currentTime || 0;
//    // console.log('getCurrentTime:', currentTime);
//   return currentTime;
// };

// // Функция для получения длительности аудио
// export const getDuration = (): number => {
//   const duration = audioElement?.duration || 0;
//    // console.log('getDuration:', duration);
//   return duration;
// };

// // Функция для установки времени
// export const setCurrentTime = (time: number): void => {
//   if (audioElement) {
//     audioElement.currentTime = time;
//   }
// };

// // Функция для установки громкости
// export const setAudioVolume = (volume: number): void => {
//   if (audioElement) {
//     audioElement.volume = volume / 100; // 0-1
//   }
// }; 