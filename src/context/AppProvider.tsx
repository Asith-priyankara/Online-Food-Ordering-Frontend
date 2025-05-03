import { createContext, useContext } from "react";
import { AuthProvider } from "./AuthProvider";
import { ThemeProvider } from "./ThemeProvider";
import { UserProvider } from "./UserProvider";

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProviderContext = createContext(undefined);

export function AppProvider({ children, ...props }: AppProviderProps) {
  return (
    <AuthProvider>
      <UserProvider>
      <ThemeProvider {...props}>{children}</ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppProviderContext);

  if (context === undefined)
    throw new Error("useAppContext must be used within an AppProvider");

  return context;
};
