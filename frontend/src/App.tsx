import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

type Data = {
  bodyTemperature: number;
  heartRate: number;
  patientId: number;
  createdAt: string;
};

const App: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/v1/records");
      const { data } = await response.data;
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const options = {
    title: {
      text: "Heart Beat"
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["Heart Beat", "Temperature"]
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
      data: data.map((record) => {
        const time = new Date(record.createdAt);
        return time.toLocaleTimeString();
      })
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "Heart Beat",
        type: "line",
        stack: "Total",
        data: data.map((item) => item.heartRate)
      },
      {
        name: "Temperature",
        type: "line",
        stack: "Total",
        data: data.map((item) => item.bodyTemperature)
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
