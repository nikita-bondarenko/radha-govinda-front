import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./ButtonMain.module.css";
import clsx from "clsx";
export type ButtonProps = {
  href?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};
export default function ButtonMain({
  href,
  children,
  className,
  onClick,
}: ButtonProps) {
  return href ? (
    <Link
      onClick={onClick}
      className={clsx(className, styles.button)}
      href={href || ""}
    >
      {children}
    </Link>
  ) : (
    <button className={clsx(className, styles.button)} onClick={onClick}>
      {children}
    </button>
  );
}
