import { Chart } from "primereact/chart";
import { useState, useEffect } from "react";
import Loading from "components/commonComponents/loading/loading";
// import * as d3 from "d3";

const PieChartComponent = ({ labels, data }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const labelColors = {
      "ایران نوبت": "#e38766",
      "مرکز تصویربرداری رازی (دکتر علیزاده) تهران": "#6491af",
      "سونوگرافی و رادیولوژی ژرفا | دکتر سعید خسروی": "#2d5246",
      "کلینیک روانشناسی و مشاوره موج آرامش": "#E91E63",
      "مرکز رادیولوژی و سونوگرافی اکباتان تهران": "#0E76BC",
      "مرکز رادیولوژی و سونوگرافی مهر آبادان": "#cbdc42",
      "دکتر لیلا رئیسی متخصص سونوگرافی و رادیولوژی شهرکرد": "#8752a3"
    };

    const backgroundColors = labels.map((label) => {
      const color = labelColors[label];
      return color || "#000000";
    });

    const pieData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColors,
        },
      ],
    };


    // const colors = [
    //   "#e38766",
    //   "#6491af",
    //   "#2d5246",
    //   "#E91E63",
    //   "#0E76BC",
    //   "#cbdc42",
    //   "#8752a3",
    //   "#b58298",
    //   "#03595c",
    //   "#545238",
    //   "#6e1f0f"
    // ];

    // // Assign colors to data elements based on index
    // const backgroundColors = labels.map((label, index) => {
    //   return colors[index % colors.length]; // Loop over colors if labels exceed the number of colors
    // });

    // Define a color scale using D3
    // const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // const backgroundColors = labels.map((label, index) => {
    //   return colorScale(index); // Assign color based on index
    // });

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "بررسی درخواست های مراکز",
          padding: {
            top: 0,
            bottom: 20,
          },
          font: {
            size: 15,
            family: "iranyekan",
          },
        },
        legend: {
          position: "bottom",
          labels: {
            font: {
              size: 12,
              family: "iranyekan",
            },
            usePointStyle: true,
          },
          padding: {
            top: 20,
            bottom: 0,
          },
        },
      },
    };

    setChartOptions(options);
    setChartData(pieData);
  }, [labels, data]);

  return <Chart type="pie" data={chartData} options={chartOptions} />;
};

export default PieChartComponent;
