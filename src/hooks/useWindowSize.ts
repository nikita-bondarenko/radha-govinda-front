import { useEffect, useState } from "react";

type Subscriber = (width: number, height: number) => void;
const subscribers = new Set<Subscriber>();

let scheduled = false;

function globalResizeListener() {
  let cachedWidth =
    typeof window !== "undefined" ? window.innerWidth : /* SSR */ 0;
  let cachedHeight =
    typeof window !== "undefined" ? window.innerHeight : /* SSR */ 0;
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      subscribers.forEach((cb) => cb(cachedWidth, cachedHeight));
    });
  }
}

export function useWindowSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handle = (w: number, h: number) => (setWidth(w), setHeight(h));
    subscribers.add(handle);
            globalResizeListener()
    if (subscribers.size === 1) {
      window.addEventListener("resize", globalResizeListener);
    }
    return () => {
      subscribers.delete(handle);
      if (subscribers.size === 0) {
        window.removeEventListener("resize", globalResizeListener);
      }
    };
  }, []);

  return { innerWidth: width, innerHeight: height };
}
