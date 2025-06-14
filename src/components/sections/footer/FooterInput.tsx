import React, { useCallback } from "react";
import { Input } from "./FooterForm";
import { Enum_Componentinputpolevvoda_Inputtype } from "@/gql/generated/graphql";

type Props = {
  input: Input;
};

const inputTypeReferrences: {
  [key in Enum_Componentinputpolevvoda_Inputtype]: "text" | "email" | "number";
} = {
  Email: "email",
  Summa: "number",
};

const getInputType = (
  type: Enum_Componentinputpolevvoda_Inputtype | null | undefined
) => {
  return type ? inputTypeReferrences[type] : "text";
};

export default function FooterInput({ input }: Props) {
  return (
    <div>
      <input
        name={getInputType(input?.InputType)}
        type={getInputType(input?.InputType)}
        placeholder={input?.Placeholder || ""}
      />
    </div>
  );
}
