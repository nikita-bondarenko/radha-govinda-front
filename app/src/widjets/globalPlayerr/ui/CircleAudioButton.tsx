import { selectAudioIsLooping, toggleIsLooping } from "@/lib/store/audioSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { AudioCircle } from "@/shared/ui";
import clsx from "clsx";
import { useMemo, useState } from "react";

type Props = {
  className?: string;
};

export const CircleAudioButton = ({ className }: Props) => {
  const dispatch = useAppDispatch();

  const isLooping = useAppSelector(selectAudioIsLooping);

  const handleClick = () => {
    dispatch(toggleIsLooping());
  };

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const fill = useMemo(() => {
    if (isLooping && isHover) {
      return "#9C8EDF";
    } else if (isLooping) {
      return "#7A66D5";
    } else if (isHover) {
      return "#B6A9F1";
    } else {
      return "#c0c0c0";
    }
  }, [isLooping, isHover]);

  return (
    <button
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={clsx(className, 'p-[5px]')}
    
    >
      <AudioCircle className="w-full h-full [&_*]:transition-colors" fill={fill}></AudioCircle>
    </button>
  );
};
