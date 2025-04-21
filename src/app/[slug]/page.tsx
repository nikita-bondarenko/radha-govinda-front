import { initializeApollo } from "@/lib/apollo/client";
import { PagesConnectionsQuery, PagesConnectionsDocument, PageSeoDocument, PageSeoQuery, PageSeoQueryVariables, PageDocument, PageQuery, PageQueryVariables } from "@/gql/generated/graphql";
import getDynamicMetadata from "@/utils/getDynamicMetadata";
import { notFound } from "next/navigation";

export type MetadataPropsType = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};



export async function generateMetadata({ params }: MetadataPropsType) {
    const apolloClient = initializeApollo();
    const slug = (await params).slug;
    const { data } = await apolloClient.query<PagesConnectionsQuery>({
        query: PagesConnectionsDocument,
    });

    const documentId = data.pages_connection?.nodes.find((caseInfo) => caseInfo.Slug === slug)?.documentId;
    if (!documentId) {
        notFound();

    } else {
        const { data } = await apolloClient.query<PageSeoQuery, PageSeoQueryVariables>({
            query: PageSeoDocument,
            variables: {
                documentId,
            },
        });
        return getDynamicMetadata({
            title: data.page?.SEO?.Title,
            description: data.page?.SEO?.Description,
            bigImageUrl: data.page?.SEO?.Preview1200x630?.url,
            smallImageUrl: data.page?.SEO?.Preview510x230?.url,
            favicon: data?.logo?.logo?.url
        });
    }
}

export default async function Page({ params }: MetadataPropsType) {
    const apolloClient = initializeApollo();
    const slug = (await params).slug;
    const { data } = await apolloClient.query<PagesConnectionsQuery>({
        query: PagesConnectionsDocument,
    });
    const documentId = data.pages_connection?.nodes.find((pageInfo) => pageInfo.Slug === slug)?.documentId;
    if (!documentId) {
        notFound();

    } else {
        const { data: pageData } = await apolloClient.query<PageQuery, PageQueryVariables>({
            query: PageDocument,
            variables: {
                documentId,
            },
        });
        return (
            <div>{pageData.page?.PageName}</div>
        )
    }
}