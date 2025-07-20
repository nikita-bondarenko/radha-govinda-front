"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "@/lib/store/store";

type StoreProviderProps = {
  children: React.ReactNode;
  /**
   * Предзагруженное состояние, полученное на сервере
   */
};

export default function StoreProvider({
  children,
}: StoreProviderProps) {

  return <Provider store={store}>{children}</Provider>;
}
