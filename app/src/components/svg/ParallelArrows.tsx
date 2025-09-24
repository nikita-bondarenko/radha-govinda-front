import React from 'react'
import { SvgIconProps } from './BurgerIcon';

export default function ParallelArrows(props: SvgIconProps) {
 return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      {/* Верхняя стрелка: прямая линия */}
      <path
        d="M1.60938 4.68176H11.60938"
        stroke={props.fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Треугольник для верхней стрелки */}
      <path
        d="M13.1099 5.6436C13.7139 5.24893 13.7139 4.36399 13.1099 3.96932L11.0685 2.63546C10.4034 2.20087 9.52148 2.67808 9.52148 3.4726V6.14032C9.52148 6.93484 10.4034 7.41206 11.0685 6.97746L13.1099 5.6436Z"
        fill={props.fill}
      />
      {/* Нижняя стрелка: прямая линия, параллельная верхней */}
      <path
        d="M1.60938 10.3182H11.60938"
        stroke={props.fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Треугольник для нижней стрелки */}
      <path
        d="M13.7192 11.28C14.3232 10.8853 14.3233 10.0003 13.7192 9.6057L11.6779 8.27182C11.0127 7.83722 10.1309 8.31443 10.1309 9.109V11.7767C10.1309 12.5712 11.0127 13.0484 11.6779 12.6138L13.7192 11.28Z"
        fill={props.fill}
      />
    </svg>
  );
}
