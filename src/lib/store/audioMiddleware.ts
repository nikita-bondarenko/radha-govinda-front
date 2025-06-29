import { Middleware, createListenerMiddleware } from '@reduxjs/toolkit';
import { addItemInPreviosAudioBuffer, playNextAudio, playPrevAudio, selectAudio, selectAudioIsPlaying, setAudio, setIsPlaying } from './audioSlice';
import type { RootState } from './store';

// Глобальный HTML audio элемент
let audioElement: HTMLAudioElement | null = null;

// Инициализация аудио элемента
const initAudioElement = () => {
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
    
    audioElement.addEventListener('ended', () => {
      console.log('Audio ended');
      // Здесь можно диспатчить action для остановки
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
  const audioEl = initAudioElement();
  if (!audioEl) return result;
  
  // Обрабатываем смену трека
  if ((action.type === setAudio.type || action.type === playNextAudio.type || action.type === playPrevAudio.type) && audio) {
    console.log('Setting new audio:', audio.Name);

    audioEl.src = audio.Audio.url;
    audioEl.load();
    audioEl.play().catch(console.error);
    dispatch(addItemInPreviosAudioBuffer(audio.documentId))

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
  return audioElement?.currentTime || 0;
};

// Функция для получения длительности аудио
export const getDuration = (): number => {
  return audioElement?.duration || 0;
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