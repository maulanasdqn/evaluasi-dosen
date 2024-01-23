import { P, match } from "ts-pattern";
import { clsx } from "clsx";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactElement,
} from "react";
import Link from "next/link";

type TButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant: "primary" | "secondary" | "cancel" | "border" | "danger";
  size: "sm" | "md" | "lg";
  isLoading?: boolean;
  isfullwidth?: string;
  href?: string;
};

export const Button: FC<TButton> = (props): ReactElement => {
  const className = clsx(
    "cursor-pointer rounded-lg h-fit disabled:bg-grey-200 disabled:text-white disabled:cursor-not-allowed",
    {
      "bg-error-500 hover:bg-error-600 text-white": props.variant === "danger",
      "bg-green-pea-200 hover:bg-green-pea-300": props.variant === "secondary",
      "bg-transparent border text-green-500 font-medium border-green-500":
        props.variant === "border",
      "bg-green-500 text-white hover:bg-green-400": props.variant === "primary",
      "bg-white border border-grey-500 text-grey-500":
        props.variant === "cancel",
    },
    {
      "py-2 px-4": props.size === "sm",
      "py-3 px-6": props.size === "md",
      "py-4 px-8": props.size === "lg",
    },
    {
      "bg-greyscale": props.isLoading,
    },
    {
      "w-full": props.isfullwidth,
      "w-fit": !props.isfullwidth,
    },
  );

  return match(props.href)
    .with(undefined, () => (
      <button {...props} className={className}>
        {props.isLoading ? "Loading..." : props.children}
      </button>
    ))
    .with(P.string, (data) => (
      <Link href={data}>
        <button {...props} className={className}>
          {props.isLoading ? "Loading..." : props.children}
        </button>
      </Link>
    ))
    .exhaustive();
};
