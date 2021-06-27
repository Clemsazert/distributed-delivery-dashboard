import React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';

import { Container, HeadPageTitle } from '../../components';
import { BandwidthChart, AudienceChart, DateSelector, UserLogin } from './components';
import { useDashboard } from './useDashboard';
import { TimelineContainer } from './Dashboard.styles';

export const SecondPart: React.FC = () => {
  const {
    bandwidthValues,
    audienceValues,
    startDate,
    endDate,
    handleLogin,
    user,
    handleChangeDate
  } = useDashboard();
  return (
    <Container>
      <HeadPageTitle>Second Part</HeadPageTitle>
      {!user ? (
        <UserLogin handleLogin={handleLogin} />
      ) : (
        <>
          {bandwidthValues && <BandwidthChart dataset={bandwidthValues} />}
          {audienceValues && <AudienceChart dataset={audienceValues} />}
          <TimelineContainer>
            <DateSelector date={startDate} handleChangeDate={handleChangeDate('start')} max={endDate} />
            <div style={{ width: '100%', backgroundColor: 'green' }}>Timeline</div>
            <DateSelector date={endDate} handleChangeDate={handleChangeDate('end')} min={startDate} max={DateTime.now()} />
          </TimelineContainer>
        </>
      )}
    </Container>
  );
};
