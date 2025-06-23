import clsx from 'clsx'
import React from 'react'

type Props = {
    children: React.ReactNode
    isSelected: boolean
    onClick: () => void
}

const SelectOption = ({children, isSelected, onClick}: Props) => {
  return (
    <button
          className={clsx("text-[18px] md:text-[14px] leading-[100%] whitespace-nowrap pb-4", {
            "text-[#6351B5]":isSelected,
            "text-[#818181]":!isSelected
          })}
            onClick={onClick}
          >
            {children}
          </button>
  )
}

export default SelectOption