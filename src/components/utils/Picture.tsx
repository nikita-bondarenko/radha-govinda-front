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

export type Image = {
  __typename?: "UploadFile";
  url?: string;
  formats?: Formats | null;
  alternativeText?: string | null;
};

export type MyPicture = {
  className?: string;
} & Image;

export default memo(function Picture({
  url,
  formats,
  alternativeText,
}: MyPicture) {
  return (
    <div>
      <picture>
        <source srcSet={formats?.medium.url} media="(max-width: 764px)" />
        <source srcSet={formats?.large.url} media="(max-width: 1200px)" />
        <img src={url} alt={alternativeText || ""} />
      </picture>
    </div>
  );
});
