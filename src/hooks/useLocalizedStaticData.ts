import { useLocaleSelector } from "@/lib/localeStore/hooks";
import { getLocalizedData } from "@/utils/getLocalizedData";
import { useMemo } from "react";

export const useLocalizedStaticData = () => {
    const pageLocale = useLocaleSelector((state) => state.locale);
    return getLocalizedData(pageLocale)

}