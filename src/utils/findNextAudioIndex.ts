import { Audio } from "@/components/sections/audio-preview/AudioPreview";

export const findNextAudioIndex = (

  audioData: Audio,
  playlist: Audio[],
  previosAudioBuffer: string[],
  flow: "direct" | "random",
  direction: "next" | "prev"
): number => {
  const currentIndex = playlist.findIndex(
    (audio) => audio?.documentId === audioData?.documentId
  );

  const playlistLength = playlist.length;

  if (flow === "direct") {
    if (direction === "next") {
      return currentIndex < playlistLength - 1 ? currentIndex + 1 : 0;
    } else {
      return currentIndex > 0 ? currentIndex - 1 : playlistLength - 1;
    }
  } else {
 
      const nextIndex = Math.floor(Math.random() * playlistLength);


      if (nextIndex === currentIndex) {
        return findNextAudioIndex(audioData, playlist,previosAudioBuffer, flow, direction);
      }
      return nextIndex;
    
  }
};
