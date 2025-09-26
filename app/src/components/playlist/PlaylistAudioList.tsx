"use client"
import React, { createRef, useEffect, useState } from "react";
import { Audio } from "../sections/audio-preview/AudioPreview";
import PlaylistAudio from "./PlaylistAudio";
import clsx from "clsx";
import {
  selectAudioFlow,
  setPlaylist,
  setPlaylistAudioPositions,
} from "@/lib/store/audioSlice";
import { shuffleAudioList } from "@/utils/shuffleAudioList";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

type PlaylistAudioListProps = {
  audios: Audio[];
  audiosPositionList: string[];
};

export default function PlaylistAudioList({
  audios,
  audiosPositionList,
}: PlaylistAudioListProps) {
  const [isRenderFinished, setIsRenderFinished] = useState(false);
  const [isTransitionReady, setIsTransitionReady] = useState(false);
  const wrapper = createRef<HTMLDivElement>();
  const dispatch = useAppDispatch();
  const flow = useAppSelector(selectAudioFlow);

  useEffect(() => {
    setTimeout(() => {
      setIsTransitionReady(true);
    }, 300);
    if (wrapper.current) {
      wrapper.current.style.height = wrapper.current.clientHeight + "px";
      setIsRenderFinished(true);
    }
  }, []);

  const getTranslateY = (id?: string) =>
    audiosPositionList.indexOf(id || "") * 72;

  const controlsClickHandler = () => {
    dispatch(setPlaylist(audios));
    let playlistAudioPositions = [];
    if (flow === "direct") {
      playlistAudioPositions = audios.map((audio) => audio?.documentId || "");
    } else {
      playlistAudioPositions = shuffleAudioList(audios);
    }
    dispatch(setPlaylistAudioPositions(playlistAudioPositions));
  };
  return (
    <div className="container  mt-[-90px]">
      <div className="flex flex-col gap-[10px] relative" ref={wrapper}>
        {audios.map((audio) => (
          <PlaylistAudio
            controlsClickHandler={controlsClickHandler}
            translateY={getTranslateY(audio?.documentId)}
            className={clsx({
              "absolute top-0 translate-y-[var(--translate-y)] w-full ":
                isRenderFinished,
              "transition-transform  duration-1000 ease-in-out":
                isTransitionReady,
            })}
            key={audio?.documentId}
            audio={audio}
          ></PlaylistAudio>
        ))}
      </div>
    </div>
  );
}
