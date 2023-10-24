import { useEffect, useState, createContext, ReactNode } from 'react';
import { Api } from '../services/api';
// import { Navigate } from 'react-router-dom';

interface User {
  id: number;
  email: string;
  token: string;
  // ... other user properties
}

interface AuthContextProps {
  user: User | null;
  signed: boolean;
  SignIn: ({ email, password }: { email: string; password: string }) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  signed: false,
  SignIn: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadingStoreData = async () => {
      const storageUser = localStorage.getItem('@Auth:user');
      const storageToken = localStorage.getItem('@Auth:token');

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }
    };
    loadingStoreData();
  }, []);

  const SignIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await Api.post('/api/auth/login', {
        email,
        password,
      });

      if (response.data.error) {
        alert(response.data.error);
      } else {
        setUser(response.data.user);
        Api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.token}`;
        localStorage.setItem('@Auth:token', response.data.token);
        localStorage.setItem('@Auth:user', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  // const signOut = () => {
  //   localStorage.clear();
  //   setUser(null);
  //   return <Navigate to="/login" />;
  // };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, SignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// REVIEW - ANALISAR O CODIGO ACIMA QUE ESTÁ EM LOCAL STORAGE, ABAIXO ESTÁ EM SESSION STORAGE
// // ...

// useEffect(() => {
//   const loadingStoreData = async () => {
//     const storageUser = sessionStorage.getItem('@Auth:user');
//     const storageToken = sessionStorage.getItem('@Auth:token');

//     if (storageUser && storageToken) {
//       setUser(JSON.parse(storageUser));
//     }
//   };
//   loadingStoreData();
// }, []);

// // ...

// const SignIn = async ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) => {
//   // ...
//   sessionStorage.setItem('@Auth:token', response.data.token);
//   sessionStorage.setItem('@Auth:user', JSON.stringify(response.data));
//   // ...
// };

// const signOut = () => {
//   sessionStorage.clear();
//   setUser(null);
//   return <Navigate to="/login" />;
// };

// // ...
