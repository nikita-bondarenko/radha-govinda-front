    import { useAppSelector } from "@/lib/store/hooks";
import { getLocalizedData } from "@/utils/getLocalizedData";

export const useLocalizedStaticData = () => {
    const pageLocale = useAppSelector((state) => state.locale.locale);
    return getLocalizedData(pageLocale)
}