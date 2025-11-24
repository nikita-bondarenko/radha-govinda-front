import {
  selectAudioFlow,
  selectAudioIsLooping,
  selectPlaylist,
  setFlow,
  setPlaylistAudioPositions,
  toggleIsLooping,
} from "@/lib/store/audioSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { AudioShuffle } from "@/shared/ui";
import { shuffleAudioList } from "@/utils/shuffleAudioList";
import clsx from "clsx";
import { useState, useMemo } from "react";

type Props = {
  className?: string;
};

export const ShufflePlaylistButton = ({ className }: Props) => {
  const dispatch = useAppDispatch();

  const flow = useAppSelector(selectAudioFlow);
  const playlist = useAppSelector(selectPlaylist);

  const handleClick = () => {
    const newFlow = flow === "random" ? "direct" : "random";
    dispatch(setFlow(newFlow));

    let playlistAudioPositions = [];
    if (newFlow === "direct") {
      playlistAudioPositions = playlist.map((audio) => audio?.documentId || "");
    } else {
      playlistAudioPositions = shuffleAudioList(playlist);
    }
    dispatch(setPlaylistAudioPositions(playlistAudioPositions));
  };

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const fill = useMemo(() => {
    const isFlowShuffle = flow === "random";
    if (isFlowShuffle && isHover) {
      return "#9C8EDF";
    } else if (isFlowShuffle) {
      return "#7A66D5";
    } else if (isHover) {
      return "#B6A9F1";
    } else {
      return "#c0c0c0";
    }
  }, [flow, isHover]);

  return (
    <button
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={clsx(className, "p-[5px]")}
    >
      <AudioShuffle
        className="w-full h-full [&_*]:transition-colors"
        fill={fill}
      ></AudioShuffle>
    </button>
  );
};
