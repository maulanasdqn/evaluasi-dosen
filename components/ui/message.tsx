import { FC, ReactElement } from "react";
import { clsx } from "clsx";
import { match } from "ts-pattern";
import { BiErrorCircle, BiCheckCircle } from "react-icons/bi";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export type TMessage = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  status?: "error" | "success" | "warning" | "none";
  size?: "sm" | "md" | "lg";
};

export const Message: FC<TMessage> = (props): ReactElement => {
  const { status = "none" } = props;

  const statusIcon = match(status)
    .with("error", () => <BiErrorCircle />)
    .with("success", () => <BiCheckCircle />)
    .with("warning", () => <BiErrorCircle />)
    .with("none", () => null)
    .exhaustive();

  const className = clsx(
    "text-xs flex items-center gap-x-1 mt-[-7px] py-[7px] border-0 p-0",
    {
      "text-red-400": status === "error",
      "text-green-600": status === "success",
      "text-grey-400": status === "none",
      "text-orange-400": status === "warning",
    },
  );

  return (
    <span className={className} {...props}>
      {statusIcon}
      {props.children}
    </span>
  );
};
