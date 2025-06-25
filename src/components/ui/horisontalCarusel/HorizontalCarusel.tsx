"use client"
import { from } from '@apollo/client'
import clsx from 'clsx'
import { useRef, useState, useEffect } from 'react'
import MovieItem from '../movieItem/MovieItem'
import React, { ReactNode } from 'react'
import styles from './HorizontalCarusel.module.css'
type Props = {
    children: ReactNode
    scrollbarClassNames?: string
    listClassNames?: string
}

const HorizontalCarusel = (props: Props) => {
    const [wrapperHeight, setWrapperHeight] = useState(0);
    const list = useRef<HTMLUListElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const scrollbarTrack = useRef<HTMLDivElement>(null);
  
    const [thumbWidth, setThumbWidth] = useState(0);
    const initTranslateX = useRef(0);
    const initClientX = useRef(0);
    const maxTranslateX = useRef(0);
    const mouseEnterThumb = useRef(false);
    const [translateX, setTranslateX] = useState(0);
    const [isGrabbing, setIsGrabbing] = useState(false);
  
    const computeWrapperHeight = () => {
      if (list.current) {
        setWrapperHeight(list.current.clientHeight);
      }
    };
  
    const coefficient = useRef(0);
  
    const computeThumbWidth = () => {
      if (list.current && wrapper.current && scrollbarTrack.current) {
        coefficient.current =
          scrollbarTrack.current.clientWidth / list.current.clientWidth;
        const width =
          scrollbarTrack.current.clientWidth *
          (wrapper.current.clientWidth / list.current.clientWidth);
        setThumbWidth(width);
      }
    };
  
    const computeMaxTranslateX = () => {
      if (scrollbarTrack.current)
        maxTranslateX.current = scrollbarTrack.current.clientWidth - thumbWidth;
    };
  
    useEffect(() => {
      computeMaxTranslateX();
    }, [thumbWidth]);
  
    const setThumbPosition = (clientX: number) => {
      const distance = clientX - initClientX.current;
      const posibleTranslateX = initTranslateX.current + distance;
      const currentTranslateX = computeCurrentTranslateX(posibleTranslateX);
      setTranslateX(currentTranslateX);
    };
  
    const computeCurrentTranslateX = (posibleTranslateX: number) => {
      return posibleTranslateX < 0
        ? 0
        : posibleTranslateX > maxTranslateX.current
        ? maxTranslateX.current
        : posibleTranslateX;
    };
  
    const setInitialScrollbarProperties = (clientX: number) => {
      initClientX.current = clientX;
  
      if (scrollbarTrack.current && !mouseEnterThumb.current) {
        const posibleTranslateX = clientX - scrollbarTrack.current.getBoundingClientRect().left - thumbWidth/2;
        const currentTranslateX = computeCurrentTranslateX(posibleTranslateX);
        setTranslateX(currentTranslateX);
        initTranslateX.current = currentTranslateX;
      } else {
        initTranslateX.current = translateX;
      }
    };
  
    const onMouseDown: React.MouseEventHandler = (e) => {
      setIsGrabbing(true);
      setInitialScrollbarProperties(e.clientX);
    };
  
    const onMouseUp = (e: MouseEvent) => {
      setIsGrabbing(false);
    };
  
    const onMouseMove = (e: MouseEvent) => {
      setThumbPosition(e.clientX);
    };
  
    const onMouseEnterThumb: React.MouseEventHandler = () => {
      mouseEnterThumb.current = true;
    };
  
    const onMouseLeaveThumb: React.MouseEventHandler = () => {
      mouseEnterThumb.current = false;
    };
  
    const onTouchStart: React.TouchEventHandler = (e) => {
      setIsGrabbing(true);
      setInitialScrollbarProperties(e.touches[0].clientX);
    };
  
    const onTouchEnd = (e: TouchEvent) => {
      setIsGrabbing(false);
    };
  
    const onTouchMove = (e: TouchEvent) => {
      setThumbPosition(e.touches[0].clientX);
    };
  
    useEffect(() => {
      if (isGrabbing) {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onTouchEnd);
  
        return () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
          document.removeEventListener("touchmove", onTouchMove);
          document.removeEventListener("touchend", onTouchEnd);
        };
      }
    }, [isGrabbing]);
  
    const onScrollWrapper = (e: Event) => {
      if (isGrabbing) {
        return;
      }
      const scrollLeft = (e.target as HTMLElement).scrollLeft;
      const currentTranslateX = scrollLeft * coefficient.current;
  
      setTranslateX(currentTranslateX);
    };
  
    useEffect(() => {
      computeWrapperHeight();
      computeThumbWidth();
      window.addEventListener("resize", () => {
        computeWrapperHeight();
        computeThumbWidth();
      });
  
      wrapper.current &&
        wrapper.current.addEventListener("scroll", onScrollWrapper);
      return () => {
        window.removeEventListener("resize", () => {
          computeWrapperHeight();
          computeThumbWidth();
        });
        wrapper.current &&
          wrapper.current.removeEventListener("scroll", onScrollWrapper);
      };
    }, []);
  
    useEffect(() => {
      const scrollX = translateX / coefficient.current;
      wrapper.current?.scrollTo({ left: scrollX, behavior: "instant" });
    }, [translateX]);
  return (
    <div className={styles.body}>
        <div className={clsx(styles.container)}>
          <div
            ref={wrapper}
            className={styles.wrapper}
            style={{ height: wrapperHeight }}
          >
            <ul ref={list} className={clsx(styles.list, props.listClassNames, "select-none")}>
              {props.children}
            </ul>
          </div>
        </div>
        <div className={clsx(styles.scrollbar, props.scrollbarClassNames)}>
          <div className={styles.scrollbar__wrapper}>
            <div
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              ref={scrollbarTrack}
              className={styles.track}
            >
              <div
                onMouseEnter={onMouseEnterThumb}
                onMouseLeave={onMouseLeaveThumb}
                style={
                  {
                    width: thumbWidth,
                    transform: `translateX(${translateX}px)`,
                  } as React.CSSProperties
                }
                className={styles.thumb}
              ></div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default HorizontalCarusel