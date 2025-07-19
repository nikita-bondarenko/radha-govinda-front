import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Locale } from "@/utils/getLocalizedData";

export type LocaleState = {
  locale: Locale | null;
};

const initialState: LocaleState = {
  locale: "ru",
};

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      console.log('localeSlice: setting locale from', state.locale, 'to', action.payload);
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;

export default localeSlice.reducer;
