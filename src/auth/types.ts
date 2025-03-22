export type AuthState = {
  user: (User & { accessToken: string }) | undefined;
  companies: Company[];
  company: Company | undefined;
  loading: boolean;
};

export type AuthContextValue = {
  user: User | undefined;
  companies: Company[];
  company: Company | undefined;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  checkUserSession?: () => Promise<void>;
  setCompany: (company: Company) => void;
};
