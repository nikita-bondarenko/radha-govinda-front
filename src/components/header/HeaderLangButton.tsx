import Link from 'next/link'
import React from 'react'

export type HeaderLangButtonProps = {
    pageSlug: string
    locale?: string | null
}

export default function HeaderLangButton({pageSlug, locale}:HeaderLangButtonProps) {
  return (
    locale === "ru" ?
    <Link className='header__lang-button' href={`/en/${pageSlug}`}>EN</Link> :
    <Link className='header__lang-button' href={`/${pageSlug}`}>RU</Link>
  )
}
