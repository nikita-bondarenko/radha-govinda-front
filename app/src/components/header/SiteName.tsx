"use client"
import { useLocalizedStaticData } from '@/hooks/useLocalizedStaticData'
import clsx from 'clsx'
import React from 'react'

type Props = {
    className?: string
}

const SiteName = (props: Props) => {

    const localizedData = useLocalizedStaticData()
  return (
    <p className={clsx('text-[#7A66D5] font-bounded text-[20px] text-stroke tracking-[1px] md:text-[18px]', props.className)}>{localizedData?.header.siteName}</p>
  )
}

export default SiteName