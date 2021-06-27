import { BackendSession } from './session';
import { BandwidthValues, AudienceValues } from '../types/BackendAnswers';
import { User } from '../types/User';

export const authRequest = (
  identifiant: string,
  password: string
  // eslint-disable-next-line camelcase
): Promise<{ session_token: string }> =>
  BackendSession.post('/auth', { data: { identifiant, password } });

export const getUserInfo = (): Promise<User> => BackendSession.post('/myinfo');

export const getBandwidthValues = (
  from: number,
  to: number,
  aggregate?: string
): Promise<BandwidthValues> => BackendSession.post('/bandwidth', { data: { from, to, aggregate } });

export const getAudienceValues = (
  from: number,
  to: number,
  aggregate?: string
): Promise<{ audience: AudienceValues }> =>
  BackendSession.post('/audience', { data: { from, to, aggregate } });
