import React, { memo } from "react";
import { Image } from "./Picture";
import clsx from "clsx";

export type BackgroundProps = {
  image?: Image;
  className?: string;
  lgImageUrl?: string;
  mdImageUrl?: string;
  smImageUrl?: string;
  imageUrl?: string
};

export default memo(function Background({ image, className, lgImageUrl, mdImageUrl, smImageUrl, imageUrl }: BackgroundProps) {
  return (
    <div
      
      style={
        {
          "--lg-image-url": `url(${imageUrl || lgImageUrl || image?.url})`,
          "--md-image-url": `url(${imageUrl || mdImageUrl || image?.formats?.medium?.url})`,
          "--sm-image-url": `url(${imageUrl || smImageUrl || image?.formats?.small?.url})`,
        } as React.CSSProperties
      }
      className={clsx("background", className)}
    ></div>
  );
});
