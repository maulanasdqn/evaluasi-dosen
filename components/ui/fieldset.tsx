import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { TCommonForm } from "@/entities";
import { FC, ReactElement } from "react";
import { match } from "ts-pattern";
import { Label } from "./label";
import { Message } from "./message";

export type TOption<T = string | number> = {
  label: string;
  value: T;
};

export type TFieldSet = Omit<
  DetailedHTMLProps<
    | InputHTMLAttributes<HTMLInputElement>
    | SelectHTMLAttributes<HTMLSelectElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  "size" | "type"
> &
  TCommonForm &
  Pick<InputHTMLAttributes<HTMLInputElement>, "type">;

export const Fieldset: FC<TFieldSet> = (props): ReactElement => {
  const { status = "none" } = props;

  const inputType = match(props.type)
    .with("checkbox", () => (
      <section className="flex flex-col gap-y-2">
        {props?.label && (
          <Label
            htmlFor={props.name}
            disabled={props.disabled}
            size={props.size}
            required={props.required}
          >
            {props.label}
          </Label>
        )}
        <section className="flex gap-x-2">
          {props.children}
          {props?.text && (
            <Label
              id={props.name}
              htmlFor={props.name}
              disabled={props.disabled}
              size={props.size}
            >
              {props.text}
            </Label>
          )}
        </section>
      </section>
    ))
    .with("radio", () => (
      <section className="flex flex-col gap-y-1">
        {props?.label && (
          <Label
            htmlFor={props.name}
            disabled={props.disabled}
            size={props.size}
            required={props.required}
          >
            {props.label}
          </Label>
        )}
        <div className="flex gap-x-4">{props.children}</div>
      </section>
    ))

    .otherwise(() => (
      <section className="relative flex flex-col gap-y-2">
        {props?.label && (
          <Label
            htmlFor={props.name}
            disabled={props.disabled}
            size={props.size}
            required={props.required}
          >
            {props.label}
          </Label>
        )}
        {props?.preppend && (
          <div className="flex items-center gap-x-2 absolute top-3 left-2">
            {props.preppend}
          </div>
        )}
        {props.children}
        {props?.append && (
          <div className="flex items-center gap-x-2 absolute top-2 right-3">
            {props.append}
          </div>
        )}
      </section>
    ));

  return (
    <fieldset className="flex flex-col gap-y-2">
      {inputType}
      {props.message && status !== "none" && (
        <Message {...props}>{props.message}</Message>
      )}
      {props?.hint && <Message status={"none"}>*{props.hint}</Message>}
    </fieldset>
  );
};
