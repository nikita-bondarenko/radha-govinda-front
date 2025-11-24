import { SvgIconProps } from "./BurgerIcon";

export const AudioShare = ({ className, fill }: SvgIconProps) => {
  return (
    <svg
      width="28"
      height="28"
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.0031 5V14M14.0031 5L18 8.50044M14.0031 5L10 8.50044M18 11.4727H19C20.1046 11.4727 21 12.3681 21 13.4727V20.4727C21 21.5773 20.1046 22.4727 19 22.4727H9C7.89543 22.4727 7 21.5773 7 20.4727V13.4727C7 12.3681 7.89543 11.4727 9 11.4727H10"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
