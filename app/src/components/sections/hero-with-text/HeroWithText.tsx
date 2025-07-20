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

  const isRuVideosPage = pathname.includes("videos") && !pathname.includes('en')
const isRuArticlesPage = pathname.includes("articles") && !pathname.includes('en')
const isEnVideosPage = pathname.includes("videos") && pathname.includes('en')
const isEnArticlesPage = pathname.includes("articles") && pathname.includes('en')
const isAnotherPage = !isRuVideosPage &&  !isEnArticlesPage && !isRuArticlesPage && !isEnArticlesPage
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
          lectureBarClassName="md:hidden"
        ></Header>

        <div className={styles["hero-with-text__body"]}>
          <div className={styles["hero-with-text__content"]}>
            <h1
              className={clsx(styles["hero-with-text__title"], "ml-[-20px] md:ml-[-1vw]", {
                "text-[374px] lg:text-[24.5vw] sm:text-[23vw]": isRuVideosPage,
                "text-[342px] lg:text-[22.3vw] sm:text-[21vw] ": isRuArticlesPage,
                "text-[351px] [&]:ml-0 lg:text-[23vw] sm:text-[21vw]  ": isEnVideosPage,
                "text-[310px] [&]:ml-0 lg:text-[20.3vw] sm:text-[18.5vw]  ": isEnArticlesPage,
                "": isAnotherPage
              })}
            >
              {section.Title}
            </h1>

            <div className={styles["hero-with-text__subtitle"]}>
              <ReactMarkdown>{section.Subtitle}</ReactMarkdown>
            </div>
         
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroWithText;
