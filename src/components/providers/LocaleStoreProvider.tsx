"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { createStore, AppStore } from "@/lib/store/store";
import { createLocaleStore, LocaleStore } from "@/lib/localeStore/localeStore";

type LocaleStoreProviderProps = {
  children: React.ReactNode;
  /**
   * Предзагруженное состояние, полученное на сервере
   */
  initialState?: Parameters<typeof createStore>[0];
};

export default function LocaleStoreProvider({
  children,
  initialState,
}: LocaleStoreProviderProps) {
  const storeRef = useRef<LocaleStore>();

  if (!storeRef.current) {
    // Создаем store только один раз
    storeRef.current = createLocaleStore(initialState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
