import React from "react";
import { Audio } from "../sections/audio-preview/AudioPreview";
import PlaylistAudio from "./PlaylistAudio";

type PlaylistAudioListProps = {
  audios: Audio[];
};

export default function PlaylistAudioList({ audios }: PlaylistAudioListProps) {
  return (
    <div className="container flex flex-col gap-[10px]">
      {audios.map((audio) => (
        <PlaylistAudio key={audio?.documentId} audio={audio}></PlaylistAudio>
      ))}
    </div>
  );
}
