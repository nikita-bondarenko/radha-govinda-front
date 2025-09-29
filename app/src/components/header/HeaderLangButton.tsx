'use client'
import Link from 'next/link'
import React from 'react'
import styles from "./Header.module.css"
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import path from 'path'
import { langButtons } from '@/utils/langButtons'

export type HeaderLangButtonProps = {
    pageSlug: string
    locale?: string | null;
    className?: string
}

export default function HeaderLangButton({pageSlug, locale, className}:HeaderLangButtonProps) {
const pathname = usePathname()

const buttonData = langButtons.find(button => button.crossLocale === locale)

  return (
    (buttonData && <Link className={clsx(styles['header__lang-button'], className)} href={buttonData.getHref(pathname || '')}>{buttonData.label}</Link>)
  )
}
