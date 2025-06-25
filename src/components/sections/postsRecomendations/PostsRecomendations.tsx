"use client"
import HorizontalCarusel from "@/components/ui/horisontalCarusel/HorizontalCarusel";
import PostPreview from "@/components/ui/postPreview/PostPreview";
import React from "react";

type Props = {
  section:
    | {
        __typename?: "ComponentPostRecomendedPosts";
        SectionTitle?: string | null;
        Posts: Array<{
          __typename?: "Post";
          Date?: any | null;
          PostPreviewContent?: string | null;
          PostTitle: string;
          documentId: string;
          Slug: string;
        } | null>;
      }
    | null
    | undefined;
};

const PostsRecomendations = (props: Props) => {
  return (
    <section className="container">
      <h2 className="section-heading mb-[30px] md:mb-[20px]">
        {props.section?.SectionTitle}
      </h2>
      <HorizontalCarusel listClassNames="gap-[20px] md:gap-[10px]" scrollbarClassNames="sm:hidden">
        {props.section?.Posts.map((post) => (
          <PostPreview className="w-[704px] sm:w-[320px] flex-shrink-0" post={post}></PostPreview>
        ))}
      </HorizontalCarusel>
    </section>
  );
};

export default PostsRecomendations;
