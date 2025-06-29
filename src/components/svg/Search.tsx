import React from "react";
import { SvgIconProps } from "./Burger";

type Props = SvgIconProps;

const Search = ({ fill = "#818181", className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7935 17.1429C7.24312 17.1429 4.36496 14.2647 4.36496 10.7143C4.36496 7.1639 7.24312 4.28573 10.7935 4.28573C14.3439 4.28573 17.2221 7.1639 17.2221 10.7143C17.2221 14.2647 14.3439 17.1429 10.7935 17.1429ZM3.50781 10.7143C3.50781 6.69051 6.76974 3.42859 10.7935 3.42859C14.8173 3.42859 18.0792 6.69051 18.0792 10.7143C18.0792 12.572 17.384 14.2673 16.2395 15.5542L20.5251 19.8398C20.6925 20.0072 20.6925 20.2786 20.5251 20.4459C20.3578 20.6133 20.0864 20.6133 19.9191 20.4459L15.6334 16.1603C14.3465 17.3048 12.6512 18 10.7935 18C6.76974 18 3.50781 14.7381 3.50781 10.7143Z"
        fill={fill}
        stroke={fill}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Search;
