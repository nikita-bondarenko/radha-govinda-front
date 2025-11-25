import { createRef, ReactNode, useEffect, useState } from "react";
import { Handler } from "./Handler";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import clsx from "clsx";
import { useWindowSize } from "@/hooks/useWindowSize";
import { setIsGlobalPlaylistOpen } from "@/lib/store/audioSlice";
import { iso } from "zod/v4-mini";

type Props = {
  player: ReactNode;
  playlist: ReactNode;
};

export const Layout = ({ player, playlist }: Props) => {
  const isOpen = useAppSelector((state) => state.audio.isGlobalPlaylistOpen);
  const [height, setHeight] = useState(0);
  const [isDragged, setIsDragged] = useState(false);

  const [hasInitHeightSet, setHasInitHeightSet] = useState(false);
  const { innerHeight, innerWidth } = useWindowSize();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (innerWidth > 1200) {
      console.log('setting false')
        dispatch(setIsGlobalPlaylistOpen(false));
    }
  }, [innerWidth]);

  useEffect(() => {
    if (innerHeight && !hasInitHeightSet) {
      const initHeight = innerHeight * 0.6;
      setHeight(initHeight);
      setHasInitHeightSet(true);
    }
  }, [innerHeight]);

  useEffect(() => {
    if (isOpen) {
      const initHeight = innerHeight * 0.6;
      setHeight(initHeight);
    }
  }, [isOpen]);

  const handleTouch = (e: React.MouseEvent | React.TouchEvent) => {
    console.log('setting false')
    dispatch(setIsGlobalPlaylistOpen(false));
  };

  const handleStopTouch = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isDragged) {
    } else {
      if (height < innerHeight * 0.5) {
        console.log('setting false')
        dispatch(setIsGlobalPlaylistOpen(false));
      } else if (height > innerHeight * 0.7) {
        setHeight(innerHeight);
      }
    }
  }, [isDragged]);

  const [isPlaylistScrolled, setIsPlaylistScrolled] = useState(false);

  const playlistWrapper = createRef<HTMLDivElement>();

  useEffect(() => {
    console.log(isOpen)
    const el = playlistWrapper.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      // Например, считаем, что пользователь «проскроллил», если отошёл от верха > 5px
      setIsPlaylistScrolled(scrollTop > 5);
      console.log("scrollTop:", scrollTop);
    };
    if (isOpen) {
      el.addEventListener("scroll", handleScroll);
      return () => {
        el.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isOpen]);



  return (
    <div
      onTouchStart={handleTouch}
      onClick={handleTouch}
      className={clsx(
        "fixed top-0 left-0 w-screen h-screen transition-opacity z-[200]",
        { "pointer-events-none": !isOpen }
      )}
    >
      <div
        className={clsx(
          "absolute top-0 left-0 w-full h-full bg-black duration-700",
          { "opacity-0": !isOpen },
          { "opacity-50": isOpen }
        )}
      ></div>
      <div
        onTouchStart={handleStopTouch}
        onClick={handleStopTouch}
        style={{ height: `${height}px` }}
        className={clsx(
          "absolute bottom-0 left-0 w-full bg-white rounded-t-[10px] duration-0",
          {
            "translate-y-[110%]": !isOpen,
            "transition-all duration-700": !isDragged,
          }
        )}
      >
        <Handler
          height={height}
          setHeight={setHeight}
          isDragged={isDragged}
          setIsDragged={setIsDragged}
        />
        {player}
        <div
          style={{ height: height - 177 }}
          ref={playlistWrapper}
          className={clsx(
            "overflow-auto pb-[10px] pt-[15px] border-t-[1px] border-t-[#EDEDED]  transition-colors duration-300",
            { "border-opacity-0": !isPlaylistScrolled }
          )}
        >
          {playlist}
        </div>
      </div>
    </div>
  );
};
