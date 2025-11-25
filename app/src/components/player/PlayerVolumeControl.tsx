// PlayerVolumeControl.tsx
import { selectAudioVolume, setVolume } from "@/lib/store/audioSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { AudioVolume } from "@/shared/ui/icons/AudioVolume";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
};

export const PlayerVolumeControl = ({ className }: Props) => {
  const volume = useAppSelector(selectAudioVolume);
  const dispatch = useAppDispatch();

  const [isDragging, setIsDragging] = useState(false);
  const [liveVolume, setLiveVolume] = useState(volume);

  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) {
      setLiveVolume(volume);
    }
  }, [volume, isDragging]);

  const updateVolume = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percent = Math.max(0, Math.min(100, Math.round((x / width) * 100)));
    setLiveVolume(percent);
    dispatch(setVolume(percent));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    updateVolume(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    updateVolume(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging]);

  return (
    <div className={clsx("flex items-center gap-[5px]", className)}>
      <AudioVolume className="w-[31px] h-[22px]" fill="#818181" />

      {/* Интерактивная зона — ровно 10px */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        className="relative w-[100px] h-[20px] cursor-pointer select-none"
        style={{ touchAction: "none" }}
      >
        {/* Видимая полоса 4px по центру */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[4px] bg-white rounded-full">
          {/* Прогресс */}
          <div
            className={clsx("absolute inset-y-0 left-0 rounded-full", {'transition-all':!isDragging})}
            style={{
              width: `${liveVolume}%`,
              background: "var(--main-purple)",
            }}
          />

          {/* Thumb — 10px → 14px при драге */}
          <div
            className={clsx(
              "absolute top-1/2 -translate-y-1/2 rounded-full",
              isDragging ? "w-[14px] h-[14px]" : "w-[10px] h-[10px] transition-all"
            )}
            style={{
              left: `${liveVolume}%`,
              transform: "translate(-50%, -50%)",
              background: "var(--main-purple)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>
    </div>
  );
};