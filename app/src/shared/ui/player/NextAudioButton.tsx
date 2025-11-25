
import { AudioNext, AudioPrev } from "@/shared/ui";
import { AudioElement } from "@/utils/audioModel";
import clsx from "clsx";
import { useState, useMemo } from "react";

type Props = {
  className?: string;
};

export const NextAudioButton = ({ className }: Props) => {

  const handleClick = () => {
    const audioElement = new AudioElement();
    audioElement.playNextAudio();
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
      return "#818181";
    }
  }, [isHover]);

  return (
    <button
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={clsx(className, "p-[5px]")}
    >
      <AudioNext
        className="w-full h-full [&_*]:transition-colors"
        fill={fill}
      ></AudioNext>
    </button>
  );
};
