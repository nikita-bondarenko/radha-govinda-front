import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./types";
import { Audio } from "@/components/sections/audio-preview/AudioPreview";

export type AudioState = {
  isHeaderButtonVisible: boolean
  audio: Audio | null;
  isPlaying: boolean;
  volume: number;
  isOrderDirect: boolean;
};

const initialState: AudioState = {
  isHeaderButtonVisible: false,
  audio: null,
  isOrderDirect: true,
  isPlaying: false,
  volume: 50,
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setAudio: (state, action: PayloadAction<Audio | null>) => {
      console.log('state', action.payload)
      state.audio = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    toggleIsPlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setIsOrderDirect: (state, action: PayloadAction<boolean>) => {
        state.isOrderDirect = action.payload
    },
    setVolume: (state, action: PayloadAction<number>) => {
        if (action.payload < 0 || action.payload > 100) {
            throw Error("Volume must be in the range from 0 to 100")
        }
        state.volume = action.payload
    },
  },
});

export const {setAudio, setIsOrderDirect, setVolume, setIsPlaying , toggleIsPlaying} = audioSlice.actions;
export const selectAudio = (state: RootState) => state.audio.audio;
export const selectAudioIsPlaying = (state: RootState) => state.audio.isPlaying;
export const selectAudioIsOrderDirect = (state: RootState) => state.audio.isOrderDirect;
export const selectAudioVolume = (state: RootState) => state.audio.volume

export default audioSlice.reducer;
