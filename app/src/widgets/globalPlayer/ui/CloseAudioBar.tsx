import AudioItem from "@/components/ui/audioItem/AudioItem";
import { setAudio, setIsPlaying } from "@/lib/store/audioSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { AudioCross } from "@/shared/ui/icons/AudioCross";
import { AudioElement } from "@/utils/audioModel";
import clsx from "clsx";
import { useMemo, useState } from "react";

type Props = {
  className?: string;
};

export const CloseAudioBar = ({ className }: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = (e:React.MouseEvent) => {
    e.stopPropagation()
    dispatch(setAudio(null));
    dispatch(setIsPlaying(false));
    const audioElement = new AudioElement();
    audioElement.pause()
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

  const handleTouch = (e: React.TouchEvent) => {
       e.stopPropagation()
      };
  return (
    <button
      className={clsx(" p-[5px]", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouch}
    >
      <AudioCross
        className="w-full h-full [&_*]:transition-colors"
        fill={fill}
      />
    </button>
  );
};
