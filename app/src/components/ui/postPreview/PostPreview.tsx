"use client"
import { Post } from "@/components/sections/blog-preview/BlogPreview";
import React from "react";
import ButtonMain from "../button/button-main/ButtonMain";
import styles from "./PostPreview.module.css";
import { localizeHref } from "@/utils/localizeHref";
import { parseDate } from "@/utils/parseDate";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import useLocalizedHref from "@/hooks/useLocalizedHref";
import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";
export type PostPreviewProps = {
  post: Post;
  className?: string;
};

export default function PostPreview({ post, className }: PostPreviewProps) {

  const href = useLocalizedHref({postType: "post", pageSlug: post?.Slug})
  const localizedData = useLocalizedStaticData()
  return (
     <div className={clsx(className, styles.body, "px-[20px] py-[40px] rounded-[10px] overflow-hidden flex flex-col justify-between gap-[20px] sm:gap-[10px] sm:p-0")}>
        <div className={styles.content}>
          <div className={styles.content__top}>
            <h3 className={styles.title}>{post?.PostTitle}</h3>
            <span className={clsx("small-text grey")}>{parseDate(post?.Date)}</span>
          </div>
          <div className={clsx(styles.text, "markdown")}><ReactMarkdown>{post?.PostPreviewContent}</ReactMarkdown></div>
        </div>
        <ButtonMain
          className={styles.button}
          href={href}
        >
          {localizedData?.postPreview.detailsButton}
        </ButtonMain>
      </div>
  );
}
