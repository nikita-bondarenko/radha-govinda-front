import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Audio } from "@/components/sections/audio-preview/AudioPreview";
import { Locale } from "@/utils/getLocalizedData";

export type LocaleState = {
  locale: Locale | null;
};

const initialState: LocaleState = {
  locale: "ru",
};

const localeSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;

export default localeSlice.reducer;
