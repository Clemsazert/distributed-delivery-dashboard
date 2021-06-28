import styled from 'styled-components';

export const GraphContainer = styled.div<{ height?: number }>`
  height: ${props => props.height || 300}px;
  margin-bottom: ${props => props.theme.gridUnit * 10}px
`;

export const TimelineContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
