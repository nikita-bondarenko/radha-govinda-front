import { Middleware, createListenerMiddleware } from '@reduxjs/toolkit';
import { addItemInPreviosAudioBuffer, playNextAudio, playPrevAudio, selectAudio, selectAudioIsPlaying, setAudio, setIsPlaying, setPassedTime, setLeftTime, setProgress } from './audioSlice';
import type { RootState } from './store';

// Глобальный HTML audio элемент
let audioElement: HTMLAudioElement | null = null;
let isInitialized = false;

// Инициализация аудио элемента
const initAudioElement = (storeInstance?: any) => {
  if (typeof window === 'undefined') return null;
  
  if (!audioElement) {
    audioElement = new Audio();
    audioElement.preload = 'metadata';
    
    // Обработчики событий аудио
    audioElement.addEventListener('loadstart', () => {
      console.log('Audio loading started');
    });
    
    audioElement.addEventListener('canplay', () => {
      console.log('Audio can play');
    });

    audioElement.addEventListener('loadedmetadata', () => {
      console.log('Audio metadata loaded');
      // Инициализируем время при загрузке метаданных
      if (storeInstance && audioElement) {
        const duration = audioElement.duration;
        console.log('Duration from loadedmetadata:', duration);
        if (duration > 0 && !isNaN(duration) && isFinite(duration)) {
          storeInstance.dispatch(setLeftTime(duration));
          storeInstance.dispatch(setPassedTime(0));
          storeInstance.dispatch(setProgress(0));
          console.log('Duration set:', duration);
        }
      }
    });

    audioElement.addEventListener('durationchange', () => {
      console.log('Duration changed');
      // Дополнительная проверка на изменение длительности
      if (storeInstance && audioElement) {
        const duration = audioElement.duration;
        console.log('Duration from durationchange:', duration);
        if (duration > 0 && !isNaN(duration) && isFinite(duration)) {
          storeInstance.dispatch(setLeftTime(duration));
          console.log('Duration updated:', duration);
        }
      }
    });

    audioElement.addEventListener('timeupdate', () => {
      if (storeInstance && audioElement) {
        const currentTime = audioElement.currentTime;
        const duration = audioElement.duration;
        
        if (duration > 0 && !isNaN(duration) && isFinite(duration)) {
          const progress = (currentTime / duration) * 100;
          storeInstance.dispatch(setPassedTime(currentTime));
          storeInstance.dispatch(setProgress(progress));
        }
      }
    });
    
    audioElement.addEventListener('ended', () => {
      console.log('Audio ended');
      // Проверяем состояние зацикливания
      const currentState = storeInstance?.getState();
      const isLooping = currentState?.audio?.isLooping;
      
      if (isLooping && audioElement) {
        // Если зацикливание включено, перезапускаем текущий трек
        console.log('Looping enabled, restarting current track');
        audioElement.currentTime = 0;
        audioElement.play().catch(console.error);
      } else {
        // Если зацикливание выключено, переходим к следующему треку
        setTimeout(() => {
          if (storeInstance) {
            storeInstance.dispatch(playNextAudio());
          }
        }, 100);
      }
    });
    
    audioElement.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      // Если произошла ошибка загрузки, сбрасываем состояние воспроизведения
      if (storeInstance) {
        storeInstance.dispatch(setIsPlaying(false));
        console.log('Audio loading failed, setting isPlaying to false');
      }
    });
  }
  
  return audioElement;
};

// Функция для восстановления состояния аудио при загрузке страницы
const restoreAudioState = (store: any) => {
  if (isInitialized) return;
  
  const state = store.getState();
  const audio = selectAudio(state);
  const isPlaying = selectAudioIsPlaying(state);
  const isLooping = state.audio?.isLooping;
  
  if (audio && audio.Audio?.url) {
    console.log('Restoring audio state:', audio.Name, 'isLooping:', isLooping);
    const audioEl = initAudioElement(store);
    if (audioEl) {
      audioEl.src = audio.Audio.url;
      audioEl.load();
      
      // Восстанавливаем громкость
      const volume = state.audio.volume;
      audioEl.volume = volume / 100;
      
      // Восстанавливаем позицию воспроизведения
      const passedTime = state.audio.passedTime;
      if (passedTime > 0) {
        audioEl.addEventListener('loadedmetadata', () => {
          audioEl.currentTime = passedTime;
        }, { once: true });
      }
      
      // Если аудио было воспроизводиться, запускаем его
      if (isPlaying) {
        audioEl.addEventListener('canplay', () => {
          audioEl.play().catch((error) => {
            console.error('Failed to play audio on restore:', error);
            // Если не удалось воспроизвести, сбрасываем состояние
            store.dispatch(setIsPlaying(false));
          });
        }, { once: true });
      }
      
      // Добавляем обработчик ошибок для восстановления
      const errorHandler = () => {
        console.error('Audio failed to load during restore');
        store.dispatch(setIsPlaying(false));
        audioEl.removeEventListener('error', errorHandler);
      };
      audioEl.addEventListener('error', errorHandler);
    }
  }
  
  isInitialized = true;
};

// Middleware для обработки аудио
export const audioMiddleware: Middleware<{}, RootState> = (store) => (next) => (action: any) => {
  const result = next(action);
  const state = store.getState();
  const dispatch = store.dispatch
  const audio = selectAudio(state);
  const isPlaying = selectAudioIsPlaying(state);
  
  // Инициализируем аудио элемент на клиенте
  const audioEl = initAudioElement(store);
  if (!audioEl) return result;
  
  // Восстанавливаем состояние при первом вызове middleware
  if (!isInitialized && typeof window !== 'undefined') {
    restoreAudioState(store);
  }
  
  // Обрабатываем смену трека
  if ((action.type === setAudio.type || action.type === playNextAudio.type || action.type === playPrevAudio.type) && audio) {
    console.log('Setting new audio:', audio.Name);

    audioEl.src = audio.Audio.url;
    audioEl.load();
    audioEl.play().catch(console.error);
    
    // Добавляем в буфер только при setAudio и playNextAudio, НЕ при playPrevAudio
    if (action.type !== playPrevAudio.type) {
      dispatch(addItemInPreviosAudioBuffer(audio.documentId))
    }
  }

  // Обрабатываем play/pause
  if (action.type === 'audio/setIsPlaying' || action.type === 'audio/toggleIsPlaying') {
    if (isPlaying && audio) {
      audioEl.play().catch(console.error);
    } else {
      audioEl.pause();
    }
  }
  
  // Обрабатываем изменение громкости
  if (action.type === 'audio/setVolume') {
    const volume = state.audio.volume;
    audioEl.volume = volume / 100;
    console.log('Volume set to:', volume);
  }
  
  return result;
};

// Функция для получения текущего времени аудио
export const getCurrentTime = (): number => {
  const currentTime = audioElement?.currentTime || 0;
  console.log('getCurrentTime:', currentTime);
  return currentTime;
};

// Функция для получения длительности аудио
export const getDuration = (): number => {
  const duration = audioElement?.duration || 0;
  console.log('getDuration:', duration);
  return duration;
};

// Функция для установки времени
export const setCurrentTime = (time: number): void => {
  if (audioElement) {
    audioElement.currentTime = time;
  }
};

// Функция для установки громкости
export const setAudioVolume = (volume: number): void => {
  if (audioElement) {
    audioElement.volume = volume / 100; // 0-1
  }
}; 