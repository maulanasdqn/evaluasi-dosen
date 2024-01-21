import { ReactElement, forwardRef } from "react";
import { Fieldset } from "./fieldset";
import { InputText } from "./input-text";
import { TCommonForm, TInput } from "@/entities";

export type TFieldText = TInput & Omit<TCommonForm, "text">;

export const FieldText = forwardRef<HTMLInputElement, TFieldText>(
  (props, ref): ReactElement => {
    return (
      <Fieldset {...props}>
        <InputText {...props} ref={ref} />
      </Fieldset>
    );
  },
);

FieldText.displayName = "FieldText";
