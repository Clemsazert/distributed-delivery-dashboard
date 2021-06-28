import React from 'react';
import { DateTime } from 'luxon';

import { Container, HeadPageTitle } from '../../components';
import { BandwidthChart, AudienceChart, SummaryChart, DateSelector, UserLogin } from './components';
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
          {bandwidthValues && audienceValues ? (
            <div>
              <BandwidthChart dataset={bandwidthValues} />
              <AudienceChart dataset={audienceValues} />
              <TimelineContainer>
                <DateSelector
                  date={startDate}
                  handleChangeDate={handleChangeDate('start')}
                  max={endDate}
                />
                <SummaryChart dataset={bandwidthValues} />
                <DateSelector
                  date={endDate}
                  handleChangeDate={handleChangeDate('end')}
                  min={startDate}
                  max={DateTime.now()}
                />
              </TimelineContainer>
            </div>
          ) : (
            <p>loading ...</p>
          )}
        </>
      )}
    </Container>
  );
};
