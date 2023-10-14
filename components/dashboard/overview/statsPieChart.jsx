import { Chart } from "primereact/chart";
import { useState, useEffect } from "react";

const PieChartComponent = ({ labels, data }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});



  // const backgroundColors = labels.map(label => {
  //   const color = labelColors[label];
  //   if (!color) {
  //     console.error("No color found for label:", label);
  //   }
  //   return color || "#000000";
  // });


  useEffect(() => {
    const labelColors = {
      "مرکز تصویربرداری رازی (دکتر علیزاده)": "#8cbec2",
      "سونوگرافی و رادیولوژی ژرفا": "#b38fc2",
      "ایران نوبت": "#e38766",
      "کلینیک روانشناسی و مشاوره موج آرامش": "#E91E63",
    };

    const backgroundColors = labels.map(label => {
      const color = labelColors[label];
      return color || "#000000";
    });

    console.log("Generated backgroundColors:", backgroundColors);

    const pieData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColors
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top', // assuming your legend is on top, adjust as needed
          labels: {
            font: {
              size: 12,
              family: 'iranyekan'
            },
            usePointStyle: true,
          },

          padding: {
            top: 0,
            right: 0,
            bottom: 20,  // adjust this value as needed
            left: 0
          }
        }
      },
    };

    setChartOptions(options);
    setChartData(pieData);



  }, [labels, data]);

  console.log({ chartData, chartOptions });

  return <Chart type="pie" data={chartData} options={chartOptions} />;
};

export default PieChartComponent;
