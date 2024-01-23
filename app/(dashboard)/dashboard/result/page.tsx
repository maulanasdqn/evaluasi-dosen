"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Typography } from "@/components/ui/typography";
import { trpc } from "@/utils/trpc";
import { ColumnDef } from "@tanstack/react-table";
import { Modal } from "@/components/ui/modal";
import { NextPage } from "next";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "next-usequerystate";
import { ReactElement, useState } from "react";
import { FaEye } from "react-icons/fa";
import { ReportChart } from "@/components/ui/chart/report-chart";

const DashboardResultPage: NextPage = (): ReactElement => {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );
  const { data } = trpc.getLecturers.useQuery({
    page,
    perPage: 5,
    search,
  });
  const columns: ColumnDef<any>[] = [
    {
      header: "Nama Dosen",
      accessorKey: "fullname",
    },
    {
      header: "Fakultas",
      accessorKey: "faculty",
    },
    {
      header: "Prodi",
      accessorKey: "major",
    },
    {
      header: "Grade",
      accessorKey: "grade",
    },
    {
      header: "Penilaian",
      accessorKey: "point",
    },

    {
      header: "Tindakan",
      cell: () => {
        return (
          <Button onClick={() => setModal(true)} variant="border" size="sm">
            <div className="flex gap-x-2 items-center">
              <FaEye /> Lihat Detail
            </div>
          </Button>
        );
      },
    },
  ];
  return (
    <section className="flex flex-col mt-6 bg-white p-6 rounded-lg w-auto gap-y-4 h-full overflow-x-hidden">
      <div className="flex gap-x-2">
        <Typography color="text-grey-300">EDOM</Typography>
        <Typography color="text-grey-300"> / </Typography>
        <Typography color="text-grey-300"> Kelola Dosen </Typography>
        <Typography color="text-grey-300"> / </Typography>
        <Typography color="text-success-800"> Hasil Evaluasi </Typography>
      </div>

      <Typography size="title-5" variant="semi-bold" color="text-success-800">
        Hasil Evaluasi
      </Typography>

      <div className="flex flex-col h-full gap-y-6 mt-8">
        <DataTable
          data={data?.data || []}
          columns={columns}
          meta={data?.meta}
          handleSearch={(e) => setSearch(e.target.value)}
        />
      </div>
      <Modal
        isOpen={modal}
        onClose={() => setModal(!modal)}
        width="400px"
        height="auto"
        title="Hasil Evaluasi"
      >
        <ReportChart />
      </Modal>
    </section>
  );
};

export default DashboardResultPage;
