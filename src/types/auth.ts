export interface ParentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  phone: string;
  role: 'parent';
  avatarUrl: string;
  associatedChildrenIds: string[];
  lastLogin?: string;
}

export interface JwtTokenPair {
  access: string;
  refresh: string;
  accessExpiresAt: number; // Unix timestamp in ms
  refreshExpiresAt: number; // Unix timestamp in ms
}

export interface LoginCredentials {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: ParentUser;
  tokens: JwtTokenPair;
}
