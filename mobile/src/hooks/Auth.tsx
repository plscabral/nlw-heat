import React from 'react';
import { createContext, ReactNode, useContext, useState } from 'react';

type User = {
  id: string,
  name: string,
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  isSigning: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isSigning, setIsSigning] = useState(false);

  async function signIn() {

  }

  async function signOut() {

  }

  return (
    <AuthContext.Provider value={{
      user,
      isSigning,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
