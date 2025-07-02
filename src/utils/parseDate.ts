export const parseDate = (date?: string | null) => {
return date?.split('-').reverse().join('.')
}

/**
 * Парсит строку длительности в секунды
 * Поддерживает форматы: "30", "01:40", "02:05:40"
 * @param duration - строка длительности
 * @returns количество секунд или null если не удалось распарсить
 */
export function parseDurationToSeconds(duration: string): number | null {
  if (!duration || typeof duration !== 'string') {
    return null;
  }

  const trimmed = duration.trim();
  
  // Проверяем, содержит ли строка двоеточия
  if (!trimmed.includes(':')) {
    // Формат "30" - просто секунды
    const seconds = parseInt(trimmed, 10);
    return isNaN(seconds) ? null : seconds;
  }

  // Разбиваем по двоеточиям
  const parts = trimmed.split(':');
  
  if (parts.length === 2) {
    // Формат "01:40" - минуты:секунды
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    
    if (isNaN(minutes) || isNaN(seconds)) {
      return null;
    }
    
    return minutes * 60 + seconds;
  } else if (parts.length === 3) {
    // Формат "02:05:40" - часы:минуты:секунды
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      return null;
    }
    
    return hours * 3600 + minutes * 60 + seconds;
  }
  
  return null;
}