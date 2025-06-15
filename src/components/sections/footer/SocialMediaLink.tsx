import Icon from "@/components/Icon";
import useLocalizedHref from "@/hooks/useLocalizedHref";
import { useLocaleSelector } from "@/lib/localeStore/hooks";
import Link from "next/link";
import React from "react";

export type SocialMediaLinkData = {
  __typename?: "ComponentSocialMediaSsylkaNaSoczset";
  Href?: string | null;
  Name?: string | null;
  id: string;
  Icon?: {
    __typename?: "UploadFile";
    url: string;
  } | null;
} | null;

export type SocialMediaList = Array<SocialMediaLinkData> | null | undefined;

type Props = {
  data: SocialMediaLinkData;
  className: string;
};

export default function SocialMediaLink({ data, className }: Props) {
  return (
    <Link href={data?.Href || ""}>
      <Icon src={data?.Icon?.url || ""} className={className}></Icon>
    </Link>
  );
}
