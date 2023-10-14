import { Chart } from "primereact/chart";
import { useState, useEffect } from "react";

const PieChartComponent = ({ labels, data }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const pieData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "#FFC107",
            "#03A9F4",
            "#4CAF50",
            "#E91E63",
            "#9C27B0",
            // ... Add more colors if you have more data points.
          ],
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            fontFamily: "iranyekan",
            fontColor: "#333",
          },
        },
      },
    };

    setChartOptions(options);
    setChartData(pieData);
  }, []);

  console.log({ chartData, chartOptions });

  return <Chart type="pie" data={chartData} options={chartOptions} />;
};

export default PieChartComponent;
