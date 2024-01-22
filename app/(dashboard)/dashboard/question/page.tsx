"use client";

import { DataTable } from "@/components/ui/data-table";
import { Typography } from "@/components/ui/typography";
import { trpc } from "@/utils/trpc";
import { ColumnDef } from "@tanstack/react-table";
import { NextPage } from "next";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "next-usequerystate";
import { ReactElement } from "react";

const DashboardDosenPage: NextPage = (): ReactElement => {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const { data } = trpc.getQuestions.useQuery({
    perPage: 5,
    page,
    search,
  });

  const columns: ColumnDef<any>[] = [
    {
      header: "Dimensi",
      accessorKey: "dimension",
    },
    {
      header: "Indikator",
      accessorKey: "indicator",
    },

    {
      header: "Pertanyaan",
      accessorKey: "question",
      accessorFn: (data) => data.question || "-",
    },

    {
      header: "Tindakan",
      cell: () => {
        return <span>Hapus | Edit</span>;
      },
    },
  ];
  return (
    <section className="flex flex-col mt-6 bg-white p-6 rounded-lg w-auto gap-y-4 h-full overflow-x-hidden">
      <div className="flex gap-x-2">
        <Typography color="text-grey-300">EDOM</Typography>
        <Typography color="text-grey-300"> / </Typography>
        <Typography color="text-grey-300"> Kelola Pertanyaan </Typography>
        <Typography color="text-grey-300"> / </Typography>
        <Typography color="text-success-800"> Mangement Pertanyaan </Typography>
      </div>

      <Typography size="title-5" variant="semi-bold" color="text-success-800">
        Management Pertanyaan
      </Typography>

      <div className="flex flex-col h-full gap-y-6 mt-8">
        <DataTable
          createLink="/"
          createLabel="Tambah Pertanyaan +"
          data={data?.data || []}
          columns={columns}
          meta={data?.meta}
          handleSearch={(e) => setSearch(e.target.value)}
        />
      </div>
    </section>
  );
};

export default DashboardDosenPage;
