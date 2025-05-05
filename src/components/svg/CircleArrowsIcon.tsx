import React from 'react'
import { SvgIconProps } from './Burger'
import clsx from 'clsx'

export default function CircleArrowsIcon({className, fill}: SvgIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={clsx(className, "image")} viewBox="0 0 25 25" fill="none">
<path d="M22.4298 6.44818C23.0565 6.05651 23.0565 5.14385 22.4298 4.75218L17.3166 1.55643C16.6506 1.14015 15.7866 1.619 15.7866 2.40443V8.79594C15.7866 9.58137 16.6506 10.0602 17.3166 9.64393L22.4298 6.44818Z" fill={fill}/>
<path d="M3.2567 19.4482C2.63003 19.0565 2.63003 18.1439 3.2567 17.7522L8.3699 14.5564C9.03595 14.1402 9.8999 14.619 9.8999 15.4044V21.7959C9.8999 22.5814 9.03595 23.0602 8.3699 22.6439L3.2567 19.4482Z" fill={fill}/>
<path className='no-fill' d="M4.78662 11.4043V11.4043C4.78662 8.09059 7.47291 5.4043 10.7866 5.4043V5.4043H15.7866" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path className='no-fill' d="M19.7866 12.4043V12.4043C19.7866 15.718 17.1003 18.4043 13.7866 18.4043V18.4043H8.78662" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  )
}
