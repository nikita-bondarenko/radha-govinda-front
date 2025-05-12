import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./ButtonMain.module.css";
import clsx from "clsx";
export type ButtonProps = {
  href?: string;
  className?: string;
  children: ReactNode;
};
export default function ButtonMain({ href, children, className }: ButtonProps) {
  return (
    <Link className={clsx(className, styles.button)} href={href || ""}>
      {children}
    </Link>
  );
}
