import { useEffect, useRef, useState } from "react";

type Props = {
  height: number;
  setHeight: (height: number) => void;
  isDragged: boolean;
  setIsDragged: (isDragged: boolean) => void;
};

export const Handler = ({ height, setHeight, isDragged, setIsDragged  }: Props) => {

  const initY = useRef(0);
  const initHeight = useRef(0);

  const handleMoveStart = (e: React.MouseEvent | React.TouchEvent) => {
    console.log("start");
    setIsDragged(true);

    if ("touches" in e) {
      initY.current = e.touches[0].clientY;
    } else {
      initY.current = e.clientY;
    }
    initHeight.current = height;
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    console.log("move");

    let clientY: number;
    if ("touches" in e) {
      clientY = e.touches[0].clientY;
    } else {
      clientY = e.clientY;
    }

    const height = initHeight.current + (initY.current - clientY);

    setHeight(height);
  };

  useEffect(() => {
    const handleStopDragging = () => {
      setIsDragged(false);
    };
    if (isDragged) {
      document.addEventListener("touchend", handleStopDragging);
      document.addEventListener("mouseup", handleStopDragging);
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("mousemove", handleMove);

      return () => {
        document.removeEventListener("touchend", handleStopDragging);
        document.removeEventListener("mouseup", handleStopDragging);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("mousemove", handleMove);
      };
    }
  }, [isDragged]);

  return (
    <div
      onTouchStart={handleMoveStart}
      onMouseDown={handleMoveStart}
      className="w-full h-[22px] flex items-center justify-center cursor-pointer"
    >
      <div className="h-[4px] w-[37px] rounded-full bg-[#D9D9D9]"></div>
    </div>
  );
};
