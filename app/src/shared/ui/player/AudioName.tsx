import { useWindowSize } from "@/hooks/useWindowSize";
import clsx from "clsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  text?: string;
  className?: string
};

const GAP = 10;
const SPEED = 50; // px/s — регулируй под себя

export const AudioName = ({ text,className }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(232);
  const [textHeight, setTextHeight] = useState(0);
  const [hasAnimationStarted, setHasAnimationStarted] = useState(false);

  const { innerWidth } = useWindowSize();
  const { ref: inViewRef, inView } = useInView({ triggerOnce: false });

  // === 1. Измеряем размеры ===
  useLayoutEffect(() => {
    const update = () => {
      if (!textRef.current || !containerRef.current) return;

      setTextWidth(textRef.current.clientWidth);
      setTextHeight(textRef.current.clientHeight);
      setContainerWidth(containerRef.current.clientWidth);
    };

    update();

    const ro = new ResizeObserver(update);
    if (textRef.current) ro.observe(textRef.current);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => ro.disconnect();
  }, [text, innerWidth]);

  const needsScrolling = textWidth > containerWidth && !!text;
  const fullScroll = textWidth + GAP;

  // === 2. Управление анимацией ===
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // При смене текста — мгновенный сброс в 0
  useEffect(() => {
    startTimeRef.current = null; // это заставит пересчитать время с нуля
    if (innerRef.current) {
      innerRef.current.style.transform = "translateX(0px)";
    }
  }, [text]);

  const delayTimeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Останавливаем, если не нужно скроллить или не в зоне видимости
    if (!inView || !needsScrolling) {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    const animate = (now: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = now; // первый кадр — точка отсчёта
      }

      const elapsed = (now - startTimeRef.current) / 1000;
      let offset = -elapsed * SPEED;

      // Бесшовный цикл
      offset = offset % fullScroll;
      if (offset > 0) offset -= fullScroll; // чтобы всегда было отрицательным или нулём

      innerRef.current!.style.transform = `translateX(${offset}px)`;

      frameRef.current = requestAnimationFrame(animate);
    };

    setHasAnimationStarted(false);
    clearTimeout(delayTimeoutId.current);
    delayTimeoutId.current = setTimeout(() => {
      setHasAnimationStarted(true);

      frameRef.current = requestAnimationFrame(animate);
    }, 5000);
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [inView, needsScrolling, fullScroll, text]); // ← text обязателен в зависимостях!

  // === 3. Рендер ===
  return (
    <div className="relative">
      <div
        ref={(el) => {
          containerRef.current = el;
          inViewRef(el);
        }}
        style={{ height: textHeight || "1.1em" }}
        className={clsx(" relative overflow-hidden text-[16px] leading-[110%]", className)}
      >
        <div
          style={{ height: textHeight || "1.1em" }}
          className={clsx("truncate", { "opacity-0": hasAnimationStarted })}
        >
          {text}
        </div>
        <div
          ref={innerRef}
          className={clsx(
            "flex gap-[10px]  items-center absolute top-0 left-0 text-nowrap ",
            { "opacity-0": !hasAnimationStarted }
          )}
        >
          <div ref={textRef} className="">
            {text}
          </div>
          {needsScrolling && <div>{text}</div>}
        </div>
      </div>
      {/* <div className={clsx("absolute bottom-0 right-0 text-[16px] leading-[110%] translate-x-[100%] transition-opacity", {"opacity-0": !isDotesVisible})}>...</div> */}
    </div>
  );
};
