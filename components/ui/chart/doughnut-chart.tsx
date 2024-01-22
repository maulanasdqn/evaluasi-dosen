"use client";
import { ReactElement, FC, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartDoughnut: FC = (): ReactElement => {
  const [chartType, setChartType] = useState("genap");

  let dataset: number[] = [];

  if (chartType === "ganjil") {
    dataset = [10, 10];
  } else {
    dataset = [17, 3];
  }

  const total = dataset.reduce((acc, value) => acc + value, 0);

  // Menghitung persentase
  const percentageDataset = dataset.map((value) => (value / total) * 100); // Menambahkan simbol % dan membulatkan dua angka desimal

  const dataDoughnut = {
    labels: [
      `${percentageDataset[0]}% Mahasiswa sudah mengisi`,
      `${percentageDataset[1]}% Mahasiswa tidak mengisi`,
    ],
    datasets: [
      {
        label: "",
        data: dataset,
        backgroundColor: ["#02E56D", "#d34b21"],
        borderColor: ["#02E56D", "#d34b21"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-fit rounded-md shadow-md p-6">
      <section>
        <h1 className="text-md font-bold text-black">
          Rekap Jumlah Pengisian Kuisioner Mahasiswa
        </h1>

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
        <div className="h-[320px]">
          <Doughnut
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                  textDirection: "left",
                },
              },
            }}
            data={dataDoughnut}
          />
        </div>
      </section>
    </div>
  );
};
