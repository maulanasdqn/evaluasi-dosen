import { forwardRef, ReactElement } from "react";
import { TCommonForm, TInput } from "@/entities";
import { inputClassName } from "@/utils";

export type TInputText = Omit<TInput, "size"> &
  Pick<TCommonForm, "size" | "status">;

export const InputText = forwardRef<HTMLInputElement, TInputText>(
  ({ size, ...props }, ref): ReactElement => {
    return (
      <input
        {...props}
        data-testid="input-text"
        className={inputClassName({ size, ...props })}
        ref={ref}
        id={props.name}
      />
    );
  },
);

InputText.displayName = "InputText";
