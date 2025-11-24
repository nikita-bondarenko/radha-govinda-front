import clsx from 'clsx'
import React from 'react'
import { SvgIconProps } from './BurgerIcon'

export default function DifferentDirectionArrows({className, fill}: SvgIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={clsx(className, "image")}  viewBox="0 0 25 25" fill="none">
<path d="M16.2134 18.4046C14.6363 18.4046 13.16 17.7872 12.0646 16.7393" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.36813 8.45625C6.00214 7.16438 4.16975 6.4043 2.21338 6.4043" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M22.8566 19.4482C23.4833 19.0565 23.4832 18.1439 22.8566 17.7522L17.7434 14.5564C17.0773 14.1402 16.2134 14.619 16.2134 15.4044V21.7959C16.2134 22.5814 17.0773 23.0602 17.7434 22.6439L22.8566 19.4482Z" fill={fill}/>
<path className='no-fill' d="M16.2134 6.4043V6.4043C13.7912 6.4043 11.6065 7.86072 10.6749 10.0966L9.13646 13.7889C7.97193 16.5838 5.24114 18.4043 2.21338 18.4043V18.4043" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M21.8566 7.44818C22.4833 7.05651 22.4832 6.14385 21.8566 5.75218L16.7434 2.55643C16.0773 2.14015 15.2134 2.619 15.2134 3.40443V9.79594C15.2134 10.5814 16.0773 11.0602 16.7434 10.6439L21.8566 7.44818Z" fill={fill}/>
</svg>
  )
}
