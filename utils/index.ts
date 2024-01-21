import { TCommonForm, TMetaItem, TMetaResponse } from "@/entities";
import { clsx } from "clsx";
import { toast } from "react-toastify";

export const inputClassName = ({
  size,
  status,
  preppend,
  append,
}: Pick<TCommonForm, "size" | "status" | "append" | "preppend">): string =>
  clsx(
    "rounded-lg border outline-none w-full focus:outline-none focus:ring-0 ring-0",
    "disabled:bg-grey-100 disabled:placeholder:text-grey-300 disabled:border-grey-200",
    "disable:cursor-not-allowed disable:opacity-50 disable:select-none disabled:text-grey-300",
    {
      "text-sm placeholder:text-xs pl-2 pr-3 py-2":
        size === "sm" && !preppend && !append,
      "text-sm placeholder:text-xs pl-8 pr-3 py-2":
        size === "sm" && preppend && !append,
      "text-sm placeholder:text-xs pl-2 pr-8 py-2":
        size === "sm" && !preppend && append,
      "text-sm placeholder:text-xs pl-8 pr-8 py-2":
        size === "sm" && preppend && append,
    },
    {
      "text-base placeholder:text-sm pl-3 pr-4 py-3":
        size === "md" && !preppend && !append,
      "text-base placeholder:text-sm pl-10 pr-4 py-3":
        size === "md" && preppend && !append,
      "text-base placeholder:text-sm pl-3 pr-10 py-3":
        size === "md" && !preppend && append,
      "text-base placeholder:text-sm pl-10 pr-10 py-3":
        size === "md" && preppend && append,
    },
    {
      "text-lg placeholder:text-base pl-4 pr-5 py-4":
        size === "lg" && !preppend && !append,
    },
    {
      "bg-grey-50 placeholder:text-grey-300 text-grey-400 focus:ring-0 border-grey-300":
        status === "none" || !status,
      "border-green-300 placeholder:text-green-300 text-green-400 bg-green-50":
        status === "success",
      "placeholder:text-red-400 text-red-400 bg-red-100 border-red-400":
        status === "error",
      "border-orange-400 placeholder:text-orange-400 text-orange-400 bg-orange-100":
        status === "warning",
    },
  );

export function hasCommonElements<T>(arr1: T[], arr2: T[]): boolean {
  const [shorter, longer] =
    arr1.length < arr2.length ? [arr1, arr2] : [arr2, arr1];
  const set = new Set<T>(shorter);
  return longer.some((element) => set.has(element));
}

export const permissionMapper = [
  {
    url: "/dashboard",
    permissions: [],
  },
  {
    url: "/dashboard/guest",
    permissions: [],
  },
  {
    url: "/dashboard/guest/complete",
    permissions: [],
  },
  {
    url: "/dashboard/setting",
    permissions: [],
  },
  {
    url: "/scan",
    permissions: [],
  },
  {
    url: "/check-in",
    permissions: [],
  },
];

export const metaResponsePrefix = <T>({
  data,
  meta,
}: {
  data: T;
  meta: TMetaItem;
}): TMetaResponse<T> => {
  return {
    data,
    meta,
  };
};

export function calculateTotalPages(
  totalItems: number,
  itemsPerPage: number,
): number {
  return Math.ceil(totalItems / itemsPerPage);
}

export const notifyMessage = ({
  message,
  type = "success",
}: {
  message: string;
  type: "success" | "error";
}) =>
  toast(message, {
    position: "top-right",
    type,
    theme: "light",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export function generateAlphanumericCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
