"use client";
import Background from "@/components/utils/Background";
import { Image } from "@/components/utils/Picture";
import clsx from "clsx";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import styles from "./Biography.module.css";

export type Biography = {
  section: {
    __typename?: "ComponentHomePageBiografiya";
    SectionTitle?: string | null;
    BioigrafyPeriods?: Array<{
      __typename?: "ComponentHomePageBiografy";
      PeriodName?: string | null;
      PeriodDescription?: string | null;
      id: string;
    } | null> | null;
    Image?: Image;
  };
};

export default function Biography({ section }: Biography) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsGroup = useRef<HTMLDivElement>(null);
  const tabsWrapper = useRef<HTMLDivElement>(null);
  const tabsContent = useRef<(HTMLParagraphElement | null)[]>([]);
  const [displayHeight, setDisplayHeight] = useState(0);
  const tabClickHandler = (e: React.MouseEvent, index: number) => {
    setActiveTabIndex(index);
    if (tabsGroup.current && tabsWrapper.current) {
      const scrollX: number =
        tabsGroup.current?.scrollLeft +
        ((e.target as HTMLElement).getBoundingClientRect().left -
          tabsWrapper.current.getBoundingClientRect().left);
      tabsGroup.current.scrollTo({ left: scrollX, behavior: "smooth" });
    }
  };

  const setRefs: LegacyRef<HTMLParagraphElement | null> = (el) => {
    tabsContent.current?.push(el);
  };

  const computeDisplayHeight = () => {
    const maxContentHeight = tabsContent.current.reduce(
      (maxHeight, el) =>
        el?.clientHeight && el?.clientHeight > maxHeight
          ? el.clientHeight
          : maxHeight,
      0
    );
    setDisplayHeight(maxContentHeight);
  };

  useEffect(() => {
    computeDisplayHeight();
    window.addEventListener("resize", computeDisplayHeight);
    return () => {
      window.removeEventListener("resize", computeDisplayHeight);
    };
  }, []);

  return (
    <section className={clsx(styles.section)}>
      <div className={styles.gradient}></div>
      <Background
        className={clsx(styles.background)}
        imageUrl={section.Image?.url}
      ></Background>
      <div className={clsx("container")}>
        <h2 className={clsx(styles.title, "section-heading")}>
          {section.SectionTitle}
        </h2>
        <div ref={tabsWrapper} className={clsx(styles.body)}>
          <div ref={tabsGroup} className={clsx(styles.tabs)}>
              {section.BioigrafyPeriods?.map((period, index) => (
                <div className={styles.tabs__item} key={period?.id}>
                  <button
                    onClick={(e) => tabClickHandler(e, index)}
                    className={clsx(
                      styles.tabs__button,
                      activeTabIndex === index && styles.active
                    )}
                  >
                    {period?.PeriodName}
                  </button>
                </div>
              ))}
          </div>
          <div style={{ height: displayHeight }} className={styles.display}>
            {section.BioigrafyPeriods?.map((period, index) => (
              <p
                ref={setRefs}
                className={clsx(
                  styles.content,
                  activeTabIndex === index && styles.active
                )}
                key={period?.id}
              >
                {period?.PeriodDescription}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
