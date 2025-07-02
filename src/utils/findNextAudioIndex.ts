import { Audio } from "@/components/sections/audio-preview/AudioPreview";

export const findNextAudioIndex = (
  audioData: Audio,
  playlist: Audio[],
  previosAudioBuffer: string[],
  flow: "direct" | "random",
  direction: "next" | "prev",
  currentBufferPosition?: number
): { index: number; usedFallback: boolean } => {
  const currentIndex = playlist.findIndex(
    (audio) => audio?.documentId === audioData?.documentId
  );

  const playlistLength = playlist.length;

  if (flow === "direct") {
    if (direction === "next") {
      return { index: currentIndex < playlistLength - 1 ? currentIndex + 1 : 0, usedFallback: false };
    } else {
      return { index: currentIndex > 0 ? currentIndex - 1 : playlistLength - 1, usedFallback: false };
    }
  } else {
    // Random flow logic
    if (direction === "prev") {
      return handleRandomPrevious(audioData, playlist, previosAudioBuffer, currentBufferPosition);
    } else {
      return { index: handleRandomNext(playlist, previosAudioBuffer, currentBufferPosition), usedFallback: false };
    }
  }
};

// Обработка предыдущего трека в случайном режиме
const handleRandomPrevious = (
  audioData: Audio,
  playlist: Audio[],
  previosAudioBuffer: string[],
  currentBufferPosition?: number
): { index: number; usedFallback: boolean } => {
  console.log('handleRandomPrevious called:', {
    currentAudio: audioData?.Name,
    currentBufferPosition,
    bufferLength: previosAudioBuffer.length,
    buffer: previosAudioBuffer
  });

  if (previosAudioBuffer.length === 0) {
    console.log('Buffer is empty, returning 0');
    return { index: 0, usedFallback: true };
  }

  // ВАЖНО: используем ТОЛЬКО переданную позицию, НЕ ищем трек в буфере заново
  if (currentBufferPosition !== undefined && 
      currentBufferPosition >= 0 && 
      currentBufferPosition > 0) {
    
    const prevTrackId = previosAudioBuffer[currentBufferPosition - 1];
    const prevIndex = playlist.findIndex(
      (audio) => audio?.documentId === prevTrackId
    );
    
    console.log('Moving back in buffer (strict position):', {
      fromPosition: currentBufferPosition,
      toPosition: currentBufferPosition - 1,
      prevTrackId,
      foundAtPlaylistIndex: prevIndex
    });
    
    if (prevIndex !== -1) {
      return { index: prevIndex, usedFallback: false };
    }
  }

  // Если позиция не передана или мы в начале буфера, ищем трек в буфере
  const bufferIndex = previosAudioBuffer.findIndex(
    (id) => id === audioData?.documentId
  );
  
  console.log('Fallback: found current track in buffer at index:', bufferIndex);

  if (bufferIndex > 0) {
    const prevTrackId = previosAudioBuffer[bufferIndex - 1];
    const prevIndex = playlist.findIndex(
      (audio) => audio?.documentId === prevTrackId
    );
    
    if (prevIndex !== -1) {
      return { index: prevIndex, usedFallback: true };
    }
  }

  // Если нет предыдущего в буфере, используем логику direct
  console.log('Using direct logic fallback');
  const currentIndex = playlist.findIndex(
    (audio) => audio?.documentId === audioData?.documentId
  );
  
  return { index: currentIndex > 0 ? currentIndex - 1 : playlist.length - 1, usedFallback: true };
};

// Обработка следующего трека в случайном режиме
const handleRandomNext = (
  playlist: Audio[],
  previosAudioBuffer: string[],
  currentBufferPosition?: number
): number => {
  const playlistLength = playlist.length;
  
  // Если мы не в конце буфера, двигаемся вперед по буферу
  if (currentBufferPosition !== undefined && 
      currentBufferPosition >= 0 && 
      currentBufferPosition < previosAudioBuffer.length - 1) {
    
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
