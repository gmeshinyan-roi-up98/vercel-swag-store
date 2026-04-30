import type { TIconProps } from "./types";

const paginationNavSvgProps = (props: TIconProps) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  ...props,
});

export const PreviousNavIcon = (props: TIconProps) => (
  <svg {...paginationNavSvgProps(props)}>
    <path d="M12.5 4.16699L6.66667 10.0003L12.5 15.8337" />
  </svg>
);

export const NextNavIcon = (props: TIconProps) => (
  <svg {...paginationNavSvgProps(props)}>
    <path d="M7.5 4.16699L13.3333 10.0003L7.5 15.8337" />
  </svg>
);
