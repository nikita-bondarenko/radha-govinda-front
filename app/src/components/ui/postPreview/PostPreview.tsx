"use client";
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
import { useRouter } from "next/navigation";
export type PostPreviewProps = {
  post: Post;
  className?: string;
};

export default function PostPreview({ post, className }: PostPreviewProps) {
  const router = useRouter();

  const href = useLocalizedHref({ postType: "post", pageSlug: post?.Slug });
  const localizedData = useLocalizedStaticData();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        className,
        " group bg-gradient-to-b from-[#D6D2E8] to-[#E5E5E5]  transition-all rounded-[10px] overflow-hidden flex flex-col cursor-pointer relative z-0"
      )}
    >
      <div className=" bg-[#7A66D5] absolute top-0 left-0 w-full h-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="grow px-[20px] py-[40px] flex flex-col justify-between gap-[20px] sm:gap-[10px] sm:p-0 z-20">
        <div className={clsx(styles.content)}>
          <div className={clsx(styles.content__top)}>
            <h3 className={clsx(styles.title, 'group-hover:text-white transition-all  duration-700')}>{post?.PostTitle}</h3>
            <span className={clsx("small-text grey transition-all  duration-700 group-hover:text-white group-hover:opacity-50")}>
              {parseDate(post?.Date)}
            </span>
          </div>
          <div className={clsx(styles.text, "markdown group-hover:[&_*]:text-white ")}>
            <ReactMarkdown>{post?.PostPreviewContent}</ReactMarkdown>
          </div>
        </div>
        <ButtonMain className={clsx(styles.button, "group-hover:bg-[#FFFFFF] group-hover:text-[#7A66D5]")}>
          {localizedData?.postPreview.detailsButton}
        </ButtonMain>
      </div>
    </div>
  );
}
