type LocalizeHref = {
    pageLocale: "ru" | "en" | null | undefined | string,
    pageSlug: string | null | undefined
}

export const localizeHref = ({pageLocale, pageSlug} : LocalizeHref) => {
return pageLocale === "en" ? `/en/${pageSlug}` : `/${pageSlug}`
}