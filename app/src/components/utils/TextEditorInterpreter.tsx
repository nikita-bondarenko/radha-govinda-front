import React, { memo, ReactNode } from "react";

export type TextEditorInterpreterProps = {
  children: ReactNode;
};

export default memo(function TextEditorInterpreter({
  children,
}: TextEditorInterpreterProps) {
   // console.log(children)
  return <span dangerouslySetInnerHTML={{__html: children || ''}}></span>;
});
