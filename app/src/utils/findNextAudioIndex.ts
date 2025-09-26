import { Audio } from "@/components/sections/audio-preview/AudioPreview";
type Props = {
  audio: Audio;
  playlist: Audio[];
  playlistAudioPositions: string[];
  direction: "next" | "prev";
};

export const findNextAudioIndex = ({
  audio,
  playlist,
  playlistAudioPositions,
  direction,
}: Props): number => {
  const playlistPositionsIndex = playlistAudioPositions.findIndex(
    (id) => id === audio?.documentId
  );
  let wantedPlaylistPositionsIndex: number;

  if (direction === "next") {
    if (playlistPositionsIndex === playlistAudioPositions.length - 1) {
      wantedPlaylistPositionsIndex = 0;
    } else {
      wantedPlaylistPositionsIndex = playlistPositionsIndex + 1;
    }
  } else {
    if (playlistPositionsIndex === 0) {
      wantedPlaylistPositionsIndex = playlistAudioPositions.length - 1;
    } else {
      wantedPlaylistPositionsIndex = playlistPositionsIndex - 1;
    }
  }

  const wantedAudioId = playlistAudioPositions[wantedPlaylistPositionsIndex];

  const playlistIndex = playlist.findIndex(
    (audio) => audio?.documentId === wantedAudioId
  );

  return playlistIndex;
};
