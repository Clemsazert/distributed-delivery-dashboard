import React from 'react';

import { AudienceValues } from '../../../types/BackendAnswers';
import { formatAudienceValue, formatDateLabels, computeTicksNumber, GRAPH_COLORS } from '../../../utils/graphFormating';

import { BaseChart } from '../../../components';
import { GraphContainer } from '../Dashboard.styles';

export const AudienceChart: React.FC<{ dataset: AudienceValues }> = ({ dataset }) => {
  const labels = dataset.map(entry => entry[0]);
  const audienceDataset = {
    label: 'Audience',
    data: dataset.map(entry => entry[1]),
    borderColor: GRAPH_COLORS.ORANGE
  };
  return (
    <GraphContainer>
      <BaseChart
        id="audience"
        type="line"
        labels={labels}
        datasets={[audienceDataset]}
        options={{
          scales: {
            y: {
              stacked: true,
              ticks: {
                callback: formatAudienceValue,
                autoSkip: true,
                maxTicksLimit: 3,
                maxRotation: 0,
                minRotation: 0
              }
            },
            x: {
              ticks: {
                callback: (index: number) => formatDateLabels(labels[index], 'LLL d'),
                autoSkip: true,
                maxTicksLimit: computeTicksNumber(labels),
                maxRotation: 0,
                minRotation: 0
              }
            }
          },
          elements: { point: { radius: 0 } },
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'CONCURRENT VIEWERS',
              align: 'start',
              font: { size: 18, weight: '200' }
            },
            legend: { display: false },
            tooltip: { enabled: false }
          }
        }}
      />
    </GraphContainer>
  );
};
