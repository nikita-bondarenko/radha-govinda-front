"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AudioCategoryImage } from "./AudioCategoryImage";
import { AudioName } from "../../../shared/ui/player/AudioName";
import { CircleAudioButton } from "../../../shared/ui/player/CircleAudioButton";
import { NextAudioButton } from "../../../shared/ui/player/NextAudioButton";
import { PlayAudioButton } from "../../../shared/ui/player/PlayAudioButton";
import { PrevAudioButton } from "../../../shared/ui/player/PrevAudioButton";
import { ProgressBar } from "../../../shared/ui/player/ProgressBar";
import { ShareBar } from "../../../shared/ui/player/ShareBar";
import { ShufflePlaylistButton } from "../../../shared/ui/player/ShufflePlaylistButton";
import { VolumeBar } from "./VolumeBar";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import clsx from "clsx";
import { CloseAudioBar } from "./CloseAudioBar";
import { setIsGlobalPlaylistOpen, setIsPlaying } from "@/lib/store/audioSlice";

export const GlobalPlayer = () => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  const audio = useAppSelector((state) => state.audio.audio);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    setModalRoot(modalRoot);
    dispatch(setIsPlaying(false))
  }, []);

  const handleTouch = (e: React.MouseEvent | React.TouchEvent) => {
    console.log("touch");
    setTimeout(() => {
      dispatch(setIsGlobalPlaylistOpen(true));
    }, 100);
  };

  const player = (
    <div
      className={clsx(
        "fixed bottom-0 left-0 w-screen bg-gradient-to-b from-[#D6D2E8] to-[#EDEDED] z-[50] transition-transform",
        { "translate-y-[200px]": !audio }
      )}
    >
      <div className="container py-[5px] flex justify-between gap-[20px] items-center md:hidden">
        <div className="flex gap-[20px] items-center">
          <AudioCategoryImage image={audio?.AudioCategory?.Image} />
          <AudioName className="w-[232px]" text={audio?.Name} />
        </div>
        <div className="flex gap-[5px] items-center">
          <CircleAudioButton className="w-[32px] h-[32px]" />
          <PrevAudioButton className="w-[45px] h-[45px]" />
          <PlayAudioButton
            defaultColor="#7A66D5"
            className="w-[38px] h-[38px] mx-[-8px]"
          />
          <NextAudioButton className="w-[45px] h-[45px]" />
          <ShufflePlaylistButton className="w-[32px] h-[32px]" />
        </div>
        <ProgressBar
          className="w-[360px] md:w-[289px]"
          timeDisplayPosition="sides"
        />
        <div className="flex gap-[10px]">
          <ShareBar audio={audio} className="w-[38px] h-[38px]" />
          <VolumeBar className="w-[37px] h-[37px]" />
        </div>
      </div>
      <div
        onClick={handleTouch}
        onTouchStart={handleTouch}
        className="hidden md:flex container py-[16px] justify-between relative"
      >
        <ProgressBar className="w-full absolute top-[-6px] left-0"></ProgressBar>
        <div className="flex items-center gap-[16px]">
          <PlayAudioButton
            defaultColor="#7A66D5"
            className="w-[38px] h-[38px]"
          />
          <AudioName
            className="md:w-[300px] sm:w-[137px] md:text-[14px] sm:text-[9px]"
            text={audio?.Name}
          />
        </div>
        <div className="flex items-center gap-[2px]">
          <ShareBar audio={audio} className="w-[31px] h-[31px]" />
          <CloseAudioBar className="w-[31px] h-[31px]" />
        </div>
      </div>
    </div>
  );
  return modalRoot ? createPortal(player, modalRoot) : null;
};
