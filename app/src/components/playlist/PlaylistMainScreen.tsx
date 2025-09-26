import React from "react";
import Picture, { Image } from "../utils/Picture";
import typograph from "@/utils/typograph";
type PlaylistMainScreen = {
  image: Image;
  title?: string | null;
  listLength: string;
  listDuration: string;
};

export default function PlaylistMainScreen({
  image,
  title,
  listDuration,
  listLength,
}: PlaylistMainScreen) {
  return (
    <div className="flex flex-col items-center px-[40px] pt-[75px] pb-[13px]">
      <Picture className="aspect-square rounded-[5%] overflow-hidden" {...image}></Picture>
      <div className="pt-[20px] w-full text-[#818181]">
        <h1 className="text-center  text-[20px] leading-[100%] font-bold tracking-[2%] uppercase mx-[-40px]">
          {typograph(title)}
        </h1>
        <div className="flex items-center justify-between pt-[8px] text-[12px] leading-[110%]">
          <div>{listLength}</div>
          <div>{listDuration}</div>
        </div>
      </div>
    </div>
  );
}
