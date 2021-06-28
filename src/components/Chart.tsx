import React from 'react';
import { Chart, ChartDataset, ChartTypeRegistry, registerables } from 'chart.js';
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

  const updateChart = (newDatasets: ChartDataset[], newLabels: (string | number)[], newOptions: any) => {
    if (myChart.current) {
      const { current } = myChart;
      newDatasets.forEach((dataset, index) => {
        if (current.data.datasets[index] !== dataset) {
          if (current.data.datasets[index]) {
            current.data.datasets[index].data = dataset.data;
            current.data.datasets[index].label = dataset.label;
          } else {
            current.data.datasets[index] = { ...dataset };
          }
        }
      });
      if (newLabels !== current.data.labels) {
        current.data.labels = newLabels;
      }
      if (newOptions !== current.options) {
        current.options = { ...newOptions };
      }
      current.update();
    }
  };

  React.useEffect(() => {
    myChart.current = createChart();
  }, []);

  React.useEffect(() => {
    updateChart(datasets, labels, options);
  }, [datasets, labels]);


  return <canvas id={id} ref={ref} height={height} width={width} />;
};
