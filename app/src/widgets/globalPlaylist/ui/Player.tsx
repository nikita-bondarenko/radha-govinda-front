import { selectAudio } from "@/lib/store/audioSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { AudioName } from "@/shared/ui/player/AudioName";
import { CircleAudioButton } from "@/shared/ui/player/CircleAudioButton";
import { NextAudioButton } from "@/shared/ui/player/NextAudioButton";
import { PlayAudioButton } from "@/shared/ui/player/PlayAudioButton";
import { PrevAudioButton } from "@/shared/ui/player/PrevAudioButton";
import { ProgressBar } from "@/shared/ui/player/ProgressBar";
import { ShareBar } from "@/shared/ui/player/ShareBar";
import { ShufflePlaylistButton } from "@/shared/ui/player/ShufflePlaylistButton";
import { parseDate } from "@/utils/parseDate";

export const Player = () => {
  const audio = useAppSelector(selectAudio);
  return (
    <div className="container">
      <div className="flex justify-between mb-[5px] mt-[10px]">
        <div className="w-[60%]">
          <AudioName
            text={audio?.Name}
            className="w-full md:text-[14px] md:font-bold md:leading-[120%] md:text-black md:mb-[5px]"
          />
          <span className="font-semibold black opacity-50 text-[12px] leading-[110%] pointer-events-none">{`${parseDate(
            audio?.Date
          )}${audio?.Place ? `, ${audio?.Place}` : ""}`}</span>
        </div>
        <ShareBar audio={audio} className="w-[38px] h-[38px] mr-[-5px]" />
      </div>
      <ProgressBar
        className="w-full mb-[15px] [&_.body]:gap-[5px] [&_.track]:bg-[#EDEDED]"
        timeDisplayPosition="bottom"
      ></ProgressBar>
      <div className="flex items-center justify-between mb-[12px]">
        <CircleAudioButton className="h-[35px] w-[35px] ml-[-5px]" />
    <div className="flex items-center justify-between gap-[30px]">
    <PrevAudioButton className="h-[50px] w-[50px]"/>
        <PlayAudioButton className="h-[48px] w-[48px]" defaultColor="#7A66D5"/>
        <NextAudioButton className="h-[50px] w-[50px]"/>
    </div>
        <ShufflePlaylistButton className="h-[35px] w-[35px] mr-[-5px]"/>
      </div>
    </div>
  );
};
