import { Enum_Componentinputpolevvoda_Inputtype } from "@/gql/generated/graphql";
import React from "react";
import FooterInput from "./FooterInput";
import Link from "next/link";

import { useLocalizedStaticData } from "@/hooks/useLocalizedStaticData";
import useLocalizedHref from "@/hooks/useLocalizedHref";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

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
          __typename?: string;
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
  const href = useLocalizedHref({ pageSlug, postType: "doc" });

  return (
    <p className="text-[12px] leading-[100%] max-w-[330px] mb-[20px]  sm:text-[10px] sm:max-w-[275px] sm:mb-[34px]">
      {fullText?.replace(linkedText || "", "")}
      <Link
        className="underline underline-offset-2 whitespace-nowrap"
        href={href}
      >
        {linkedText}
      </Link>
    </p>
  );
};

export type FooterFormProps = {
  form: SupportForm;
};

export default function FooterForm({ form }: FooterFormProps) {
  const localizedData = useLocalizedStaticData();

  const formSchema = z.object({
    mail: z.string().email(localizedData?.form.errors.email),
    amount: z.string().min(1, localizedData?.form.errors.amount),
  });

  const methods = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="relative after:absolute after:top-0 after:right-0 after:w-[1px] after:h-[155%] after:bg-white text-white md:after:hidden md:border-b-[1px] md:border-white"
      >
        <div className="max-w-[432px] w-[432px] md:pb-[25px] sm:w-full ">
          <h2 className="section-heading  mb-[20px] md:mb-[20px] sm:mb-[20px]">
            {form?.Title}
          </h2>
          <div className="flex flex-col mb-[15px] w-full">
            {form?.Inputs?.map((input) => (
              <FooterInput input={input} key={input?.id}></FooterInput>
            ))}
          </div>
          <FormDisclaimerText
            fullText={form?.TextWithDocument?.Text}
            linkedText={form?.TextWithDocument?.LinkText}
            pageSlug={form?.TextWithDocument?.LinkPage?.Slug}
          ></FormDisclaimerText>
          <button
            className="group rounded-full overflow-hidden  w-full text-[18px] font-semibold  uppercase tracking-[0.24px] h-[40px] sm:text-[12px] sm:h-[30px] relative"
            type="submit"
          >
            <div className={clsx("z-10 absolute top-0 left-0 w-full h-full bg-white opacity-50 group-hover:opacity-100 transition-opacity duration-500")}></div>
            <div className="z-20 relative text-white opacity-70 group-hover:text-[#B6A9F1] group-hover:opacity-100 transition-all duration-500">{localizedData?.footer.formButton}</div>
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
