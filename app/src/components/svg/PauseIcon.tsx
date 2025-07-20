import React from 'react'
import { SvgIconProps } from './Burger'
import clsx from 'clsx'

export default function PauseIcon({fill, className}: SvgIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={clsx("image" ,className)} viewBox="0 0 25 25" fill="none">
  <rect x="4.80884" y="3.5" width="6" height="18" rx="2" fill={fill}/>
  <rect x="14.8088" y="3.5" width="6" height="18" rx="2" fill={fill}/>
</svg>
  )
}
