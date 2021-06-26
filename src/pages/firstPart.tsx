import React from 'react';
import { DateTime } from 'luxon';
import styled from 'styled-components';

import * as dataset from '../data.json';

import { BaseChart, Container } from '../components';

const HeadPageTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes.big};
`;

const GRAPH_COLORS = {
  MAUVE: 'rgb(211, 0, 98)',
  TRANSP_MAUVE: 'rgba(211, 0, 98, 0.25)',
  BLUE: 'rgb(0, 131, 207)',
  TRANSP_BLUE: 'rgba(0, 131, 207, 0.25)',
  GREEN: 'rgb(14, 167, 0)'
};

export const FirstPart: React.FC = () => {
  const labels = dataset.cdn.map(entry => entry[0]);
  const cdnValues = dataset.cdn.map(entry => entry[1]);
  const p2pValues = dataset.p2p.map(entry => entry[1]);
  const bandwidthDataset = {
    label: 'CDN',
    data: cdnValues,
    labels,
    borderColor: GRAPH_COLORS.MAUVE,
    backgroundColor: GRAPH_COLORS.TRANSP_MAUVE,
    fill: true
  };
  const p2pDataset = {
    label: 'P2P',
    data: p2pValues,
    labels,
    borderColor: GRAPH_COLORS.BLUE,
    backgroundColor: GRAPH_COLORS.TRANSP_BLUE,
    fill: true
  };
  const maxBandwidthCDN = cdnValues.reduce((previous, current) =>
    previous > current ? previous : current
  );
  const maxBandwithStacked = cdnValues.reduce((previous, current, index) =>
    previous > current + p2pValues[index] ? previous : current + p2pValues[index]
  );
  const formatBandwidthValue = (value: number) => `${Math.round(value / 10000) / 100} Gbs`;
  const formatDateLabels = (timestamp: number | string) =>
    DateTime.fromMillis(Number(timestamp)).toFormat('LLL d, h:mm a');
  return (
    <Container>
      <HeadPageTitle>First Part</HeadPageTitle>
      <BaseChart
        id="bandwith"
        type="line"
        labels={labels}
        datasets={[bandwidthDataset, p2pDataset]}
        options={{
          scales: {
            y: {
              stacked: true,
              ticks: {
                callback: formatBandwidthValue,
                autoSkip: true,
                maxTicksLimit: 5,
                maxRotation: 0,
                minRotation: 0
              }
            },
            x: {
              ticks: {
                callback: (index: number) => formatDateLabels(labels[index]),
                autoSkip: true,
                maxTicksLimit: 5,
                maxRotation: 0,
                minRotation: 0
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Bandwidth Usage',
              align: 'start',
              font: { size: 20 }
            },
            legend: { align: 'center', position: 'left' },
            annotation: {
              annotations: {
                line1: {
                  type: 'line',
                  yMin: maxBandwidthCDN,
                  yMax: maxBandwidthCDN,
                  borderColor: GRAPH_COLORS.MAUVE,
                  borderWidth: 3,
                  borderDash: [10, 10],
                  label: {
                    content: `Max CDN Throughput: ${formatBandwidthValue(maxBandwidthCDN)} Gbs`,
                    enabled: true,
                    position: 'end',
                    backgroundColor: 'rgba(0,0,0,0)',
                    color: GRAPH_COLORS.MAUVE,
                    yAdjust: -10
                  }
                },
                line2: {
                  type: 'line',
                  yMin: maxBandwithStacked,
                  yMax: maxBandwithStacked,
                  borderColor: GRAPH_COLORS.GREEN,
                  borderWidth: 3,
                  borderDash: [10, 10],
                  label: {
                    content: `Max Combined Throughput: ${formatBandwidthValue(
                      maxBandwithStacked
                    )} Gbs`,
                    enabled: true,
                    position: 'end',
                    backgroundColor: 'rgba(0,0,0,0)',
                    color: GRAPH_COLORS.GREEN,
                    yAdjust: -10
                  }
                }
              }
            }
          }
        }}
      />
    </Container>
  );
};
