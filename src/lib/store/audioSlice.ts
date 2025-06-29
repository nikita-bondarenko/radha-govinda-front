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
  flow: "direct" | "random";
  progress: number;
  leftTime: number;
  passedTime: number;
};

const initialState: AudioState = {
  isHeaderButtonVisible: false,
  audio: null,
  playlist: [],
  previosAudioBuffer: [],
  flow: "direct",
  isPlaying: false,
  volume: 50,
  progress: 0,
  leftTime: 0,
  passedTime: 0,
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
      const nextIndex = findNextAudioIndex(
        state.audio,
        state.playlist,
        state.flow,
        "next"
      );
      state.audio = state.playlist[nextIndex];
      state.isPlaying = true;
      state.progress = 0;
      state.leftTime = 0;
      state.passedTime = 0;
    },

    playPrevAudio: (state) => {
      const nextIndex = findNextAudioIndex(
        state.audio,
        state.playlist,
        state.flow,
        "prev"
      );
      state.audio = state.playlist[nextIndex];
      state.isPlaying = true;
      state.progress = 0;
      state.leftTime = 0;
      state.passedTime = 0;
    },
    addItemInPreviosAudioBuffer: (state, action: PayloadAction<string>) => {
      state.previosAudioBuffer = [...state.previosAudioBuffer, action.payload];
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
  addItemInPreviosAudioBuffer
} = audioSlice.actions;
export const selectAudio = (state: RootState) => state.audio.audio;
export const selectAudioIsPlaying = (state: RootState) => state.audio.isPlaying;
export const selectAudioFlow = (state: RootState) => state.audio.flow;
export const selectAudioVolume = (state: RootState) => state.audio.volume;
export const selectAudioProgress = (state: RootState) => state.audio.progress;
export const selectAudioId = (state: RootState) =>
  state.audio.audio?.documentId;

export default audioSlice.reducer;
