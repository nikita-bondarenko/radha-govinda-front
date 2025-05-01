import React, { memo } from "react";
import { Image } from "./Picture";
import clsx from "clsx";

export type BackgroundProps = {
  image: Image;
  className?: string;
  lgImageUrl?: string;
  mdImageUrl?: string;
  smImageUrl?: string
};

export default memo(function Background({ image, className, lgImageUrl, mdImageUrl, smImageUrl }: BackgroundProps) {
  return (
    <div
      
      style={
        {
          "--lg-image-url": `url(${lgImageUrl || image?.url})`,
          "--md-image-url": `url(${mdImageUrl || image?.formats?.medium?.url})`,
          "--sm-image-url": `url(${smImageUrl || image?.formats?.small?.url})`,
        } as React.CSSProperties
      }
      className={clsx("background", className)}
    ></div>
  );
});
