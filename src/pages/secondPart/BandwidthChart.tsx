import React, { useMemo } from 'react';
import styled from 'styled-components';

import { BandwidthValues } from '../../types/BackendAnswers';
import { formatBandwidthValue, formatDateLabels, GRAPH_COLORS } from '../../utils/graphFormatting';
import { BaseChart } from '../../components';

const GraphContainer = styled.div`
  width: 1000px;
  height: 300px;
`;

interface ChartTooltipContext {
  dataIndex: number;
  dataset: { label: string };
  label: string;
  parsed: { x: number; y: number };
}

export const BandwidthChart: React.FC<{ dataset: BandwidthValues }> = ({ dataset }) => {
  const labels = useMemo(() => dataset.cdn.map(entry => entry[0]), [dataset]);
  const cdnValues = useMemo(() => dataset.cdn.map(entry => entry[1]), [dataset]);
  const p2pValues = useMemo(() => dataset.p2p.map(entry => entry[1]), [dataset]);
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
  const maxBandwidthCDN = useMemo(
    () => cdnValues.reduce((previous, current) => (previous > current ? previous : current)),
    [cdnValues]
  );
  const maxBandwithStacked = useMemo(
    () =>
      cdnValues.reduce((previous, current, index) =>
        previous > current + p2pValues[index] ? previous : current + p2pValues[index]
      ),
    [p2pValues]
  );
  return (
    <GraphContainer>
      <BaseChart
        id="bandwith"
        type="line"
        width="1000"
        height="300"
        labels={labels}
        datasets={[bandwidthDataset, p2pDataset]}
        options={{
          scales: {
            y: {
              stacked: true,
              ticks: {
                callback: formatBandwidthValue,
                autoSkip: true,
                maxTicksLimit: 4,
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
          elements: { point: { radius: 0, hitRadius: 5 } },
          plugins: {
            title: {
              display: true,
              text: 'CAPACITY OFFLOAD',
              align: 'start',
              font: { size: 18, weight: '200' }
            },
            legend: { display: false },
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
                    content: `Max CDN Contribution: ${formatBandwidthValue(maxBandwidthCDN)} Gbs`,
                    enabled: true,
                    position: 'start',
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
                    content: `Max Throughput: ${formatBandwidthValue(maxBandwithStacked)} Gbs`,
                    enabled: true,
                    position: 'end',
                    backgroundColor: 'rgba(0,0,0,0)',
                    color: GRAPH_COLORS.GREEN,
                    yAdjust: -10
                  }
                }
              }
            },
            tooltip: {
              interaction: { mode: 'index' },
              backgroundColor: '#fff',
              bodyColor: 'rgb(61, 61, 61)',
              footerColor: 'rgb(61, 61, 61)',
              titleColor: '#000',
              callbacks: {
                title: (context: { dataIndex: number; label: string }[]) =>
                  formatDateLabels(context[0].label, 'cccc, LLL d, yyyy h:mm a'),
                footer: (
                  context: { dataIndex: number; label: string; parsed: { x: number; y: number } }[]
                ) => {
                  const total = context.reduce(
                    (previous, current) => previous + current.parsed.y,
                    0
                  );
                  const reduction = context[0].parsed.y / total;
                  return `Total: ${formatBandwidthValue(total)}\nSpike Reduction: ${
                    Math.trunc(reduction * 10000) / 100
                  }%`;
                },
                label: (context: ChartTooltipContext) =>
                  `${context.dataset.label}: ${formatBandwidthValue(context.parsed.y)}`
              }
            }
          }
        }}
      />
    </GraphContainer>
  );
};
