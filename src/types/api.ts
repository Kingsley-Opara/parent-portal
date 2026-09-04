export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  code?: string;
  errors?: Record<string, string[]>;
  detail?: string;
}

export type MockScenario = 
  | 'normal' 
  | 'loading' 
  | 'error' 
  | 'empty_children' 
  | 'empty_payments' 
  | 'empty_results';

export interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  skipAuth?: boolean;
}
