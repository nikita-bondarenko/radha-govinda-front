export default function typograph(text?: string | null) {
    if (!text) return "";
    if (text === "Криптомиксеры: суть и опасность использования") return "Криптомиксеры: суть\u00A0и\u00A0опасность использования";

    const prepositions = [
        "без",
        "для",
        "над",
        "под",
        "при",
        "про",
        "через",
        "вокруг",
        "вместо",
        "внутри",
        "впереди",
        "вследствие",
        "между",
        "наподобие",
        "насчёт",
        "или",
        "все",
        "его",
        "свой",
        "свои",
        "поэтому",
        "после",
        "таких",
        "такой",
        "такая",
        "такое",
        "что",
        "что-то",
        "где-то",
        "зачем-то",
        "почему-то",
        "никто",
        "чтобы",
        "почти",
        "только",
        "потом",
        "если",
        "пока",
        "они",
        "она",
        "всем",
        "всех",
        "вся",
        "весь",
        "как",
        "даже",
        "итоге",
        "также",
        "это",
        "этот",
        "эта",
        "этой",
        "этого",
        "того",
        "той",
        "новый",
        "новая",
        "новое",
        "том",
        "тому",
        "той",
        "мы",
        "их",
        "как",
        'и'
    ];
    
    const res = text
        ?.split(" ")
        .filter((item) => item.trim().length > 0)
        .map((word) => {
            const small = word.trim().length < 3 && !word.trim().includes(".") && !word.trim().includes("-") && !word.trim().includes("—");

            if (prepositions.some((item) => small || word === item || word === item.charAt(0).toUpperCase() + item.slice(1))) {
                return word + "\u00A0";
            } else {
                return word + " ";
            }
        })
        .join("")
        .split("-")
        .join("\u2011");

    return res;
}
