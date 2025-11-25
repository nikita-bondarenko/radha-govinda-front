import { selectAudioVolume, setVolume } from "@/lib/store/audioSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { AudioVolume } from "@/shared/ui/icons/AudioVolume";
import { AudioElement } from "@/utils/audioModel";
import clsx from "clsx";
import { useMemo, useRef, useState, useEffect } from "react";

type Props = {
  className?: string;
};

export const VolumeBar = ({ className }: Props) => {
  const volume = useAppSelector(selectAudioVolume);
  const dispatch = useAppDispatch();

  const [isBarOpen, setIsBarOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [liveVolume, setLiveVolume] = useState(volume);

  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isDragging) setLiveVolume(volume);
  }, [volume, isDragging]);

  const updateVolume = (clientY: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const y = clientY - rect.top;
    const height = rect.height;
    const percent = Math.round(
      Math.max(0, Math.min(100, ((height - y) / height) * 100))
    );
    setLiveVolume(percent);
    dispatch(setVolume(percent));
    const audioElement = new AudioElement();
    audioElement.setVolume(volume);
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    updateVolume(clientY);
  };

  const handlePointerMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    updateVolume(clientY);
  };

  const handlePointerUp = () => setIsDragging(false);

  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener("mousemove", handlePointerMove);
    document.addEventListener("mouseup", handlePointerUp);
    document.addEventListener("touchmove", handlePointerMove, {
      passive: false,
    });
    document.addEventListener("touchend", handlePointerUp);

    return () => {
      document.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseup", handlePointerUp);
      document.removeEventListener("touchmove", handlePointerMove);
      document.removeEventListener("touchend", handlePointerUp);
    };
  }, [isDragging]);

  // Закрытие по клику снаружи — с проверкой по buttonRef
  useEffect(() => {
    if (!isBarOpen) return;

    const handleOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return; // клик внутри панели или по кнопке — не закрываем
      }
      setIsBarOpen(false);
    };

    // небольшая задержка, чтобы клик по кнопке успел "пройти"
    const id = setTimeout(() => {
      document.addEventListener("mousedown", handleOutside);
      document.addEventListener("touchstart", handleOutside);
    }, 0);

    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [isBarOpen]);

  const fill = useMemo(() => (isHover ? "#B6A9F1" : "#818181"), [isHover]);

  return (
    <div className="relative flex items-center">
      {/* Панель громкости */}
      <div
        ref={panelRef}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className={clsx(
          "absolute left-1/2 -translate-x-1/2 bottom-[45px] px-[6px] py-[10px] bg-[#DCD9E9] rounded-lg shadow-lg transition-all duration-200 z-50",
          "opacity-0 pointer-events-none",
          isBarOpen && "opacity-100 pointer-events-auto"
        )}
        style={{ height: "151px", width: "28px" }}
      >
        <div className="relative w-full h-full flex justify-center items-center">
          <div
            ref={trackRef}
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
            className="relative w-[4px] h-full bg-white rounded-full cursor-pointer select-none"
            style={{ touchAction: "none" }}
          >
            <div
              className="absolute bottom-0 left-0 w-full bg-[#7A66D5] rounded-full transition-none"
              style={{ height: `${liveVolume}%` }}
            />
            <div
              className={clsx(
                "absolute left-1/2 bg-[#7A66D5] rounded-full shadow-md transition-all",
                isDragging
                  ? "w-[14px] h-[14px] shadow-lg duration-0"
                  : "w-[10px] h-[10px] duration-150"
              )}
              style={{
                bottom: `${liveVolume}%`,
                transform: "translate(-50%, 50%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Кнопка — теперь с ref и stopPropagation */}
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation(); // критично!
          setIsBarOpen((prev) => !prev);
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={clsx(className, "p-[5px]")}
      >
        <AudioVolume
          fill={fill}
          className="w-[24px] h-[24px] [&_*]:transition-colors duration-200"
        />
      </button>
    </div>
  );
};
