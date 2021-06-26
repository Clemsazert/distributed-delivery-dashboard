import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { BandwidthValues } from '../../types/BackendAnswers';
import { User } from '../../types/User';

import { BackendSession } from '../../utils/session';
import { authRequest, getBandwidthValues, getUserInfo } from '../../utils/requests';

interface useDashboardSignature {
  bandwidthValues: BandwidthValues | null;
  startDate: DateTime;
  endDate: DateTime;
  setStartDate: React.Dispatch<React.SetStateAction<DateTime>>;
  setEndDate: React.Dispatch<React.SetStateAction<DateTime>>;
  handleLogin: () => void;
  handleRetrieveData: () => void;
  user: User | null;
}

export const useDashboard = (): useDashboardSignature => {
  const [user, setUser] = useState<User | null>(null);
  const [startDate, setStartDate] = useState(DateTime.now().minus({ days: 14 }));
  const [endDate, setEndDate] = useState(DateTime.now());
  const [bandwidthValues, setBandwidthValues] = useState<BandwidthValues | null>(null);
  const fetchUserFromToken = async (token: string) => {
    BackendSession.setSessionToken(token);
    const retrievedUser = await getUserInfo();
    setUser(retrievedUser); 
  }
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
  };
  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    if (token) {
        BackendSession.setSessionToken(token);
        fetchUserFromToken(token);
    } else {
        handleLogin();
    }
  }, [])
  useEffect(() => {
    if (user) {
      handleRetrieveData();
    }
  }, [user]);
  return {
    bandwidthValues,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handleLogin,
    handleRetrieveData,
    user
  };
};
