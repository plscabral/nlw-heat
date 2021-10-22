import { useState, useEffect, useContext, createContext, ReactNode, } from 'react';
import { api } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Types
type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthResponse = {
  token: string;
  user: User
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

type AuthProvider = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProvider) {
  const notify = () => toast('Autenticado com sucesso!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
  const [user, setUser] = useState<User | null>(null);
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=c862ead2b2f0807d127b`;

  async function signIn(githuCode: string) {
    const response = await api.post<AuthResponse>('/authenticate', {
      code: githuCode
    });

    const { token, user } = response.data;

    localStorage.setItem('@dowhile:token', token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);

    notify();
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem('@dowhile:token')
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('/profile').then(response => {
        setUser(response.data)
      });
    }
  }, [])

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githuCode] = url.split('?code=');
      window.history.pushState({}, '', urlWithoutCode);

      signIn(githuCode);
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, signInUrl, signOut }} >
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeButton={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          textAlign: 'center', 
          background: 'green', 
          color: 'white',
          fontSize: '16px' 
        }}
      />
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);