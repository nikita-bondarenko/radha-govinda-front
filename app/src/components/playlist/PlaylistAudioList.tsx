import React, { createRef, useEffect, useState } from "react";
import { Audio } from "../sections/audio-preview/AudioPreview";
import PlaylistAudio from "./PlaylistAudio";
import clsx from "clsx";

type PlaylistAudioListProps = {
  audios: Audio[];
  audiosPositionList: string[];
};

export default function PlaylistAudioList({
  audios,
  audiosPositionList,
}: PlaylistAudioListProps) {
  const [isRenderFinished, setIsRenderFinished] = useState(false);
  const [listHeight, setListHeight] = useState("auto");

  const wrapper = createRef<HTMLDivElement>();

  useEffect(() => {
    setTimeout(() => {
      setIsRenderFinished(true);
      if (wrapper.current)
        wrapper.current.style.height = wrapper.current.clientHeight + "px";
    }, 200);
  }, []);

  const getTranslateY = (id?: string) =>
    audiosPositionList.indexOf(id || "") * 72;
  return (
    <div className="container  mt-[-90px]">
      <div className="flex flex-col gap-[10px] relative" ref={wrapper}>
        {audios.map((audio) => (
          <PlaylistAudio
            translateY={getTranslateY(audio?.documentId)}
            className={clsx({
              "absolute top-0 translate-y-[var(--translate-y)] w-full transition-transform duration-1000 ease-in-out":
                isRenderFinished,
            })}
            key={audio?.documentId}
            audio={audio}
          ></PlaylistAudio>
        ))}
      </div>
    </div>
  );
}
