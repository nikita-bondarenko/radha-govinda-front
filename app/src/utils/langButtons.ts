import { Url } from "next/dist/shared/lib/router/router";

export const langButtons = [
  {
    crossLocale: 'en',
    locale: "ru",
    label: "RU",
    getHref: (pathname: string): Url =>
      pathname
        .split("/")
        .filter((word) => word !== "en")
        .join("/") || "/",
  },
  {
    crossLocale: 'ru',
    locale: "en",
    label: "EN",
    getHref: (pathname: string) => `/en${pathname}`,
  },
];
