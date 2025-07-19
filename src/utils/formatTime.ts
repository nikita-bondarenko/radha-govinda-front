/**
 * Форматирует время в секундах в формат "33m" или "22s"
 * @param seconds - время в секундах
 * @returns отформатированная строка времени
 */
export const formatTime = (seconds: number): string => {
  if (seconds <= 0 || isNaN(seconds) || !isFinite(seconds)) {
    return '0s';
  }

  const minutes = Math.ceil(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (minutes >= 1) {
    return `${minutes}m`;
  } else {
    return `${remainingSeconds}s`;
  }
};

/**
 * Форматирует оставшееся время в секундах в формат "33m" или "22s"
 * @param totalSeconds - общее время в секундах
 * @param passedSeconds - прошедшее время в секундах
 * @returns отформатированная строка оставшегося времени
 */
export const formatRemainingTime = (totalSeconds: number, passedSeconds: number): string => {
  const remainingSeconds = Math.max(0, totalSeconds - passedSeconds);
  return formatTime(remainingSeconds);
}; 