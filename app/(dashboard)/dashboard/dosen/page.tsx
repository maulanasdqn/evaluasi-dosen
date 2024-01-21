import { Button } from "@/components/ui/button";
import { InputText } from "@/components/ui/input-text";
import { Typography } from "@/components/ui/typography";
import { NextPage } from "next";
import { ReactElement } from "react";

const data = [
  {
    nama: "Dosen 1",
    matkul: "AL Islam",
  },
  {
    nama: "Dosen 1",
    matkul: "AL Islam",
  },
  {
    nama: "Dosen 1",
    matkul: "AL Islam",
  },
  {
    nama: "Dosen 1",
    matkul: "AL Islam",
  },
  {
    nama: "Dosen 1",
    matkul: "AL Islam",
  },
  {
    nama: "Dosen 1",
    matkul: "AL Islam",
  },
  {
    nama: "Dosen 1",
    matkul: "AL Islam",
  },
  {
    nama: "Dosen 1",
    matkul: "AL Islam",
  },
  {
    nama: "Dosen 1",
    matkul: "AL Islam",
  },
  {
    nama: "Dosen 1",
    matkul: "AL Islam",
  },
  {
    nama: "Dosen 1",
    matkul: "AL Islam",
  },
];

const DashboardDosenPage: NextPage = (): ReactElement => {
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
              <InputText size="sm" placeholder="Cari Nama, NIP, Mata Kuliah" />
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-rows-4 gap-4">
          {data.map((x, i) => (
            <div
              key={i}
              className="bg-grey-50 w-[240px]  gap-y-4 flex flex-col h-[300px] rounded-lg shadow-md p-2"
            >
              <div className="bg-green-100 w-[221px] h-[165px] rounded-lg"></div>
              <div className="flex flex-col gap-y-4 justify-center w-full items-center">
                <div className="flex flex-col items-center">
                  <Typography
                    variant="medium"
                    color="text-grey-800"
                    size="body-1"
                  >
                    Anna
                  </Typography>
                  <Typography color="text-grey-800" size="body-2">
                    Dosen Al Islam
                  </Typography>
                </div>
                <div className="flex">
                  <Button variant={"primary"} size={"sm"}>
                    Lihat Detail
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardDosenPage;
