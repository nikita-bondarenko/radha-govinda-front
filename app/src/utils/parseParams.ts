import { Pagination } from "@/components/RenderPage";
import { Locale } from "./getLocalizedData";

export type PostType = "page" | "post" | "doc";

export const parseParams = async (params: Promise<{ slug: string[], id: string }>) => {
  const slugArray = (await params).slug;
    const id = (await params).id;

   // console.log('parseParams: slugArray =', slugArray);
  const locale: Locale = !slugArray
  ? "ru"
  : slugArray[0] === "en"
  ? "en"
  : "ru";
  
   // console.log('parseParams: determined locale =', locale);
  
  const isEnglish = locale === "en";

  const postType: PostType = !slugArray
    ? ("page" )
    : (!isEnglish && slugArray[0] === "articles" && slugArray.length === 2) ||
      (isEnglish && slugArray[1] === "articles" && slugArray.length === 3)
    ? "post" : (!isEnglish && slugArray[0] === "documents") ||
    (isEnglish && slugArray[1] === "documents")
  ? "doc"
    : "page";

  const isPost = postType === "post";
  const isDoc = postType === "doc";

  const slug = (!slugArray || slugArray.length === 1 && isEnglish)
    ? (id ? "playlist" : "home")
    : isPost && isEnglish || isDoc && isEnglish
    ? slugArray[2]
    : isPost || isEnglish || isDoc
    ? slugArray[1]
    : slugArray[0];


  const postsPagination: Pagination = {
    start: 0,
    limit: 3,
  };
  const moviesPagination: Pagination = {
    start: 0,
    limit: 10,
  };
  const audiosPagination: Pagination = {
    start: 0,
    limit: 6,
  };

 if (slug === "articles") {
  postsPagination.limit = 6

  } 
  
  if (slug === "videos") {
    moviesPagination.limit = 9999
  } 
  
  if (slug === "lectures-and-kirtans" ) {
    audiosPagination.limit = 9999
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
