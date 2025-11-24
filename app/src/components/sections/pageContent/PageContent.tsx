"use client";
import SiteName from "@/components/header/SiteName";
import ArrowLeft from "@/shared/ui/icons/ArrowLeft";
import { parseDate } from "@/utils/parseDate";
import typograph from "@/utils/typograph";
import { useRouter } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  content: string | undefined | null;
  title: string | undefined | null;
  date?: string | null;
};

const PageContent = (props: Props) => {
  const router = useRouter();
  return (
    <section className="container relative mt-[-60px] sm:-[-55px] grow">
      <div className="absolute left-[30px] top-[15px] lgm:relative lgm:top-auto lgm:left-auto lgm:mb-[14px] sm:mb-[16px]">
        <button
          className="sm:mb-[13px] w-[71px] h-[71px] md:w-[26px] md:h-[26px] sm:w-[20px] sm:h-[20px]"
          onClick={() => router.back()}
        >
          <ArrowLeft className=""></ArrowLeft>
        </button>
        <SiteName className="hidden sm:block"></SiteName>
      </div>
      <div className="max-w-[1165px]  mx-auto md:max-w-[800px]">
        <h1 className="relative text-[40px] font-bold tracking-[0.8px] uppercase mb-[40px]  md:text-[24px] md:tracking-[0.48px] md:mb-[50px]  sm:text-[16px] sm:tracking-[0.32px] sm:mt-[18px]">
          <span className="absolute block top-[10px] left-0 text-[18px] md:top-[5px] md:text-[14px] opacity-50 sm:relative sm:top-auto sm:left-auto sm:mb-[5px]">{parseDate(props.date)}</span>
          <span className="w-[183px] inline-block md:w-[150px] sm:hidden"></span>
          {typograph(props.title)}
        </h1>
        <div className=" page-content-markdown">
          <ReactMarkdown>{typograph(props.content)}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
};

export default PageContent;
