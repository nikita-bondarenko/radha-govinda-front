"use client";

import React, { useEffect, useState } from "react";
import Picture, { Image } from "../utils/Picture";
import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";

import {
  selectAudioIsPlaying,
  selectAudioIsLoading,
  selectAudioFlow,
} from "@/lib/store/audioSlice";
import { useAppSelector } from "@/lib/store/hooks";
import Shuffle from "../../shared/ui/icons/Shuffle";
import PlaylistButton from "./PlaylistButton";
import PlaylistPlayButton from "./PlaylistPlayButton";
import PlaylistShuffleButton from "./PlaylistShuffleButton";
import PlaylistStopButton from "./PlaylistStopButton";
import PlaylistMainScreen from "./PlaylistMainScreen";
import PlaylistSortButton from "./PlaylistSortButton";

type Props = {
  audioCategory?: {
    __typename?: string;
    Name: string;
    locale?: string | null;
    documentId: string;
    Image?: Image;
  } | null;
  audioListlength: number;
  audioListTotalHours: number;
  shuffle: () => void;
  sort: () => void;
  play: () => void;
  pause: () => void;
};

export default function PlaylistControls({
  audioCategory,
  audioListTotalHours,
  audioListlength,
  shuffle,
  sort,
  play,
  pause,
}: Props) {
  const isLoading = useAppSelector(selectAudioIsLoading);
  const isPlaying = useAppSelector(selectAudioIsPlaying);
  const playingFlow = useAppSelector(selectAudioFlow);
  const [isFlowDirect, setIsFlowDirect] = useState(true);

  useEffect(() => {
    setIsFlowDirect(playingFlow === "direct");
  }, [playingFlow]);

  const texts = useLocalizedStaticData();

  return (
    <section>
      <div className="container pb-[21px] [&]:max-w-[500px]">
        <PlaylistMainScreen
          image={audioCategory?.Image}
          title={audioCategory?.Name}
          listLength={`${audioListlength} ${texts?.playlist.controls.audio}`}
          listDuration={`${audioListTotalHours} ${texts?.playlist.controls.duration(audioListTotalHours)}`}
        ></PlaylistMainScreen>
        <div className="pt-[15px] flex flex-col gap-[13px] w-full">
          <div className="relative w-full">
            <PlaylistStopButton
              isVisible={isPlaying && !isLoading}
              onClick={pause}
              text={texts?.playlist.controls.playButton.stop}
            ></PlaylistStopButton>
            <PlaylistPlayButton
              isLoading={isLoading}
              onClick={play}
              text={texts?.playlist.controls.playButton.play}
            ></PlaylistPlayButton>
        </div>
          <div className="relative w-full">
            <PlaylistSortButton
              onClick={sort}
              text={texts?.playlist.controls.mixButton.sort}
              isVisible={!isFlowDirect}
            ></PlaylistSortButton>
            <PlaylistShuffleButton
              onClick={shuffle}
              text={texts?.playlist.controls.mixButton.shuffle}
            ></PlaylistShuffleButton>
          </div>
        </div>
      </div>
    </section>
  );
}
