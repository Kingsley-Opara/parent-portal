import { apiClient } from "./client";
import { AuthResponse, JwtTokenPair, LoginCredentials, ParentUser } from "@/types/auth";
import { MOCK_PARENT_USER } from "@/services/mock/mockData";
import { ApiError } from "@/types/api";

export class AuthService {
  /**
   * Authenticates parent via Django REST Framework JWT endpoint (/api/v1/auth/jwt/create/)
   */
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await apiClient.simulateNetworkDelay();

    if (apiClient.getScenario() === 'error') {
      const error: ApiError = {
        statusCode: 401,
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email address or password provided.',
        detail: 'No active account found with the given credentials.',
      };
      throw error;
    }

    // Mock successful authentication with realistic tokens
    const tokens: JwtTokenPair = {
      access: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYXJlbnQtdXNyLTg4MjE5Iiwicm9sZSI6InBhcmVudCIsImV4cCI6MTczOTg3NjQwMH0.mockAccessTokenKatalysa2025",
      refresh: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYXJlbnQtdXNyLTg4MjE5IiwidHlwZSI6InJlZnJlc2giLCJleHAiOjE3NDI0Njg0MDB9.mockRefreshTokenKatalysa2025",
      accessExpiresAt: Date.now() + 1000 * 60 * 30, // 30 minutes
      refreshExpiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    };

    apiClient.setToken(tokens.access);

    return {
      user: {
        ...MOCK_PARENT_USER,
        email: credentials.email || MOCK_PARENT_USER.email,
        lastLogin: new Date().toISOString(),
      },
      tokens,
    };
  }

  /**
   * Refreshes expired access token via DRF endpoint (/api/v1/auth/jwt/refresh/)
   */
  public async refreshToken(refreshToken: string): Promise<JwtTokenPair> {
    await apiClient.simulateNetworkDelay();

    if (!refreshToken) {
      const error: ApiError = {
        statusCode: 401,
        code: 'TOKEN_NOT_PROVIDED',
        message: 'Refresh token was not provided or is invalid.',
      };
      throw error;
    }

    const newTokens: JwtTokenPair = {
      access: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYXJlbnQtdXNyLTg4MjE5Iiwicm9sZSI6InBhcmVudCIsImV4cCI6MTczOTg3OTQwMH0.newMockRefreshedAccessToken2025",
      refresh: refreshToken,
      accessExpiresAt: Date.now() + 1000 * 60 * 30,
      refreshExpiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };

    apiClient.setToken(newTokens.access);
    return newTokens;
  }

  /**
   * Logs out the user and invalidates session
   */
  public async logout(): Promise<void> {
    await apiClient.simulateNetworkDelay();
    apiClient.setToken(null);
  }

  /**
   * Retrieves authenticated parent profile (/api/v1/auth/users/me/)
   */
  public async getCurrentUser(): Promise<ParentUser> {
    await apiClient.simulateNetworkDelay();
    return MOCK_PARENT_USER;
  }
}

export const authService = new AuthService();
