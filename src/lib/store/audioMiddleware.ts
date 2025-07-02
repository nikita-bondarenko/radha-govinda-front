import { Middleware, createListenerMiddleware } from '@reduxjs/toolkit';
import { addItemInPreviosAudioBuffer, playNextAudio, playPrevAudio, selectAudio, selectAudioIsPlaying, setAudio, setIsPlaying, setPassedTime, setLeftTime, setProgress } from './audioSlice';
import type { RootState } from './store';

// Глобальный HTML audio элемент
let audioElement: HTMLAudioElement | null = null;

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
    
    audioElement.addEventListener('ended', () => {
      console.log('Audio ended');
      // Автоматически переключаемся на следующий трек
      setTimeout(() => {
        if (storeInstance) {
          storeInstance.dispatch(playNextAudio());
        }
      }, 100);
    });
    
    audioElement.addEventListener('error', (e) => {
      console.error('Audio error:', e);
    });
  }
  
  return audioElement;
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