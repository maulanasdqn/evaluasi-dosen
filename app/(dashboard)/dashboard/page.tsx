import ChartBar from "@/components/ui/chart/bar-chart";
import { ChartDoughnut } from "@/components/ui/chart/doughnut-chart";
import { ChartLine } from "@/components/ui/chart/line-chart";
import { Typography } from "@/components/ui/typography";
import { NextPage } from "next";
import { ReactElement } from "react";

const DashboardPage: NextPage = (): ReactElement => {
  return (
    <section className="flex flex-col w-auto bg-white p-6 rounded-lg gap-y-4 h-full overflow-x-hidden">
      <div className="flex gap-x-2">
        <Typography color="text-grey-300">EDOM</Typography>
        <Typography color="text-grey-300"> / </Typography>
        <Typography color="text-success-800"> Beranda </Typography>
      </div>
      <Typography size="title-5" variant="semi-bold" color="text-success-800">
        Beranda
      </Typography>
      <Typography size="body-1" variant="semi-bold" color="text-success-800">
        Rekapitulasi Data
      </Typography>
      <div className="flex gap-x-2 w-full">
        <div className="flex flex-col gap-y-2 justify-center px-4 bg-grey-50 shadow-md rounded-lg w-1/4 h-[130px] text-black">
          <h1 className="font-bold">Total Fakultas</h1>
          <p>7</p>
        </div>
        <div className="flex flex-col gap-y-2 justify-center px-4 bg-grey-50 shadow-md rounded-lg w-1/4 h-[130px] text-black">
          <h1 className="font-bold">Total Prodi</h1>
          <p>21</p>
        </div>
        <div className="flex flex-col gap-y-2 justify-center px-4 bg-grey-50 shadow-md rounded-lg w-1/4 h-[130px] text-black">
          <h1 className="font-bold">Jumlah Dosen</h1>
          <p>216</p>
        </div>
        <div className="flex flex-col gap-y-2 justify-center px-4 bg-grey-50 shadow-md rounded-lg w-1/4 h-[130px] text-black">
          <h1 className="font-bold">Jumlah Mahasiswa</h1>
          <p>1856</p>
        </div>
      </div>
      <div className="flex gap-x-2 w-full">
        <div className="bg-grey-50 shadow-md rounded-lg w-2/3 h-[477px]">
          <ChartLine />
        </div>
        <div className="bg-grey-50 shadow-md rounded-lg w-1/2 h-[477px]">
          <ChartDoughnut />
        </div>
      </div>
      <div className="bg-grey-50 shadow-md rounded-lg w-full h-[477px]">
        <ChartBar />
      </div>
    </section>
  );
};

export default DashboardPage;
