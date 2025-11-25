import {
  selectAudio,
  selectAudioIsLoading,
  selectAudioIsPlaying,
  setIsPlaying,
} from "@/lib/store/audioSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { AudioPlay, AudioPrev } from "@/shared/ui";
import PauseIcon from "@/shared/ui/icons/PauseIcon";
import PlayIcon from "@/shared/ui/icons/PlayIcon";
import { AudioElement } from "@/utils/audioModel";
import clsx from "clsx";
import { useState, useMemo, useEffect } from "react";

type Props = {
  className?: string;
  defaultColor: string;
};

export const PlayAudioButton = ({ className, defaultColor }: Props) => {
  const isLoading = useAppSelector(selectAudioIsLoading);
  const isPlaying = useAppSelector(selectAudioIsPlaying);
  const audio = useAppSelector(selectAudio);

  const dispatch = useAppDispatch();
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // console.log("handleClick");
    const audioElement = new AudioElement();
    if (isPlaying) {
      dispatch(setIsPlaying(false));
      audioElement.pause();
    } else {
      audioElement.play({ audio })?.then(() => {
        dispatch(setIsPlaying(true));
      });
    }
  };

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const fill = useMemo(() => {
    if (isHover) {
      return "#B6A9F1";
    } else {
      return defaultColor;
    }
  }, [isHover]);

  const handleTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <button
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      onTouchStart={handleTouch}
      className={clsx(className, "p-[5px] relative", {
        "pointer-event-none": isLoading,
      })}
    >
      <PlayIcon
        className={clsx(
          "[&]:w-[calc(100%-10px)] [&]:h-[calc(100%-10px)] [&_*]:transition-colors transition-opacity absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          {
            "play-button-loading": isLoading,
            "opacity-0": isPlaying && !isLoading,
          }
        )}
        fill={fill}
      />
      <PauseIcon
        className={clsx(
          "[&]:w-[calc(100%-10px)] [&]:h-[calc(100%-10px)] [&_*]:transition-colors transition-opacity absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          { "opacity-0": !isPlaying || isLoading }
        )}
        fill={fill}
      />
    </button>
  );
};
