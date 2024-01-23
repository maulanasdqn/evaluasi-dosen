import { FC, Fragment, ReactElement } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export const ReportChart: FC = (): ReactElement => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const dataValues = [500, 400, 300, 200, 100];
  const total = dataValues.reduce((acc, value) => acc + value, 0);
  const percentageValues = dataValues.map(
    (value) => ((value / total) * 100).toFixed(2) + "%"
  );

  const dataDoughnut = {
    labels: [
      `${percentageValues[0]}% Reability`,
      `${percentageValues[1]}% Responsiveness`,
      `${percentageValues[2]}% Assurance`,
      `${percentageValues[3]}% Empathy`,
      `${percentageValues[4]}% Tangible`,
    ],
    datasets: [
      {
        label: "",
        data: dataValues,
        percentageValues: percentageValues,
        backgroundColor: [
          "#0F6C41",
          "#3EEA99",
          "#14D379",
          "#0BBC69",
          "#0C894F",
        ],
        borderColor: ["#0F6C41", "#3EEA99", "#14D379", "#0BBC69", "#0C894F"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Doughnut
        options={{
          maintainAspectRatio: false, // Mengizinkan penyesuaian ukuran
          aspectRatio: 0.5,
          plugins: {
            legend: {
              position: "right", // Set legenda ke sisi kanan
              textDirection: "center",
              align: "center",
            },
          },
          responsive: false,
        }}
        data={dataDoughnut}
      />
      <span className="text-black text-xs py-4 ">
        <h1 className="pt-8">Keterangan :</h1>
        <ul>
          <li>
            1. Keandalan (reliability): kemampuan dosen, tenaga kependidikan,
            dan pengelola dalam memberikan pelayanan
          </li>
          <li>
            2.Daya tanggap (responsiveness): kemauan dari dosen, tenaga
            kependidikan, dan pengelola dalam membantu mahasiswa dan memberikan
            jasa dengan cepat;
          </li>
          <li>
            3. Kepastian (assurance): kemampuan dosen, tenaga kependidikan, dan
            pengelola untuk memberi keyakinan kepada mahasiswa bahwa pelayanan
            yang diberikan telah sesuai dengan ketentuan;
          </li>
          <li>
            4. Empati (empathy): kesediaan/kepedulian dosen, tenaga
            kependidikan, dan pengelola untuk memberi perhatian kepada
            mahasiswa; dan{" "}
          </li>
          <li>
            5. Tangible: penilaian mahasiswa terhadap kecukupan, aksesibitas,
            kualitas sarana dan prasarana.
          </li>
        </ul>
      </span>
    </div>
  );
};
