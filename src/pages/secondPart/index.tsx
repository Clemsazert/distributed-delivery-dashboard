import React from 'react';

import { Container, HeadPageTitle } from '../../components';
import { BandwidthChart } from './BandwidthChart';
import { AudienceChart } from './AudienceChart';
import { useDashboard } from './useDashboard';

export const SecondPart: React.FC = () => {
  const { bandwidthValues, audienceValues, user, handleLogin } = useDashboard();
  return (
    <Container>
      <HeadPageTitle>Second Part</HeadPageTitle>
      {!user ? (
        <button onClick={handleLogin} type="button">
          Login
        </button>
      ) : (
        <>
          {bandwidthValues && <BandwidthChart dataset={bandwidthValues} />}
          {audienceValues && <AudienceChart dataset={audienceValues} />}
        </>
      )}
    </Container>
  );
};
