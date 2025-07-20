import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./types";
import { Audio } from "@/components/sections/audio-preview/AudioPreview";
import { findNextAudioIndex } from "@/utils/findNextAudioIndex";

export type AudioState = {
  isHeaderButtonVisible: boolean;
  audio: Audio | null;
  isPlaying: boolean;
  volume: number;
  playlist: Audio[];
  previosAudioBuffer: string[];
  currentBufferPosition: number; // текущая позиция в буфере для навигации
  flow: "direct" | "random";
  isLooping: boolean; // новое состояние для зацикливания
  selectedCategoryId: string | null; // ID выбранной категории для плейлиста
  progress: number;
  leftTime: number;
  passedTime: number;
  isMiniPlayerVisible: boolean; // новое состояние для видимости мини-плеера
  isMobile: boolean; // состояние для определения мобильного устройства
};

const initialState: AudioState = {
  isHeaderButtonVisible: false,
  audio: null,
  playlist: [],
  previosAudioBuffer: [],
  currentBufferPosition: -1,
  flow: "direct",
  isLooping: false, // по умолчанию зацикливание выключено
  selectedCategoryId: null, // по умолчанию категория не выбрана
  isPlaying: false,
  volume: 50,
  progress: 0,
  leftTime: 0,
  passedTime: 0,
  isMiniPlayerVisible: false, // по умолчанию мини-плеер скрыт
  isMobile: false, // по умолчанию не мобильное устройство
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setAudio: (state, action: PayloadAction<Audio | null>) => {
      state.audio = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    toggleIsPlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setFlow: (state, action: PayloadAction<"direct" | "random">) => {
      state.flow = action.payload;
    },
    setIsLooping: (state, action: PayloadAction<boolean>) => {
      state.isLooping = action.payload;
    },
    toggleIsLooping: (state) => {
      state.isLooping = !state.isLooping;
    },
    setSelectedCategoryId: (state, action: PayloadAction<string | null>) => {
      state.selectedCategoryId = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      if (action.payload < 0 || action.payload > 100) {
        throw Error("Volume must be in the range from 0 to 100");
      }
      state.volume = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<Audio[]>) => {
      state.playlist = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setLeftTime: (state, action: PayloadAction<number>) => {
      state.leftTime = action.payload;
    },
    setPassedTime: (state, action: PayloadAction<number>) => {
      state.passedTime = action.payload;
    },
    playNextAudio: (state) => {
      const result = findNextAudioIndex(
        state.audio,
        state.playlist,
        state.previosAudioBuffer,
        state.flow,
        "next",
        state.currentBufferPosition
      );
      state.audio = state.playlist[result.index];
      state.isPlaying = true;
      state.progress = 0;
      state.leftTime = 0;
      state.passedTime = 0;
      
      // При переходе к следующему треку в random режиме
      if (state.flow === "random") {
        // Если мы двигались вперед по буферу, увеличиваем позицию
        if (state.currentBufferPosition >= 0 && 
            state.currentBufferPosition < state.previosAudioBuffer.length - 1) {
          state.currentBufferPosition = state.currentBufferPosition + 1;
        } else {
          // Если выбрали новый случайный трек, позиция остается на конце буфера
          state.currentBufferPosition = state.previosAudioBuffer.length - 1;
        }
      }
    },

    playPrevAudio: (state) => {
      console.log('playPrevAudio called, current state:', {
        currentBufferPosition: state.currentBufferPosition,
        bufferLength: state.previosAudioBuffer.length,
        flow: state.flow,
        currentAudio: state.audio?.Name
      });
      
      const result = findNextAudioIndex(
        state.audio,
        state.playlist,
        state.previosAudioBuffer,
        state.flow,
        "prev",
        state.currentBufferPosition
      );
      
      state.audio = state.playlist[result.index];
      state.isPlaying = true;
      state.progress = 0;
      state.leftTime = 0;
      state.passedTime = 0;
      
      // При переходе к предыдущему треку в random режиме, сдвигаем позицию назад
      // ТОЛЬКО если мы НЕ в fallback режиме
      if (state.flow === "random" && 
          state.currentBufferPosition > 0 && 
          !result.usedFallback) { // Используем флаг fallback вместо проверки индекса
        const oldPosition = state.currentBufferPosition;
        state.currentBufferPosition = state.currentBufferPosition - 1;
        console.log('Updated buffer position:', {
          from: oldPosition,
          to: state.currentBufferPosition
        });
      } else if (state.flow === "random" && (state.currentBufferPosition === 0 || result.usedFallback)) {
        console.log('At buffer start or used fallback, not updating position');
      }
    },
    addItemInPreviosAudioBuffer: (state, action: PayloadAction<string>) => {
      // Добавляем новый элемент
      const newBuffer = [...state.previosAudioBuffer, action.payload];
      
      // Ограничиваем буфер до 15 элементов
      if (newBuffer.length > 15) {
        state.previosAudioBuffer = newBuffer.slice(-15);
      } else {
        state.previosAudioBuffer = newBuffer;
      }
      
      // Устанавливаем позицию на последний элемент
      state.currentBufferPosition = state.previosAudioBuffer.length - 1;
    },
    
    setBufferPosition: (state, action: PayloadAction<number>) => {
      state.currentBufferPosition = action.payload;
    },
    setIsMiniPlayerVisible: (state, action: PayloadAction<boolean>) => {
      console.log('Redux: setIsMiniPlayerVisible', action.payload);
      state.isMiniPlayerVisible = action.payload;
    },
    setIsHeaderButtonVisible: (state, action: PayloadAction<boolean>) => {
      state.isHeaderButtonVisible = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
  },
});

export const {
  setAudio,
  setFlow,
  setVolume,
  setIsPlaying,
  toggleIsPlaying,
  setProgress,
  setLeftTime,
  setPassedTime,
  setPlaylist,
  playNextAudio,
  playPrevAudio,
  addItemInPreviosAudioBuffer,
  setBufferPosition,
  setIsLooping,
  toggleIsLooping,
  setSelectedCategoryId,
  setIsMiniPlayerVisible,
  setIsHeaderButtonVisible,
  setIsMobile
} = audioSlice.actions;
export const selectAudio = (state: RootState) => state.audio.audio;
export const selectAudioIsPlaying = (state: RootState) => state.audio.isPlaying;
export const selectAudioFlow = (state: RootState) => state.audio.flow;
export const selectAudioIsLooping = (state: RootState) => state.audio.isLooping;
export const selectAudioSelectedCategoryId = (state: RootState) => state.audio.selectedCategoryId;
export const selectAudioVolume = (state: RootState) => state.audio.volume;
export const selectAudioProgress = (state: RootState) => state.audio.progress;
export const selectAudioPassedTime = (state: RootState) => state.audio.passedTime;
export const selectAudioLeftTime = (state: RootState) => state.audio.leftTime;
export const selectAudioId = (state: RootState) =>
  state.audio.audio?.documentId;
export const selectCurrentBufferPosition = (state: RootState) => state.audio.currentBufferPosition;
export const selectPreviosAudioBuffer = (state: RootState) => state.audio.previosAudioBuffer;
export const selectIsMiniPlayerVisible = (state: RootState) => state.audio.isMiniPlayerVisible;

// Селектор для определения мобильного устройства
export const selectIsMobile = (state: RootState) => state.audio.isMobile;

// Селектор для определения видимости большого плеера
export const selectIsMainPlayerVisible = (state: RootState) => {
  const { audio, isMiniPlayerVisible, isHeaderButtonVisible, isMobile } = state.audio;
  
  console.log('selectIsMainPlayerVisible:', {
    audio: !!audio,
    isMiniPlayerVisible,
    isHeaderButtonVisible,
    isMobile,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'server'
  });
  
  // На мобильных устройствах мини-плеер не влияет на видимость большого плеера
  if (isMobile) {
    const result = !!audio;
    console.log('Mobile device, showing main player:', result);
    return result; // Показываем большой плеер, если есть аудиозапись
  }
  
  // На десктопе используем обычную логику
  const shouldHidePlayer = !audio || (isMiniPlayerVisible && isHeaderButtonVisible);
  const forceShowPlayer = audio && !isHeaderButtonVisible;
  const result = !(shouldHidePlayer && !forceShowPlayer);
  console.log('Desktop device, main player visibility:', result);
  return result;
};

export default audioSlice.reducer;
