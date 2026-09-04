import { create } from "zustand";
import { ParentUser, JwtTokenPair, LoginCredentials } from "@/types/auth";
import { authService } from "@/services/api/auth.service";
import { MOCK_PARENT_USER } from "@/services/mock/mockData";

interface AuthStoreState {
  user: ParentUser | null;
  tokens: JwtTokenPair | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  user: MOCK_PARENT_USER,
  tokens: {
    access: "mock_jwt_access_token_demo_2025",
    refresh: "mock_jwt_refresh_token_demo_2025",
    accessExpiresAt: Date.now() + 1000 * 60 * 30,
    refreshExpiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
  },
  isAuthenticated: true,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);
      set({
        user: response.user,
        tokens: response.tokens,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      set({
        error: errorObj.message || "Failed to sign in. Please verify your credentials.",
        isLoading: false,
        isAuthenticated: false,
      });
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
    } finally {
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  refreshSession: async () => {
    const currentTokens = get().tokens;
    if (!currentTokens?.refresh) {
      set({ isAuthenticated: false, user: null, tokens: null });
      return false;
    }

    try {
      const newTokens = await authService.refreshToken(currentTokens.refresh);
      set({ tokens: newTokens, isAuthenticated: true });
      return true;
    } catch {
      set({ isAuthenticated: false, user: null, tokens: null });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));
