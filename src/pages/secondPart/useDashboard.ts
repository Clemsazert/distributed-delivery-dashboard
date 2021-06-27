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
  handleLogin: () => void;
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
  const handleLogin = async () => {
    const { session_token: sessionToken } = await authRequest('swagtv', 'bling$bling');
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
    const token = localStorage.getItem('sessionToken');
    if (token) {
      BackendSession.setSessionToken(token);
      fetchUserFromToken(token);
    } else {
      handleLogin();
    }
  }, []);
  useEffect(() => {
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
