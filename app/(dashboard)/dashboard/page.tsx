import { Typography } from "@/components/ui/typography";
import { NextPage } from "next";
import { ReactElement } from "react";

const DashboardPage: NextPage = (): ReactElement => {
  return (
    <section className="flex flex-col w-auto gap-y-4 mr-[300px] h-full overflow-x-hidden">
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
        <div className="bg-white shadow-md rounded-lg w-1/2 h-[130px]"></div>
        <div className="bg-white shadow-md rounded-lg w-1/2 h-[130px]"></div>
      </div>
      <div className="flex gap-x-2 w-full">
        <div className="bg-white shadow-md rounded-lg w-2/3 h-[477px]"></div>
        <div className="bg-white shadow-md rounded-lg w-1/2 h-[477px]"></div>
      </div>
      <div className="bg-white shadow-md rounded-lg w-full h-[477px]"></div>
    </section>
  );
};

export default DashboardPage;
