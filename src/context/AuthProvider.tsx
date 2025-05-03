import { createContext, useContext, useEffect, useState } from "react";

type AuthData = {
  role: string; 
  token: string; 
};

type AuthProviderProps = {
  children: React.ReactNode;
  storageKey?: string;
};

type AuthProviderState = {
  authData: AuthData | null;
  role: string | null;
  token: string | null;
  login: (data: AuthData) => void;
  logout: () => void;
};

const initialState: AuthProviderState = {
  authData: null,
  role: null,
  token: null,
  login: () => null,
  logout: () => null,
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({
  children,
  storageKey = "auth-data",
  ...props
}: AuthProviderProps) {
  const [authData, setAuthData] = useState<AuthData | null>(
    () => JSON.parse(localStorage.getItem(storageKey) || "null")
  );

  useEffect(() => {
    const storedAuthData = localStorage.getItem(storageKey);
    if (storedAuthData) {
      setAuthData(JSON.parse(storedAuthData));
    }
  }, [storageKey]);

  const login = (data: AuthData) => {
    setAuthData(data);
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem(storageKey);
  };

  const value = {
    authData,
    role: authData?.role || null,
    token: authData?.token || null,
    login,
    logout,
  };

  return (
    <AuthProviderContext.Provider {...props} value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
