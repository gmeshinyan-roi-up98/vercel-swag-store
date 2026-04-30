import { iconBaseProps } from "./base";
import type { TIconProps } from "./types";

export const VercelMark = (props: TIconProps) => (
  <svg
    {...iconBaseProps({ ...props, viewBox: "0 0 76 65", strokeWidth: 0 })}
    fill="currentColor"
  >
    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
  </svg>
);

export const SearchIcon = (props: TIconProps) => (
  <svg {...iconBaseProps(props)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const CartIcon = (props: TIconProps) => (
  <svg {...iconBaseProps(props)}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

export const CloseIcon = (props: TIconProps) => (
  <svg {...iconBaseProps(props)}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const PlusIcon = (props: TIconProps) => (
  <svg {...iconBaseProps(props)}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export const MinusIcon = (props: TIconProps) => (
  <svg {...iconBaseProps(props)}>
    <path d="M5 12h14" />
  </svg>
);

export const TrashIcon = (props: TIconProps) => (
  <svg {...iconBaseProps(props)}>
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  </svg>
);

export const SparkleIcon = (props: TIconProps) => (
  <svg {...iconBaseProps(props)}>
    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6Z" />
    <path d="M19 15l.7 1.8L21.5 17.5l-1.8.7L19 20l-.7-1.8L16.5 17.5l1.8-.7Z" />
  </svg>
);

export const SearchOffIcon = (props: TIconProps) => (
  <svg {...iconBaseProps(props)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
    <path d="M4 4l16 16" />
  </svg>
);

export const PackageSearchIcon = (props: TIconProps) => (
  <svg {...iconBaseProps(props)}>
    <path d="M12 22V12" />
    <path d="M20.27 18.27 22 20" />
    <path d="M21 10.498V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.98-.559" />
    <path d="M3.29 7 12 12l8.71-5" />
    <path d="m7.5 4.27 8.997 5.148" />
    <circle cx="18.5" cy="16.5" r="2.5" />
  </svg>
);

export const ArrowRightIcon = (props: TIconProps) => (
  <svg {...iconBaseProps(props)}>
    <path d="M5 12h14" />
    <path d="m13 5 7 7-7 7" />
  </svg>
);
