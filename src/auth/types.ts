export type AuthState = {
  user: (User & { accessToken: string }) | undefined;
  companies: Company[];
  loading: boolean;
};

export type AuthContextValue = {
  user: User | undefined;
  companies: Company[];
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  checkUserSession?: () => Promise<void>;
};
