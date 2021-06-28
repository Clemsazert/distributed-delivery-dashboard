import React from 'react';
import styled from 'styled-components';

import { BandwidthValues } from '../../../types/BackendAnswers';
import {  GRAPH_COLORS } from '../../../utils/graphFormating';
import { BaseChart } from '../../../components';
import { GraphContainer } from '../Dashboard.styles';

const SummaryGraphContainer = styled(GraphContainer)`
  background-color: ${props => props.theme.colors.lightGreen};
  margin-bottom: 0px;
`;

export const SummaryChart: React.FC<{ dataset: BandwidthValues }> = ({ dataset }) => {
  const labels = dataset.cdn.map(entry => entry[0]);
  const summaryValues = dataset.cdn.map((entry, index) => entry[1] + dataset.p2p[index][1]);
  const cdnDataset = {
    label: 'Summary',
    data: summaryValues,
    labels,
    borderColor: GRAPH_COLORS.GREEN,
    backgroundColor: GRAPH_COLORS.GREEN,
    fill: true
  };
  return (
    <SummaryGraphContainer height={50}>
      <BaseChart
        id="bandwith"
        type="line"
        labels={labels}
        datasets={[cdnDataset]}
        options={{
          scales: {
            y: { display: false },
            x: { display: false }
          },
          elements: { point: { radius: 0 } },
          maintainAspectRatio: false,
          plugins: { legend: { display: false } }
        }}
      />
    </SummaryGraphContainer>
  );
};
