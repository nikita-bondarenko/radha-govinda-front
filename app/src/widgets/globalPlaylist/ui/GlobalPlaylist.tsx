"use client";
import { Player } from "./Player";
import { Playlist } from "./Playlist";
import { Layout } from "./Layout";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const GlobalPlaylist = () => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    setModalRoot(modalRoot);
  }, []);

  const playlist = <Layout player={<Player />} playlist={<Playlist />} />;

  return modalRoot ? createPortal(playlist, modalRoot) : null;
};
