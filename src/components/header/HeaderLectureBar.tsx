import clsx from 'clsx';
import Link from 'next/link';
import React, { memo } from 'react'
import style from "./Header.module.css"

export type HeaderButton = {
    __typename?: "ComponentBigButtonBolshayaKnopka";
    ButtonText?: string | null;
    page?: {
        __typename?: "Page";
        Slug: string;
    } | null;
} | null   

export type HeaderLectureBarProps = {
    button?: HeaderButton
    className?: string
}

export default memo(function HeaderLectureBar({button, className}:HeaderLectureBarProps) {
  return (
    <Link className={clsx(className, style.header__button)} href={`/${button?.page?.Slug}`}>{button?.ButtonText}</Link>
  )
})
