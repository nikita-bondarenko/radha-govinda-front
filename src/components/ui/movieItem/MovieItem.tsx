import React, { memo, useEffect, useMemo } from "react";
import styles from "./MovieItem.module.css";
import { Movie } from "@/components/sections/video-preview/VideoPreview";
import { useInView } from "react-intersection-observer";
import useVisibilityPersentage from "@/hooks/useVisibilityPersentage";
import clsx from "clsx";


export default memo(function MovieItem({ movie, className }: { movie: Movie, className?:string }) {
  const { ref, percentInView } = useVisibilityPersentage();
  const youtubeEmbedLink = useMemo(() => {
    const urlObj = new URL(movie?.YoutubeLink || "");
    let videoId = "";
    let params = urlObj.search;
    if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.substring(1);
    }
    if (urlObj.hostname.includes("youtube.com")) {
      const searchParams = new URLSearchParams(urlObj.search);
      videoId = searchParams.get("v") || "";
    }

    if (!videoId) {
      throw new Error("Некорректная ссылка на YouTube");
    }

    return `https://www.youtube.com/embed/${videoId}${params}`;
  }, [movie]);
  return (
    <li ref={ref} className={clsx(styles.item, className)}>
      <div
        style={{ opacity: 1 - percentInView / 100 }}
        className={styles.smoke}
      ></div>
      <iframe
        className={styles.movie}
        src={youtubeEmbedLink}
        allowFullScreen
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </li>
  );
});
