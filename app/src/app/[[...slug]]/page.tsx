

import { getPageMetadata } from "@/utils/pageMetadata";
import RenderPage from "@/components/RenderPage";

export type MetadataPropsType = {
  params: Promise<{ slug: string[], id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = getPageMetadata

export default async function Page(props: MetadataPropsType) {
    return  <RenderPage {...props} />
}
