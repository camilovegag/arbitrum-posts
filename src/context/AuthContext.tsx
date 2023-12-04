"use client";

import { ReactNode, createContext, useState } from "react";

type User = {
  address: `0x${string}` | undefined;
  likes?: number;
};

type AuthContextProps = {
  authUser: null | User;
  setAuthUser: React.Dispatch<React.SetStateAction<null | User>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextProps>({
  authUser: null,
  setAuthUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<null | User>(null);
  const [isLogged, setIsLogged] = useState(false);

  const value = {
    authUser,
    setAuthUser,
    isLogged,
    setIsLogged,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
