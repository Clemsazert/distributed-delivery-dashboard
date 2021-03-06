import { DateTime } from 'luxon';

export const formatBandwidthValue = (value: number): string =>
  `${Math.round(value / 10000) / 100} Gbs`;

export const formatAudienceValue = (value: number): string =>
  `${value} Gbs`;

export const formatDateLabels = (timestamp: number | string, format = 'LLL d, h:mm a'): string =>
  DateTime.fromMillis(Number(timestamp)).toFormat(format);

export  const computeTicksNumber = (labels?: number[]): number => {
    if (labels && labels.length > 0) {
      const start = DateTime.fromMillis(labels[0]);
      const end = DateTime.fromMillis(labels[labels.length - 1]);
      return end.diff(start, 'days').days;
    }
    return 15;
  }

export const GRAPH_COLORS = {
  MAUVE: 'rgb(211, 0, 98)',
  TRANSP_MAUVE: 'rgba(211, 0, 98, 0.25)',
  BLUE: 'rgb(0, 131, 207)',
  TRANSP_BLUE: 'rgba(0, 131, 207, 0.25)',
  GREEN: 'rgb(14, 167, 0)',
  TRANSP_GREEN: 'rgb(14, 167, 0, 0.25)',
  ORANGE: 'rgb(245, 78, 0)'
};
