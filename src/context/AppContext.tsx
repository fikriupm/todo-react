import { createContext, useState, type ReactNode } from "react";

export type User = {
  id?: string;
  username?: string;
  email?: string;
  [key: string]: unknown;
};

type AppContextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<User | null>(null);

  const clearUser = () => {
    setUser(null);
  };
  
  const contextValue: AppContextValue = {
    user,
    setUser,
    clearUser,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};