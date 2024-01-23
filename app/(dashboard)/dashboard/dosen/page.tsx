"use client";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/data-table";
import { InputText } from "@/components/ui/input-text";
import { Typography } from "@/components/ui/typography";
import { Modal } from "@/components/ui/modal";
import { trpc } from "@/utils/trpc";
import { NextPage } from "next";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "next-usequerystate";
import { ReactElement, useState } from "react";
import Image from "next/image";

const DashboardDosenPage: NextPage = (): ReactElement => {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const { data } = trpc.getLecturers.useQuery({
    page: page || 1,
    perPage: 16,
    search,
  });

  return (
    <section className="flex flex-col mt-6 w-auto bg-white p-6 rounded-lg gap-y-4 h-full overflow-x-hidden">
      <div className="flex gap-x-2">
        <Typography color="text-grey-300">EDOM</Typography>
        <Typography color="text-grey-300"> / </Typography>
        <Typography color="text-grey-300"> Kelola Dosen </Typography>
        <Typography color="text-grey-300"> / </Typography>
        <Typography color="text-success-800"> Data Dosen </Typography>
      </div>
      <Typography size="title-5" variant="semi-bold" color="text-success-800">
        Data Dosen
      </Typography>

      <div className="flex flex-col h-full gap-y-6 mt-8 py-4 items-center">
        <div className="flex w-full items-center">
          <div className="w-1/4">
            <Typography color="text-grey-800">Fakultas / Prodi</Typography>
          </div>

          <div className="flex gap-x-4 w-full">
            <div className="w-1/2">
              <InputText size="sm" placeholder="Pilih Prodi / Fakultas" />
            </div>

            <div className="w-1/2">
              <InputText
                type="search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
                size="sm"
                placeholder="Cari Nama, NIP, Mata Kuliah"
              />
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-rows-4 gap-4">
          {data?.data.map((x, i) => (
            <div
              key={i}
              className="bg-grey-50 w-[240px] gap-y-4 flex flex-col justify-between items-center h-auto rounded-lg shadow-md p-2"
            >
              <div className="flex flex-col gap-y-2 items-center">
                <div className="bg-green-100 w-[221px] h-[165px] rounded-lg">
                  <Image
                    className="rounded-lg bg-cover w-[221px] h-[165px] object-cover"
                    src={x.image as string}
                    alt="image"
                    width={218}
                    height={162}
                  />
                </div>
                <div className="flex flex-col gap-y-4 justify-center w-full items-center">
                  <div className="flex flex-col items-center">
                    <Typography
                      variant="medium"
                      color="text-grey-800"
                      size="body-1"
                    >
                      {x.fullname}
                    </Typography>
                    <div className="text-center">
                      <Typography color="text-grey-800" size="body-2">
                        {x.subjects}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center items-center">
                <Button variant={"primary"} size={"sm"}>
                  Lihat Detail
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center w-full">
          <Pagination meta={data?.meta} />
        </div>

        {data?.data.length === 0 && (
          <div className="flex items-center justify-center w-full">
            <Typography color="text-grey-800">Data tidak ditemukan</Typography>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardDosenPage;
