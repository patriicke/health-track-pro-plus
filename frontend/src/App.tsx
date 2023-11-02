import React from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";

const App: React.FC = () => {
  const options: EChartsOption = {
    title: {
      text: "Heart Beat"
    },
    tooltip: {
      trizgger: "axis"
    },
    legend: {
      data: ["Rate"]
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "Rate",
        type: "line",
        stack: "Total",
        data: [86, 70, 92, 87, 92, 78, 90]
      }
    ]
  };

  return (
    <div>
      <ReactECharts option={options} />
    </div>
  );
};

export default App;
