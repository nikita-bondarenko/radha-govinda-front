"use client"

import { Menu, MenuItem } from "@/components/ui/nav/Nav";
import React from "react";
import Picture, { Image } from "@/components/utils/Picture";
import Header from "@/components/header/Header";
import HeaderLectureBar from "@/components/header/HeaderLectureBar";
import HeaderLogo from "@/components/header/HeaderLogo";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import styles from "./HeroWithText.module.css";
import { usePathname, useRouter } from "next/navigation";
type Props = {
  menu?: Menu;
  section: {
    __typename?: "ComponentHeaderWithTextPervyjBlokSTekstom";
    Title?: string | null;
    Subtitle?: string | null;
    IsLanguageButtonVisible?: boolean | null;
    IsBigButtonVisible?: boolean | null;
    BigButton?: {
      __typename?: "ComponentBigButtonBolshayaKnopka";
      ButtonText?: string | null;
      page?: {
        __typename?: "Page";
        Slug: string;
      } | null;
    } | null;
  };
  logo?: Image;
  locale?: string | null;
  pageSlug: string;
};

const HeroWithText = ({ menu, section, logo, locale, pageSlug }: Props) => {
  const pathname = usePathname();

  return (
    <section className={styles["hero-with-text"]}>
      <div className={styles["hero-with-text__gradient"]}></div>

      <div className={clsx("container", styles.container)}>
        <Header
          {...section}
          logo={<HeaderLogo {...logo} locale={locale} />}
          menu={menu}
          pageSlug={pageSlug}
          locale={locale}
          dark={true}
        ></Header>

        <div className={styles["hero-with-text__body"]}>
          <div className={styles["hero-with-text__content"]}>
            <h1
              className={clsx(styles["hero-with-text__title"], {
                "text-[374px] lg:text-[24.5vw] sm:text-[23vw]": pathname.includes("videos"),
                "text-[342px] lg:text-[22.3vw] sm:text-[21vw] ": pathname.includes("articles") || !pathname.includes("videos"),
              })}
            >
              {section.Title}
            </h1>

            <div className={styles["hero-with-text__subtitle"]}>
              <ReactMarkdown>{section.Subtitle}</ReactMarkdown>
            </div>
            {section.IsBigButtonVisible && (
              <HeaderLectureBar
                button={section.BigButton}
                className={clsx(styles["hero-with-text__big-button"])}
              ></HeaderLectureBar>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroWithText;
