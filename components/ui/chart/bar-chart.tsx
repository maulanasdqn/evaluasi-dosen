"use client";
import { FC, ReactElement, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

const ChartBar: FC = (): ReactElement => {
  const [chartType, setChartType] = useState("genap");

  let dataset: number[] = [];

  if (chartType === "ganjil") {
    dataset = [10, 19, 13, 8, 11, 9, 12];
  } else {
    dataset = [17, 3, 9, 2, 12, 15, 8];
  }

  const data = {
    labels: ["FTEK", "FHUM", "FTAN", "FIKOM", "FKON", "FKIP", "FAI"],
    datasets: [
      {
        label: "",
        backgroundColor: [
          "#085F33",
          "#AFFFD4",
          "#2DFB8C",
          "#71FFB4",
          "#D6FFE9",
          "#00BF56",
          "#02E56D",
        ],
        borderColor: "white",
        borderWidth: 1,
        data: dataset,
        barPercentage: 0.3,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,

    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
    scales: {
      x: {
        type: "category" as const, // Set the type to "category"
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className=" w-full h-[477px] rounded-md shadow-md p-6">
      <section>
        <div className="w-full flex justify-between">
          <h1 className="text-md py-2 font-bold text-black ">
            Rekapitulasi Penilain Sesuai Kategori Soal
          </h1>
        </div>

        <div className="flex justify-between w-full items-center h-[52px] rounded-md shadow-md my-4 p-2 ">
          <section className="flex text-md gap-4 text-black ">
            <div
              className={`p-1 hover:shadow-md hover:rounded-md hover:text-black  ${
                chartType === "ganjil"
                  ? "font-bold text-black shadow-md rounded-md"
                  : ""
              }`}
              onClick={() => setChartType("ganjil")}
            >
              Ganjil
            </div>
            <div
              className={`p-1 hover:shadow-md hover:rounded-md hover:text-black ${
                chartType === "genap"
                  ? "font-bold ttext-black  shadow-md rounded-md"
                  : ""
              }`}
              onClick={() => setChartType("genap")}
            >
              Genap
            </div>
          </section>
        </div>
        <div className="w-full h-[350px] pt-8">
          <Bar options={options} data={data} />
        </div>
      </section>
    </div>
  );
};

export default ChartBar;
