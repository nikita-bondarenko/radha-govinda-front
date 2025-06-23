import { Pagination } from "@/components/RenderPage";
import { Locale } from "./getLocalizedData";

export type PostType ="page" | "post"

export const parseParams = async (params: Promise<{ slug: string[] }>) => {
  const slugArray = (await params).slug ;
  const postType: PostType = !slugArray ? 'page' : slugArray[0] === 'articles' || slugArray[1] === 'articles' ? 'post' : 'page';
  const locale: Locale = !slugArray ? 'ru' : slugArray[0] === 'en' ? 'en' : 'ru';
  const isEnglish = locale === 'en';
  const isPost = postType === 'post';
  const slug = !slugArray ? 'home' : (isPost && isEnglish) ? slugArray[2] : (isPost || isEnglish) ? slugArray[1] : slugArray[0];

  const emptyPagination = {
    start: 0,
    limit: 0,
  }

  let postsPagination: Pagination = emptyPagination
  let moviesPagination: Pagination = emptyPagination
  let audiosPagination: Pagination = emptyPagination

  if (slug === 'home') {
     postsPagination = {
        start: 0,
        limit: 3,
      }
       moviesPagination = {
        start: 0,
        limit: 10,
      }
       audiosPagination = {
        start: 0,
        limit: 6,
      }
  } else if (slug === 'articles') {
    postsPagination = {
      start: 0,
      limit: 6,
    }
    
  } else if (slug === 'videos') {
    moviesPagination = {
      start: 0,
      limit: 9999,
    }
  } else if (slug === 'lectures-and-kirtans') {
    audiosPagination = {
      start: 0,
      limit: 9999,
    }
  }

 
  return { slug, postType, locale, postsPagination, moviesPagination, audiosPagination };
};
