import { Typography } from "@/components/ui/typography";
import { FC, ReactNode } from "react";

const DashboardDefaultLayout: FC<{
  children: ReactNode;
  chart: ReactNode;
  card: ReactNode;
}> = (props) => {
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
      {props.card}
      {props.chart}
    </section>
  );
};

export default DashboardDefaultLayout;
