import React from "react";
import { SvgIconProps } from "./BurgerIcon";

interface ExtendedSvgIconProps extends SvgIconProps {
  isCrossed: boolean;
}

export default function AnimatedArrows(props: ExtendedSvgIconProps) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <style>
        {`
          .line1 {
            stroke-dasharray: 8;
            stroke-dashoffset: ${props.isCrossed ? 0 : 8};
            animation: slideLine1 1.5s ease-in-out infinite ${props.isCrossed ? 'forwards' : 'reverse'};
          }
          .line2 {
            stroke-dasharray: 12;
            stroke-dashoffset: ${props.isCrossed ? 0 : 12};
            animation: slideLine2 1.5s ease-in-out infinite ${props.isCrossed ? 'forwards' : 'reverse'};
          }
          .arrow1 {
            animation: moveArrow1 1.5s ease-in-out infinite ${props.isCrossed ? 'forwards' : 'reverse'};
          }
          .arrow2 {
            animation: moveArrow2 1.5s ease-in-out infinite ${props.isCrossed ? 'forwards' : 'reverse'};
          }
          @keyframes slideLine1 {
            0% { stroke-dashoffset: 8; }
            50% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes slideLine2 {
            0% { stroke-dashoffset: 12; }
            50% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes moveArrow1 {
            0% { transform: translate(0, 2px); }
            50% { transform: translate(3px, -2px); }
            100% { transform: translate(3px, -2px); }
          }
          @keyframes moveArrow2 {
            0% { transform: translate(-3px, -2px); }
            50% { transform: translate(0, 2px); }
            100% { transform: translate(0, 2px); }
          }
        `}
      </style>
      {/* Верхняя изогнутая стрелка */}
      <path
        d="M10.1308 11.3182C9.17089 11.3182 8.27222 10.9253 7.60547 10.2584"
        stroke={props.fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="line1"
      />
      {/* Нижняя изогнутая стрелка */}
      <path
        d="M4.74705 4.98755C3.91558 4.16545 2.80021 3.68176 1.60938 3.68176"
        stroke={props.fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="line2"
      />
      {/* Прямая линия (без анимации) */}
      <path
        d="M10.1311 3.68175C8.66093 3.68175 7.33921 4.57781 6.7949 5.94352L5.77964 8.4909C5.09926 10.198 3.44711 11.3181 1.60938 11.3181"
        stroke={props.fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Треугольник для верхней стрелки */}
      <path
        d="M13.7192 12.28C14.3232 11.8853 14.3233 11.0003 13.7192 10.6057L11.6779 9.27182C11.0127 8.83722 10.1309 9.31443 10.1309 10.109V12.7767C10.1309 12.5712 11.0127 13.0484 11.6779 12.6138L13.7192 12.28Z"
        fill={props.fill}
        className="arrow1"
      />
      {/* Треугольник для нижней стрелки */}
      <path
        d="M13.1099 4.6436C13.7139 4.24893 13.7139 3.36399 13.1099 2.96932L11.0685 1.63546C10.4034 1.20087 9.52148 1.67808 9.52148 2.4726V5.14032C9.52148 5.93484 10.4034 6.41206 11.0685 5.97746L13.1099 4.6436Z"
        fill={props.fill}
        className="arrow2"
      />
    </svg>
  );
}