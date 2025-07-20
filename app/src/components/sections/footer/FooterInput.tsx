import React, { useCallback } from "react";
import { Input } from "./FooterForm";
import { Enum_Componentinputpolevvoda_Inputtype } from "@/gql/generated/graphql";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

type Props = {
  input: Input;
};

const inputTypeReferrences: {
  [key in Enum_Componentinputpolevvoda_Inputtype]: "amount" | "mail" ;
} = {
  Email: "mail",
  Summa: "amount",
};

const getInputType = (
  type: Enum_Componentinputpolevvoda_Inputtype | null | undefined
) => {
  return type ? inputTypeReferrences[type] : "text";
};

export default function FooterInput({ input }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const type = getInputType(input?.InputType);

  const error = errors[type]?.message as string;
  return (
    <div className="pb-[15px] md:pb-[11px] w-full relative">
      <input
        className={clsx(
          "bg-transparent py-[10px] text-[16px]  leading-[110%] tracking-[0.32px]  placeholder:text-white placeholder:opacity-30 border-b-[1px] border-white border-opacity-50   md:text-[14px] pt-[5px] w-full", {
            "[&]:border-red-500": error
          }
        )}
        type={"text"}
        {...register(type)}
        placeholder={input?.Placeholder || ""}
      />
      <p
        className={clsx(
          "absolute bottom-0 right-0 text-red-600 text-[14px] leading-[15px] md:leading-[10px] md:text-[12px]",
          {
            "opacity-0": !error,
          }
        )}
      >
        {error}
      </p>
    </div>
  );
}
