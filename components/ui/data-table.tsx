import { FC, ReactElement, useState } from "react";
import { InputText } from "./input-text";
import { Button } from "./button";
import { TMetaItem } from "@/entities";
import { ChangeEventHandler, DetailedHTMLProps, HTMLAttributes } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";

export type TTable<T extends Record<string, any>> = DetailedHTMLProps<
  HTMLAttributes<HTMLTableElement>,
  HTMLTableElement
> & {
  meta?: TMetaItem;
  handleSearch?: ChangeEventHandler<HTMLInputElement>;
  createLink?: string;
  createLabel?: string;
  data: Array<T>;
  columns: ColumnDef<T>[];
};

export type TPagination = {
  meta?: TMetaItem;
};

import { parseAsInteger, useQueryState } from "next-usequerystate";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export const Pagination: FC<TPagination> = (props): ReactElement => {
  const { meta } = props;
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [perPage, setPerPage] = useQueryState("perPage", parseAsInteger);

  const totalPage = Number(meta?.totalPage) || 0;
  const currentPage = Number(meta?.page) || 1;
  const maxButtons = 5;
  const halfMaxButtons = Math.floor(maxButtons / 2);

  let startPage = Math.max(currentPage - halfMaxButtons, 1);
  let endPage = Math.min(startPage + maxButtons - 1, totalPage);

  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(endPage - maxButtons + 1, 1);
  }

  return (
    <div className="flex justify-start gap-x-2">
      <Button onClick={() => setPage(1)} variant="cancel" size="sm">
        {"<<"}
      </Button>

      <Button
        onClick={() => Number(page) > 1 && setPage(Number(page) - 1)}
        variant="cancel"
        size="sm"
      >
        Prev
      </Button>

      {Array.from({ length: Math.min(maxButtons, totalPage) }, (_, i) => (
        <Button
          onClick={() => setPage(startPage + i)}
          key={startPage + i}
          variant={startPage + i === currentPage ? "primary" : "cancel"}
          size="sm"
        >
          {startPage + i}
        </Button>
      ))}

      <Button
        onClick={() =>
          Number(page) < Number(meta?.totalPage) && setPage(Number(page) + 1)
        }
        variant="cancel"
        size="sm"
      >
        Next
      </Button>

      <Button
        onClick={() => setPage(Number(meta?.totalPage))}
        variant="cancel"
        size="sm"
      >
        {">>"}
      </Button>
    </div>
  );
};
export const DataTable = <T extends Record<string, any>>(
  props: TTable<T>,
): ReactElement => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });
  return (
    <section className="shadow-md bg-grey-50 h-fit overflow-y-hidden border p-4 rounded-lg w-full gap-y-4 flex flex-col overflow-x-auto">
      <div className="flex md:flex-row flex-col md:gap-x-3 gap-y-4 md:items-center sticky z-10 w-full">
        <div className="w-fit">
          <InputText
            size="sm"
            placeholder="Cari data..."
            onChange={props.handleSearch}
          />
        </div>
        {props.createLink && (
          <div>
            <Button href={props.createLink} variant="primary" size="sm">
              {props.createLabel}
            </Button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto min-w-max w-full h-fit flex p-1 bg-white shadow-md rounded-lg relative">
        <table
          {...props}
          className="p-2 w-full table-auto border-collapse rounded-lg"
        >
          <thead className="bg-green-500 p-2 w-auto h-auto">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="text-white p-2 text-left select-none"
                    key={header.id}
                  >
                    <div
                      {...{
                        className: "flex items-center",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                      {{
                        asc: (
                          <IoMdArrowDropup
                            size="1.5em"
                            style={{ marginLeft: "2px" }}
                          />
                        ),
                        desc: (
                          <IoMdArrowDropdown
                            size="1.5em"
                            style={{ marginLeft: "2px" }}
                          />
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-grey-100 odd:bg-grey-50">
                {row.getVisibleCells().map((cell, index) => (
                  <td key={index} className="py-4 text-grey-600 font-medium">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {props.meta && props?.data?.length > 0 && <Pagination {...props} />}
    </section>
  );
};
