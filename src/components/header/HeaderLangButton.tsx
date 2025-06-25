'use client'
import Link from 'next/link'
import React from 'react'
import styles from "./Header.module.css"
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import path from 'path'

export type HeaderLangButtonProps = {
    pageSlug: string
    locale?: string | null;
    className?: string
}

export default function HeaderLangButton({pageSlug, locale, className}:HeaderLangButtonProps) {
const pathname = usePathname()
console.log(`${pathname.split('/').filter(word => word !== "en").join('/')}`)
  return (
    locale === "ru" ?
    <Link className={clsx(styles['header__lang-button'], className)} href={`/en${pathname}`}>EN</Link> :
    <Link className={clsx(styles['header__lang-button'], className)} href={`${pathname.split('/').filter(word => word !== "en").join('/') || '/'}`}>RU</Link>
  )
}
