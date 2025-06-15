import React, { memo } from "react";

type Formats = {
  [key in "large" | "small" | "medium" | "thumbnail"]: {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
  };
};

export type Image =
  | {
      __typename?: string;
      url?: string;
      formats?: Formats | null;
      alternativeText?: string | null;
    }
  | null
  | undefined;

export type MyPicture = {
  className?: string;
} & Image;

export default memo(function Picture({
  url,
  formats,
  alternativeText,
  className,
}: MyPicture) {
  console.log(formats?.small?.url)

  return (

    <div className={className}>
     
      <picture>
        <source srcSet={formats?.small?.url || ""} media="(max-width: 764px)" />
        <source srcSet={formats?.small?.url || ''} media="(max-width: 1200px)" />
        <img className="image" src={url} alt={alternativeText || ""} />
      </picture>
    </div>
  );
});
