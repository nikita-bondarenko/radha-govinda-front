import PlaylistAudioList from "@/components/playlist/PlaylistAudioList";
import {
  selectPlaylist,
  selectPlaylistAudioPositions,
} from "@/lib/store/audioSlice";
import { useAppSelector } from "@/lib/store/hooks";

export const Playlist = () => {
  const audios = useAppSelector(selectPlaylist);
  const audiosPositionList = useAppSelector(selectPlaylistAudioPositions);

  return (
      <PlaylistAudioList
        audiosPositionList={audiosPositionList}
        audios={audios}
      ></PlaylistAudioList>
  );
};
