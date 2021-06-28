import styled from 'styled-components';

export const GraphContainer = styled.div<{ height?: number }>`
  height: ${props => props.height || 250}px;
  margin-bottom: ${props => props.theme.gridUnit * 2}px;
  width: 100%;
`;

export const TimelineContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
