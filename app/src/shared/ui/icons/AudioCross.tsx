import { SvgIconProps } from "./BurgerIcon";

export const AudioCross = ({ className, fill }: SvgIconProps) => {
  return (
    <svg
      className={className}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.53849 4.56282L16.5 16.5M4.5 16.5L16.4998 4.5"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
