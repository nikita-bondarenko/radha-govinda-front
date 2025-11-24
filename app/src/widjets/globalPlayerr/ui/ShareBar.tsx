import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";
import { setFlow, setPlaylistAudioPositions } from "@/lib/store/audioSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { AudioShare } from "@/shared/ui";
import Sign from "@/shared/ui/icons/Sign";
import { copyToClipboard } from "@/shared/utils";
import { shuffleAudioList } from "@/utils/shuffleAudioList";
import clsx from "clsx";
import { useState, useMemo, useEffect, useRef } from "react";
type Props = {
  className?: string;
};

export const ShareBar = ({ className }: Props) => {
  const audio = useAppSelector((state) => state.audio.audio);
  const locale = useAppSelector((state) => state.locale.locale);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleClick = () => {
    setIsTooltipOpen(true);
    const link =
      location.protocol +
      "//" +
      location.host +
      `/playlist/router?category=${audio?.AudioCategory?.documentId}&audio=${audio?.documentId}&locale=${locale}`;

    copyToClipboard(link);
  };

  const tooltipTimeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isTooltipOpen) {
      tooltipTimeoutId.current = setTimeout(() => {
        setIsTooltipOpen(false);
      }, 3000);
    }

    return () => {
      clearTimeout(tooltipTimeoutId.current);
    };
  }, [isTooltipOpen]);

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

  const localizedData = useLocalizedStaticData();

  return (
    <div className="relative">
      <div
        className={clsx(
          "absolute top-[-110%] right-0 transition-opacity px-[17px] py-[8px] rounded-[10px] border-[1px] border-[var(--grey-2)] bg-[var(--grey-3)] flex items-center gap-[16px] pointer-events-none",
          {
            "opacity-0": !isTooltipOpen,
          }
        )}
      >
        <Sign className={"w-[16px] h-[16px]"}></Sign>
        <span className={"whitespace-nowrap small-text"}>
          {localizedData?.audioPreview.succesMessage}
        </span>
      </div>
      <button
        className={clsx(" p-[5px]", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <AudioShare className="w-full h-full [&_*]:transition-colors" fill={fill} />
      </button>
    </div>
  );
};
