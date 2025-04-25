import Link from 'next/link'
import React from 'react'
import styles from "./Header.module.css"
import clsx from 'clsx'

export type HeaderLangButtonProps = {
    pageSlug: string
    locale?: string | null;
    className?: string
}

export default function HeaderLangButton({pageSlug, locale, className}:HeaderLangButtonProps) {
  return (
    locale === "ru" ?
    <Link className={clsx(styles['header__lang-button'], className)} href={`/en/${pageSlug}`}>EN</Link> :
    <Link className={clsx(styles['header__lang-button'], className)} href={`/${pageSlug}`}>RU</Link>
  )
}
