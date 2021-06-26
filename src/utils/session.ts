import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface BodyRequestConfig {
  data?: Record<string, unknown>;
  config?: AxiosRequestConfig;
}

class Session {
  private api: AxiosInstance;

  private sessionToken?: string;

  constructor(url: string) {
    this.api = axios.create({
      baseURL: url,
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json'
    });
  }

  public setSessionToken(token: string): void {
    this.sessionToken = token;
  }

  public async post<T>(
    url: string,
    { data, config }: BodyRequestConfig = { config: {} }
  ): Promise<T> {
    const res = await this.api.post(url, { ...data, session_token: this.sessionToken }, config);
    return res.data as T;
  }
}

export const BackendSession = ((): Session => new Session(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'))();
