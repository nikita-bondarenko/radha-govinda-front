import { Pagination } from "@/components/RenderPage";
import { Locale } from "./getLocalizedData";

export type PostType = "page" | "post" | "doc";

export const parseParams = async (params: Promise<{ slug: string[] }>) => {
  const slugArray = (await params).slug;
   // console.log('parseParams: slugArray =', slugArray);
  
  const locale: Locale = !slugArray
  ? "ru"
  : slugArray[0] === "en"
  ? "en"
  : "ru";
  
   // console.log('parseParams: determined locale =', locale);
  
  const isEnglish = locale === "en";

  const postType: PostType = !slugArray
    ? "page"
    : (!isEnglish && slugArray[0] === "articles" && slugArray.length === 2) ||
      (isEnglish && slugArray[1] === "articles" && slugArray.length === 3)
    ? "post" : (!isEnglish && slugArray[0] === "documents") ||
    (isEnglish && slugArray[1] === "documents")
  ? "doc"
    : "page";

  const isPost = postType === "post";
  const isDoc = postType === "doc";

  const slug = (!slugArray || slugArray.length === 1 && isEnglish)
    ? "home"
    : isPost && isEnglish || isDoc && isEnglish
    ? slugArray[2]
    : isPost || isEnglish || isDoc
    ? slugArray[1]
    : slugArray[0];

  const emptyPagination = {
    start: 0,
    limit: 0,
  };

  let postsPagination: Pagination = emptyPagination;
  let moviesPagination: Pagination = emptyPagination;
  let audiosPagination: Pagination = emptyPagination;

  if (slug === "home") {
    postsPagination = {
      start: 0,
      limit: 3,
    };
    moviesPagination = {
      start: 0,
      limit: 10,
    };
    audiosPagination = {
      start: 0,
      limit: 6,
    };
  } else if (slug === "articles") {
    postsPagination = {
      start: 0,
      limit: 6,
    };
  } else if (slug === "videos") {
    moviesPagination = {
      start: 0,
      limit: 9999,
    };
  } else if (slug === "lectures-and-kirtans") {
    audiosPagination = {
      start: 0,
      limit: 9999,
    };
  }

  return {
    slug,
    postType,
    locale,
    postsPagination,
    moviesPagination,
    audiosPagination,
  };
};
