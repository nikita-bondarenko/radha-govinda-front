"use client"
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AudioCategoryImage } from "./AudioCategoryImage";
import { AudioName } from "./AudioName";
import { CircleAudioButton } from "./CircleAudioButton";
import { NextAudioButton } from "./NextAudioButton";
import { PlayAudioButton } from "./PlayAudioButton";
import { PrevAudioButton } from "./PrevAudioButton";
import { ProgressBar } from "./ProgressBar";
import { ShareBar } from "./ShareBar";
import { ShufflePlaylistButton } from "./ShufflePlaylistButton";
import { VolumeBar } from "./VolumeBar";
import { useAppSelector } from "@/lib/store/hooks";
import clsx from "clsx";

export const GlobalPlayer = () => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  const audio = useAppSelector(state => state.audio.audio)

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    console.log(audio)
    setModalRoot(modalRoot);
  }, []);


  const player = (
    <div className={clsx("fixed bottom-0 left-0 w-screen bg-gradient-to-b from-[#D6D2E8] to-[#EDEDED] z-[420] transition-transform", {"translate-y-[200px]": !audio})}>
      <div className="container py-[5px] flex justify-between gap-[20px] items-center">
        <div className="flex gap-[20px] items-center">
          <AudioCategoryImage image={audio?.AudioCategory?.Image} />
          <AudioName text={audio?.Name}/>
        </div>
        <div className="flex gap-[5px] items-center">
          <CircleAudioButton className="w-[32px] h-[32px]"/>
          <PrevAudioButton className="w-[45px] h-[45px]"/>
          <PlayAudioButton defaultColor="#7A66D5" className="w-[38px] h-[38px] mx-[-8px]"/>
          <NextAudioButton className="w-[45px] h-[45px]"/>
          <ShufflePlaylistButton className="w-[32px] h-[32px]"/>
        </div>
        <ProgressBar timeDisplayPosition="sides"/>
        <div className="flex gap-[10px]">
          <ShareBar className="w-[38px] h-[38px]"/>
          <VolumeBar className="w-[37px] h-[37px]"/>
        </div>
      </div>
    </div>
  );
  return modalRoot ? createPortal(player, modalRoot) : null;
};
