import ChartBar from "@/components/ui/chart/bar-chart";
import { ChartDoughnut } from "@/components/ui/chart/doughnut-chart";
import { ChartLine } from "@/components/ui/chart/line-chart";
import { NextPage } from "next";
import { Fragment, ReactElement } from "react";

const DashboardChartPage: NextPage = (): ReactElement => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default DashboardChartPage;
