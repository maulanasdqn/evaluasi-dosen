import clsx from "clsx";
import { DetailedHTMLProps, FC, FormHTMLAttributes, ReactElement } from "react";

type TForm = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export const Form: FC<TForm> = (props): ReactElement => {
  const className = clsx("h-auto w-fit flex flex-col", props.className);
  return (
    <form className={className} {...props}>
      {props.children}
    </form>
  );
};
