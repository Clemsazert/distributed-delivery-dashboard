import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { AudienceValues, BandwidthValues } from '../../types/BackendAnswers';
import { User } from '../../types/User';

import { BackendSession } from '../../utils/session';
import {
  authRequest,
  getBandwidthValues,
  getUserInfo,
  getAudienceValues
} from '../../utils/requests';

interface useDashboardSignature {
  bandwidthValues: BandwidthValues | null;
  audienceValues: AudienceValues | null;
  startDate: DateTime;
  endDate: DateTime;
  handleLogin: (identifiant: string, password: string)  => void;
  handleRetrieveData: () => void;
  user: User | null;
  handleChangeDate: (date: 'start' | 'end') => (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const useDashboard = (): useDashboardSignature => {
  const [user, setUser] = useState<User | null>(null);
  const [startDate, setStartDate] = useState(DateTime.now().minus({ days: 14 }));
  const [endDate, setEndDate] = useState(DateTime.now());
  const [bandwidthValues, setBandwidthValues] = useState<BandwidthValues | null>(null);
  const [audienceValues, setaudienceValues] = useState<AudienceValues | null>(null);
  const fetchUserFromToken = async (token: string) => {
    BackendSession.setSessionToken(token);
    const retrievedUser = await getUserInfo();
    setUser(retrievedUser);
  };
  const handleLogin = async (identifiant: string, password: string) => {
    const { session_token: sessionToken } = await authRequest(identifiant, password);
    localStorage.setItem('sessionToken', sessionToken);
    BackendSession.setSessionToken(sessionToken);
    await fetchUserFromToken(sessionToken);
  };
  const handleRetrieveData = async () => {
    const data = await getBandwidthValues(startDate.toMillis(), endDate.toMillis());
    if (data) {
      setBandwidthValues(data);
    }
    const data2 = await getAudienceValues(startDate.toMillis(), endDate.toMillis());
    if (data2) {
      setaudienceValues(data2.audience);
    }
  };
  const handleChangeDate =
    (date: 'start' | 'end') => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (date === 'start') {
        setStartDate(DateTime.fromISO(event.target.value));
      } else {
        setEndDate(DateTime.fromISO(event.target.value));
      }
    };
  useEffect(() => {
    // Try to find a sessionToken in local storage after component is mounted
    const token = localStorage.getItem('sessionToken');
    if (token) {
      BackendSession.setSessionToken(token);
      fetchUserFromToken(token);
    }
  }, []);
  useEffect(() => {
    /* 
    Update the values to display in the charts when:
      - the user is set (to display the charts with the default dates)
      - startDate or endDate changes
    */
    if (user) {
      handleRetrieveData();
    }
  }, [user, startDate, endDate]);
  return {
    bandwidthValues,
    audienceValues,
    startDate,
    endDate,
    handleLogin,
    handleRetrieveData,
    user,
    handleChangeDate
  };
};
