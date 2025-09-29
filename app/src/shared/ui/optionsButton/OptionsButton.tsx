import { Audio } from "@/components/sections/audio-preview/AudioPreview";
import DotsIcon from "@/components/svg/DotsIcon";
import ShareIcon from "@/components/svg/ShareIcon";
import Sign from "@/components/svg/Sign";
import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";
import { useAppSelector } from "@/lib/store/hooks";
import { copyToClipboard } from "@/shared/utils";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

type Props = {
  audio?: Audio | null;
  className?: string;
};

const shareButtonClassNames = "h-[36px] px-[17px] py-[8px] rounded-[10px] border-[1px] border-[var(--grey-2)] bg-[var(--grey-3)] flex items-center gap-[16px] opacity-0 pointer-events-none transition-opacity"

export default function OptionsButton({ audio, className }: Props) {
  const [areOptionsOpen, setAreOptionsOpen] = useState(false);

  const optionsClickHandler: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    setAreOptionsOpen((prev) => !prev);
  };

  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const locale = useAppSelector((state) => state.locale.locale);

  const shareButtonClickHandler: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    setSuccessMessageVisible(true);
 

      const link = location.protocol +
      "//" +
      location.host + `/playlist/router?category=${audio?.AudioCategory?.documentId}&audio=${audio?.documentId}&locale=${locale}`;  

    copyToClipboard(link);
    setTimeout(() => {
      setSuccessMessageVisible(false);
      setAreOptionsOpen(false);
    }, 1000);
  };

  useEffect(() => {
    const documentClickHandler = (e: Event) => {
      e.preventDefault();
      setAreOptionsOpen(false);
    };

    if (areOptionsOpen) {
      document.addEventListener("click", documentClickHandler);
      return () => {
        document.removeEventListener("click", documentClickHandler);
      };
    }
  }, [areOptionsOpen]);

  const localizedData = useLocalizedStaticData();
  return (
    <div className={"relative"}>
      <div
        onClick={shareButtonClickHandler}
        className={clsx(
          
          "absolute right-[-21px] bottom-[100%]  flex items-center  opacity-0 pointer-events-none transition-opacity",
          {
            "[&]:opacity-100 [&]:pointer-events-auto":
              areOptionsOpen || successMessageVisible,
          }
        )}
      >
        <button
          className={clsx(
            shareButtonClassNames,
            "absolute top-0 right-0",
            {
              "[&]:opacity-100 [&]:pointer-events-auto": !successMessageVisible,
            }
          )}
        >
          <ShareIcon
            fill={"var(--black)"}
            className={"[&]:w-[20px] [&]:h-[20px]"}
          ></ShareIcon>
          <span className={"whitespace-nowrap small-text"}>
            {localizedData?.audioPreview.shareButton}
          </span>
        </button>
        <button
          className={clsx(
            shareButtonClassNames,
            { "[&]:opacity-100 [&]:pointer-events-auto": successMessageVisible }
          )}
        >
          <Sign className={"w-[16px] h-[16px]"}></Sign>
          <span className={"whitespace-nowrap small-text"}>
            {localizedData?.audioPreview.succesMessage}
          </span>
        </button>
      </div>
      <button
        onClick={optionsClickHandler}
        className={clsx("w-[18px] h-[17px] ", className)}
      >
        <DotsIcon fill="var(--grey-2)"></DotsIcon>
      </button>
    </div>
  );
}
