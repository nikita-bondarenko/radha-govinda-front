import { SvgIconProps } from "./BurgerIcon";

export const AudioShuffle = ({ className, fill }: SvgIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M15.9999 18.0003C14.4228 18.0003 12.9465 17.3829 11.8511 16.335"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.15475 8.05196C5.78876 6.76008 3.95637 6 2 6"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.4597 18.8555C23.1025 18.4663 23.1025 17.5338 22.4597 17.1446L17.5179 14.1525C16.8515 13.749 16 14.2288 16 15.0079V20.9922C16 21.7713 16.8515 22.2512 17.5179 21.8476L22.4597 18.8555Z"
          fill={fill}
        />
        <path
          d="M16 6C13.5778 6 11.3932 7.45643 10.4615 9.69231L8.92308 13.3846C7.75856 16.1795 5.02776 18 2 18"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.4597 6.85548C22.1025 6.46631 22.1025 5.53382 21.4597 5.14465L16.5179 2.15249C15.8515 1.74897 15 2.22882 15 3.00791V8.99222C15 9.77131 15.8515 10.2512 16.5179 9.84764L21.4597 6.85548Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};
