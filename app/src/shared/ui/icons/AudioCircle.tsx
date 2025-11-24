import { SvgIconProps } from "./BurgerIcon";

export const AudioCircle = ({ className, fill }: SvgIconProps) => {
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
          d="M21.6432 6.04388C22.2699 5.65222 22.2699 4.73956 21.6432 4.34789L16.53 1.15214C15.864 0.735855 15 1.2147 15 2.00013V8.39164C15 9.17707 15.864 9.65592 16.53 9.23964L21.6432 6.04388Z"
          fill={fill}
        />
        <path
          d="M2.47008 19.0439C1.84341 18.6522 1.84341 17.7396 2.47008 17.3479L7.58328 14.1521C8.24933 13.7359 9.11328 14.2147 9.11328 15.0001V21.3916C9.11328 22.1771 8.24933 22.6559 7.58328 22.2396L2.47008 19.0439Z"
          fill={fill}
        />
        <path
          d="M4 11C4 7.68629 6.68629 5 10 5H15"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 12C19 15.3137 16.3137 18 13 18H8"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
