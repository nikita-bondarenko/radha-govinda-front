export const parseDate = (date?: string | null) => {
return date?.split('-').reverse().join('.')
}