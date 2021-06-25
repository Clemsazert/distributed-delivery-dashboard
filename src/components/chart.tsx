import React from "react";
import { Chart, ChartDataset, ChartTypeRegistry, registerables } from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';

interface ChartProps {
  id: string;
  height?: string;
  width?: string;
  type: keyof ChartTypeRegistry;
  options?: any;
  labels: (string | number)[];
  datasets: ChartDataset[];
}

const colors = [
  "#3366CC",
  "#FF9900",
  "#109618",
  "#FBFF58",
  "#DC3912",
  "#0099C6",
  "#990099",
  "#DD4477"
];

Chart.register(...registerables, annotationPlugin);

export const BaseChart: React.FunctionComponent<ChartProps> = ({
  id,
  type,
  height = 200,
  width = 400,
  options,
  labels,
  datasets
}) => {
  const ref = React.useRef<any>(null);
  const myChart = React.useRef<Chart | null>(null);
  const createChart = () => {
    const chart = new Chart(ref.current, {
      type,
      data: {
        labels,
        datasets
      },
      options
    });
    return chart;
  };

  React.useEffect(() => {
    myChart.current = createChart();
  }, []);

  return <canvas id={id} ref={ref} height={height} width={width} />;
};
