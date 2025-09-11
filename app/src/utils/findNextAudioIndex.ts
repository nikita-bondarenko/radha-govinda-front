import { Audio } from "@/components/sections/audio-preview/AudioPreview";

export const findNextAudioIndex = (
  audioData: Audio,
  playlist: Audio[],
  flow: "direct" | "random",
  direction: "next" | "prev",
): number => {
  const currentIndex = playlist.findIndex(
    (audio) => audio?.documentId === audioData?.documentId
  );

  let newIndex = 0;

  const playlistLength = playlist.length;

  if (flow === "direct") {
    if (direction === "next") {
      newIndex = currentIndex < playlistLength - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : playlistLength - 1;
    }
  } else {
    // Random flow logic
    newIndex = Math.floor(Math.random() * playlistLength);
  }
  return newIndex === currentIndex
    ? findNextAudioIndex(
        audioData,
        playlist,
        flow,
        direction,
      )
    : newIndex;
};

// Обработка предыдущего трека в случайном режиме
const handleRandomPrevious = (
  audioData: Audio,
  playlist: Audio[],
  previosAudioBuffer: string[],
  currentBufferPosition?: number
): number => {
  const currentIndex = playlist.findIndex(
    (audio) => audio?.documentId === audioData?.documentId
  );

  console.log("currentBufferPosition", currentBufferPosition);

  // ВАЖНО: используем ТОЛЬКО переданную позицию, НЕ ищем трек в буфере заново
  if (
    currentBufferPosition !== undefined &&
    currentBufferPosition > 0 &&
    previosAudioBuffer.length > 1
  ) {
    const prevTrackId = previosAudioBuffer[currentBufferPosition - 1];
    const prevIndex = playlist.findIndex(
      (audio) => audio?.documentId === prevTrackId
    );
    console.log("item not first");
    console.log("prevTrackId", prevTrackId);
    console.log("prevIndex", prevIndex);

    if (prevIndex !== -1) {
      return prevIndex;
    }
  }

  console.log("item first");
  console.log(
    "prevIndex",
    currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
  );
  return currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
};

// Обработка следующего трека в случайном режиме
const handleRandomNext = (
  playlist: Audio[],
  previosAudioBuffer: string[],
  currentBufferPosition?: number
): number => {
  const playlistLength = playlist.length;

  // Если мы не в конце буфера, двигаемся вперед по буферу
  if (
    currentBufferPosition !== undefined &&
    currentBufferPosition >= 0 &&
    currentBufferPosition < previosAudioBuffer.length - 1
  ) {
    const nextTrackId = previosAudioBuffer[currentBufferPosition + 1];
    const nextIndex = playlist.findIndex(
      (audio) => audio?.documentId === nextTrackId
    );

    if (nextIndex !== -1) {
      return nextIndex;
    }
  }

  // Если мы в конце буфера или буфер пустой, выбираем новый случайный трек
  if (previosAudioBuffer.length === 0) {
    return Math.floor(Math.random() * playlistLength);
  }

  // Создаем список треков, которые НЕ были проиграны недавно
  const recentTracks = new Set(previosAudioBuffer.slice(-10)); // последние 10 треков
  const availableTracks: number[] = [];

  playlist.forEach((audio, index) => {
    if (audio?.documentId && !recentTracks.has(audio.documentId)) {
      availableTracks.push(index);
    }
  });

  // Если есть непроигранные треки, выбираем из них
  if (availableTracks.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableTracks.length);
    return availableTracks[randomIndex];
  }

  // Если все треки недавно проигрывались, выбираем из менее недавних
  const olderTracks = new Set(previosAudioBuffer.slice(-5)); // последние 5 треков
  const lessecentTracks: number[] = [];

  playlist.forEach((audio, index) => {
    if (audio?.documentId && !olderTracks.has(audio.documentId)) {
      lessecentTracks.push(index);
    }
  });

  if (lessecentTracks.length > 0) {
    const randomIndex = Math.floor(Math.random() * lessecentTracks.length);
    return lessecentTracks[randomIndex];
  }

  // В крайнем случае выбираем любой случайный трек
  return Math.floor(Math.random() * playlistLength);
};
