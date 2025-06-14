import React from "react";
import FooterForm, { SupportForm } from "./FooterForm";
import Nav, { Menu } from "@/components/ui/nav/Nav";
import { Enum_Componentinputpolevvoda_Inputtype } from "@/gql/generated/graphql";
import { SocialMediaList } from "./SocialMedia";
import DocumentElement from "./FooterDocument";
export type FooterDocument = {
  __typename?: "ComponentDocsLinkSsylkaNaDokument";
  Text?: string | null;
  id: string;
  Page?: {
    __typename?: "Page";
    Slug: string;
  } | null;
} | null;

type FooterProps = {
  menu: Menu;
  footer:
    | {
        __typename?: "Footer";
        SIteName?: string | null;
        Documents?: Array<FooterDocument> | null;
        SocialMedia?: SocialMediaList;
        SupportForm?: SupportForm;
      }
    | null
    | undefined;
};

export default function Footer({ menu, footer }: FooterProps) {
  return (
    <footer>
      <div className="container">
        <div>
          <FooterForm form={footer?.SupportForm}></FooterForm>
          <Nav menu={menu} footer />
        </div>
        <div>
          <span>{footer?.SIteName}</span>

          <div>
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
