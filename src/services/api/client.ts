import { ApiResponse, ApiError, MockScenario, RequestOptions } from "@/types/api";

export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;
  private activeScenario: MockScenario = 'normal';
  private simulatedLatencyMs: number = 350;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '/api/v1') {
    this.baseUrl = baseUrl;
  }

  public setToken(token: string | null) {
    this.token = token;
  }

  public getToken(): string | null {
    return this.token;
  }

  public setScenario(scenario: MockScenario) {
    this.activeScenario = scenario;
  }

  public getScenario(): MockScenario {
    return this.activeScenario;
  }

  public setLatency(ms: number) {
    this.simulatedLatencyMs = ms;
  }

  /**
   * Simulates network latency and handles edge scenario overrides
   */
  public async simulateNetworkDelay(): Promise<void> {
    if (this.simulatedLatencyMs <= 0) return;
    await new Promise((resolve) => setTimeout(resolve, this.simulatedLatencyMs));
  }

  /**
   * Generic request wrapper with Authorization header injection and error normalization
   */
  public async request<T>(
    endpoint: string,
    options: RequestInit & RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    await this.simulateNetworkDelay();

    // Check scenario error override
    if (this.activeScenario === 'error') {
      const error: ApiError = {
        statusCode: 503,
        code: 'SERVICE_UNAVAILABLE',
        message: 'Unable to connect to Katalysa School Information System. The server is temporarily unresponsive.',
        detail: 'The upstream Django REST Framework service returned HTTP 503 Service Unavailable.',
      };
      throw error;
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token && !options.skipAuth) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    // In a real environment, this invokes fetch(this.baseUrl + endpoint, { ...options, headers })
    // For this client abstraction, we return standard ApiResponse wrapper
    return {
      data: null as unknown as T,
      status: 'success',
      timestamp: new Date().toISOString(),
    };
  }

  public async get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', ...options });
  }

  public async post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  }
}

export const apiClient = new ApiClient();
