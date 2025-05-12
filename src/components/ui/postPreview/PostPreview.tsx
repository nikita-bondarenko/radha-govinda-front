import { Post } from "@/components/sections/blog-preview/BlogPreview";
import React from "react";
import ButtonMain from "../button/button-main/ButtonMain";
import styles from "./PostPreview.module.css";
import { localizeHref } from "@/utils/localizeHref";
import { parseDate } from "@/utils/parseDate";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
export type PostPreviewProps = {
  post: Post;
};

export default function PostPreview({ post }: PostPreviewProps) {
  return (
    <li>
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.content__top}>
            <h3 className={styles.title}>{post?.PostTitle}</h3>
            <span className={clsx("small-text grey")}>{parseDate(post?.Date)}</span>
          </div>
          <div className={clsx(styles.text, "markdown")}><ReactMarkdown>{post?.PostPreviewContent}</ReactMarkdown></div>
        </div>
        <ButtonMain
          className={styles.button}
          href={localizeHref({
            pageLocale: post?.locale,
            pageSlug: `blog/${post?.Slug}`,
          })}
        >
          {post?.locale === "ru" ? "читать дальше" : "read more"}
        </ButtonMain>
      </div>
    </li>
  );
}
