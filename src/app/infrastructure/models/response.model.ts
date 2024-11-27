import { Register } from './auth.model';

export interface UserResponse extends Register {
  token: string;
}
