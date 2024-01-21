"use client";

import { DataTable } from "@/components/ui/data-table";
import { Typography } from "@/components/ui/typography";
import { ColumnDef } from "@tanstack/react-table";
import { NextPage } from "next";
import { ReactElement } from "react";

const data = [
  {
    dimension: "Reability",
    indicator: "Ketepatan Waktu Kuliah",
    question:
      "Apakah mengatakan waduh pada saat marah adalah tindakan yang bijak?",
  },
  {
    dimension: "Reability",
    question: "Angin Bawalah jiwaku melayang",
    indicator: "Ketepatan Waktu Kuliah",
  },
  {
    dimension: "Reability",
    indicator: "Ketepatan Waktu Kuliah",
    question: "Angin tancapkanlah busur panah cintaku",
  },
];

const DashboardDosenPage: NextPage = (): ReactElement => {
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
    },

    {
      header: "Tindakan",
      cell: () => {
        return <span>Hapus | Edit</span>;
      },
    },
  ];
  return (
    <section className="flex flex-col mt-6 w-auto gap-y-4 mr-[300px] h-full overflow-x-hidden">
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
          data={data}
          columns={columns}
          meta={{ totalPage: 10, page: 1, perPage: 10 }}
        />
      </div>
    </section>
  );
};

export default DashboardDosenPage;
