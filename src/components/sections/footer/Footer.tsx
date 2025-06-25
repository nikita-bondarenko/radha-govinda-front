"use client";

import React from "react";
import FooterForm, { SupportForm } from "./FooterForm";
import Nav, { Menu } from "@/components/ui/nav/Nav";
import { Enum_Componentinputpolevvoda_Inputtype } from "@/gql/generated/graphql";
import SocialMediaLink, { SocialMediaList } from "./SocialMediaLink";
import DocumentElement from "./FooterDocument";
import clsx from "clsx";
export type FooterDocument = {
  __typename?: "ComponentDocsLinkSsylkaNaDokument";
  Text?: string | null;
  id: string;
  Page?: {
    __typename?: string;
    Slug: string;
  } | null;
} | null;

type FooterProps = {
  menu: Menu;
  footer:
    | {
        __typename?: "Footer";
        SiteName?: string | null;
        Documents?: Array<FooterDocument> | null;
        SocialMedia?: SocialMediaList;
        SupportForm?: SupportForm;
      }
    | null
    | undefined;
};

export default function Footer({ menu, footer }: FooterProps) {
  return (
    <footer className="bg-purple-main rounded-t-[20px] py-[40px]  md:py-[20px] md:rounded-t-[10px]">
      <div className="container">
        <div className="grid grid-cols-2 gap-[20px] md:grid-cols-1 md:gap-[31px] sm:gap-[25px]">
          <FooterForm form={footer?.SupportForm}></FooterForm>
          <div className="md:flex md:justify-between md:items-start sm:block">
            <Nav menu={menu} footer />
            <div className="flex items-center justify-end gap-[14px] mt-[106px] md:mt-0 sm:mt-[45px] sm:justify-start">
              {footer?.SocialMedia?.map((socialLink, index) => (
                <SocialMediaLink
                  className={clsx("w-[30px] h-[30px]", {'[&]:w-[32px]':index === 2, '[&]:w-[28px]':index === 0})}
                  key={socialLink?.id}
                  data={socialLink}
                ></SocialMediaLink>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-[134px] md:mt-[10px] md:items-end sm:mt-[71px] sm:flex-col sm:gap-[20px] sm:items-start">
          <span className="text-[20px] text-white font-semibold opacity-50 leading-[100%] md:text-[12px] md:font-normal">{footer?.SiteName}</span>

          <div className="flex gap-[47px] text-[16px] leading-[110%] tracking-[0.32px] text-white opacity-50 font-normal md:flex-col md:gap-[2px] md:items-end md:text-[14px] sm:items-start">
            {footer?.Documents?.map((document) => (
              <DocumentElement
                document={document}
                key={document?.id}
              ></DocumentElement>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
