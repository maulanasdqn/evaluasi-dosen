import { ReactElement } from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { TCommonForm, TInput } from "@/entities";
import { FieldText } from "./field-text";

type TFieldText = TInput & Omit<TCommonForm, "text">;
export type TControlledFieldText<T extends FieldValues> =
  UseControllerProps<T> & TFieldText;

export const ControlledFieldText = <T extends FieldValues>(
  props: TControlledFieldText<T>,
): ReactElement => {
  const { field } = useController<T>(props);
  return <FieldText {...{ ...props, ...field }} />;
};
