export interface User {
  clientid: number;
  company: string
  fname: string;
  website: string;
  timestamp: number;
  description: string;
  apitoken: string;
}

export interface LoginInfo {
  identifiant: string;
  password: string;
}