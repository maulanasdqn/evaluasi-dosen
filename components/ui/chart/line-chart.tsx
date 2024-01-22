"use client";
import { ReactElement, FC, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export const ChartLine: FC = (): ReactElement => {
  const [chartType, setChartType] = useState("genap");

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 3,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  let labels: string[] = [];
  let Reability: number[] = [];
  let Responsive: number[] = [];
  let Assurance: number[] = [];
  let Empathy: number[] = [];
  let Tangible: number[] = [];

  switch (chartType) {
    case "ganjil":
      labels = [
        "September",
        "Oktober",
        "November",
        "Desemmber",
        "Januari",
        "Februari",
      ];
      Reability = [9, 4, 4, 6, 14, 7];
      Responsive = [15, 2, 2, 11, 21, 19];
      Assurance = [9, 3, 6, 8, 8, 7];
      Empathy = [7, 5, 6, 2, 10, 11];
      Tangible = [2, 13, 8, 11, 10, 18];
      break;
    case "genap":
      labels = ["Maret", "April", "Mei", "Juni", "Juli", "Agustus"];
      Reability = [19, 24, 14, 26, 4, 17];
      Responsive = [9, 3, 6, 8, 8, 7];
      Assurance = [7, 5, 6, 2, 10, 11];
      Empathy = [15, 2, 2, 11, 21, 19];
      Tangible = [12, 8, 6, 5, 11, 14];

      break;

    default:
      labels = [];
      Reability = [];
      Responsive = [];
      Assurance = [];
      Empathy = [];
      Tangible = [];
      break;
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Reability",
        borderColor: "#00BF56",
        backgroundColor: "#00BF56",
        data: Reability,
      },
      {
        label: "Responsive",
        borderColor: "#B0DEC6",
        backgroundColor: "#B0DEC6",
        data: Responsive,
      },
      {
        label: "Assurance",
        borderColor: "#BB2D3B",
        backgroundColor: "#BB2D3B",
        data: Assurance,
      },
      {
        label: "Empathy",
        borderColor: "#F8BF02",
        backgroundColor: "#F8BF02",
        data: Empathy,
      },
      {
        label: "Tangible",
        borderColor: "#009647",
        backgroundColor: "#009647",
        data: Tangible,
      },
    ],
  };

  return (
    <div className="lg:w-45% w-full h-fit rounded-md shadow-md p-6">
      <section>
        <div className="w-full flex justify-between">
          <h1 className="text-md py-2 font-bold text-black font-bold">
            Rekapitulasi Penilain Sesuai Kategori Soal
          </h1>
        </div>

        <div className="flex justify-between w-full items-center h-[52px] rounded-md shadow-md my-4 p-2 ">
          <section className="flex text-md gap-4 text-black">
            <div
              className={`p-1 hover:shadow-md hover:rounded-md hover:text-black ${
                chartType === "ganjil" ? "text-black shadow-md rounded-md" : ""
              }`}
              onClick={() => setChartType("ganjil")}
            >
              Ganjil
            </div>
            <div
              className={`p-1 hover:shadow-md hover:rounded-md hover:text-black ${
                chartType === "genap" ? "text-black shadow-md rounded-md" : ""
              }`}
              onClick={() => setChartType("genap")}
            >
              Genap
            </div>
          </section>
        </div>
        <div className="w-full h-[300px]">
          <Line options={options} data={data} />
        </div>
      </section>
    </div>
  );
};
