import { Audio } from "@/components/sections/audio-preview/AudioPreview";
import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";
import { useAppSelector } from "@/lib/store/hooks";
import { AudioShare } from "@/shared/ui";
import Sign from "@/shared/ui/icons/Sign";
import { copyToClipboard } from "@/shared/utils";
import clsx from "clsx";
import { useState, useMemo, useEffect, useRef } from "react";
type Props = {
  className?: string;
  audio: Audio
};

export const ShareBar = ({ className, audio }: Props) => {
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

    const handleTouch = (e: React.MouseEvent | React.TouchEvent) => {
       e.stopPropagation()
      };
    

  return (
    <div onClick={handleTouch} onTouchStart={handleTouch}  className="relative peer">
      <div
        className={clsx(
          "absolute top-[-110%] right-0 transition-opacity px-[17px] py-[8px] rounded-[10px] border-[1px] border-[var(--grey-2)] bg-[var(--grey-3)] flex items-center gap-[16px] pointer-events-none md:px-[10px] md:py-[4px] md:gap-[10px] md:rounded-[6px] md:top-[-80%]",
          {
            "opacity-0": !isTooltipOpen,
          }
        )}
      >
        <Sign className={"w-[16px] h-[16px] md:w-[14px] md:h-[14px] sm:w-[12px] sm:h-[12px]"}></Sign>
        <span className={"whitespace-nowrap text-[16px] leading-[110%] md:text-[14px] sm:text-[12px]"}>
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
