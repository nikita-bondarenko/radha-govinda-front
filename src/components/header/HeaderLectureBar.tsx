import Link from 'next/link';
import React, { memo } from 'react'

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
}

export default memo(function HeaderLectureBar({button}:HeaderLectureBarProps) {
  return (
    <Link className='header__button' href={`/${button?.page?.Slug}`}>{button?.ButtonText}</Link>
  )
})
