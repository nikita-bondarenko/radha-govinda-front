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
  flow: "direct" | "random";
  isLooping: boolean;
  selectedCategoryId: string | null;
  progress: number;
  leftTime: number;
  passedTime: number;
  isMiniPlayerVisible: boolean;
  isMobile: boolean;
  isLoading: boolean;
  playlistAudioPositions: string[];
  logoUrl: string | null | undefined;
};

const initialState: AudioState = {
  isHeaderButtonVisible: false,
  audio: null,
  playlist: [],
  flow: "direct",
  isLooping: false,
  selectedCategoryId: null,
  isPlaying: false,
  isLoading: false,
  volume: 50,
  progress: 0,
  leftTime: 0,
  passedTime: 0,
  isMiniPlayerVisible: false,
  isMobile: false,
  playlistAudioPositions: [],
  logoUrl: null,
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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
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
    setPlaylistAudioPositions: (state, action: PayloadAction<string[]>) => {
      state.playlistAudioPositions = action.payload;
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
    setIsMiniPlayerVisible: (state, action: PayloadAction<boolean>) => {
      state.isMiniPlayerVisible = action.payload;
    },
    setIsHeaderButtonVisible: (state, action: PayloadAction<boolean>) => {
      state.isHeaderButtonVisible = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },

    setLogoUrl: (state, action: PayloadAction<string | null | undefined>) => {
      state.logoUrl = action.payload;
    },
  },
});

export const {
  setLogoUrl,
  setAudio,
  setFlow,
  setVolume,
  setIsPlaying,
  toggleIsPlaying,
  setProgress,
  setLeftTime,
  setPassedTime,
  setPlaylist,
  setIsLooping,
  toggleIsLooping,
  setSelectedCategoryId,
  setIsMiniPlayerVisible,
  setIsHeaderButtonVisible,
  setIsMobile,
  setIsLoading,
  setPlaylistAudioPositions,
} = audioSlice.actions;

export const selectAudio = (state: RootState) => state.audio.audio;
export const selectAudioIsPlaying = (state: RootState) => state.audio.isPlaying;
export const selectAudioIsLoading = (state: RootState) => state.audio.isLoading;
export const selectAudioFlow = (state: RootState) => state.audio.flow;
export const selectAudioIsLooping = (state: RootState) => state.audio.isLooping;
export const selectAudioSelectedCategoryId = (state: RootState) =>
  state.audio.selectedCategoryId;
export const selectAudioVolume = (state: RootState) => state.audio.volume;
export const selectAudioProgress = (state: RootState) => state.audio.progress;
export const selectAudioPassedTime = (state: RootState) =>
  state.audio.passedTime;
export const selectAudioLeftTime = (state: RootState) => state.audio.leftTime;
export const selectAudioId = (state: RootState) =>
  state.audio.audio?.documentId;
export const selectIsMiniPlayerVisible = (state: RootState) =>
  state.audio.isMiniPlayerVisible;
export const selectIsMobile = (state: RootState) => state.audio.isMobile;
export const selectIsMainPlayerVisible = (state: RootState) => {
  const { audio, isMiniPlayerVisible, isHeaderButtonVisible, isMobile } =
    state.audio;

  if (isMobile) {
    const result = !!audio;
    return result;
  }

  const shouldHidePlayer =
    !audio || (isMiniPlayerVisible && isHeaderButtonVisible);
  const forceShowPlayer = audio && !isHeaderButtonVisible;
  const result = !(shouldHidePlayer && !forceShowPlayer);
  return result;
};
export const selectPlaylistAudioPositions = (state: RootState) => state.audio.playlistAudioPositions
export const selectPlaylist = (state: RootState) => state.audio.playlist

export default audioSlice.reducer;
