import { Audio } from "@/components/sections/audio-preview/AudioPreview";

export const shuffleAudioList = (audios: Audio[]) => {
  return audios
    .map((audio) => ({
      id: audio?.documentId,
      index: Math.floor(Math.random() * 10000),
    }))
    .sort((a, b) => (a.index < b.index ? 1 : -1))
    .map((ref) => audios.find((audio) => audio?.documentId === ref.id))
    .filter((audio) => !!audio);
};
