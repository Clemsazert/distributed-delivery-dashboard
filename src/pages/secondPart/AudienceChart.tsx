import React from 'react';
import styled from 'styled-components';

import { AudienceValues } from '../../types/BackendAnswers';
import { formatAudienceValue, formatDateLabels, GRAPH_COLORS } from '../../utils/graphFormatting';

import { BaseChart } from '../../components';

const GraphContainer = styled.div`
  width: 1000px;
  height: 200px;
`;

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
        width="1000"
        height="200"
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
                maxTicksLimit: 15,
                maxRotation: 0,
                minRotation: 0
              }
            }
          },
          elements: { point: { radius: 0 } },
          plugins: {
            title: {
              display: true,
              text: 'Concurrent Viewers',
              align: 'start',
              font: { size: 18, weight: '200' }
            },
            legend: { display: false }
          }
        }}
      />
    </GraphContainer>
  );
};
