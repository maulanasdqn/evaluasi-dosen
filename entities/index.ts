import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import { z } from "zod";

export type TInput = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;

export type TCommonForm = {
  size?: "sm" | "md" | "lg";
  status?: "error" | "warning" | "success" | "none";
  message?: string;
  label?: string;
  append?: ReactNode;
  preppend?: ReactNode;
  text?: string;
  hint?: string;
};

export type TUser = {
  id: string;
  fullname: string;
  image?: string;
  email: string;
  isPasswordSet: boolean;
  role: {
    id: string;
    name: string;
    permissions: string[];
  };
};

export type TMetaItem = {
  code?: number;
  status?: string;
  message?: string;
  page?: number;
  perPage?: number;
  totalPage?: number;
  nextPage?: number | null;
  prevPage?: number | null;
};

export const VSMetaRequest = z
  .object({
    search: z.string(),
    page: z.number(),
    perPage: z.number(),
    isApproved: z.boolean().optional(),
  })
  .optional();

export type TMetaResponse<T, M = TMetaItem> = {
  data: T;
  meta: M;
};
