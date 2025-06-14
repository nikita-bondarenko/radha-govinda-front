import { Enum_Componentinputpolevvoda_Inputtype } from "@/gql/generated/graphql";
import React from "react";
import FooterInput from "./FooterInput";
import Link from "next/link";
import { localizeHref } from "@/utils/localizeHref";
import { useLocaleSelector } from "@/lib/localeStore/hooks";
import { getLocalizedData } from "@/utils/getLocalizedData";
import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";

export type Input = {
  __typename?: "ComponentInputPoleVvoda";
  Placeholder?: string | null;
  InputType?: Enum_Componentinputpolevvoda_Inputtype | null;
  id: string;
} | null;

export type SupportForm =
  | {
      __typename?: "ComponentSupportPozhertvovaniya";
      id: string;
      Title?: string | null;
      TextWithDocument?: {
        __typename?: "ComponentTextWithDocumentTekstSPrikreplennymDokumentom";
        Text?: string | null;
        LinkText?: string | null;
        LinkPage?: {
          __typename?: "Page";
          Slug: string;
        } | null;
      } | null;
      Inputs?: Array<Input> | null;
    }
  | null
  | undefined;

const FormDisclaimerText = ({
  fullText,
  linkedText,
  pageSlug,
}: {
  fullText: string | null | undefined;
  linkedText: string | null | undefined;
  pageSlug: string | null | undefined;
}) => {
  const pageLocale = useLocaleSelector((state) => state.locale);

  return (
    <span>
      {fullText?.replace(linkedText || "", "")}
      <Link href={localizeHref({ pageLocale, pageSlug })}>{linkedText}</Link>
    </span>
  );
};

export type FooterFormProps = {
  form: SupportForm;
};

export default function FooterForm({ form }: FooterFormProps) {
    const localizedData = useLocalizedStaticData()
  return (
    <form>
      <h2>{form?.Title}</h2>
      <div>
        {form?.Inputs?.map((input) => (
          <FooterInput input={input} key={input?.id}></FooterInput>
        ))}
      </div>
      <FormDisclaimerText
        fullText={form?.TextWithDocument?.Text}
        linkedText={form?.TextWithDocument?.LinkText}
        pageSlug={form?.TextWithDocument?.LinkPage?.Slug}
      ></FormDisclaimerText>
      <button type="submit">{localizedData?.footer.formButton}</button>
    </form>
  );
}
