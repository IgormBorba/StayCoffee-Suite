import { createContext, ReactNode, useContext, useState } from 'react';
import { Api } from '../services/api';

interface User {
  id: number;
  n_cadastro: number;
  nome: string;
  cidade: string;
  celular: string;
  createdat: Date;
  updatedat: Date;
  rooms: Room[];
  requests: Request[];
}

interface Room {
  id: number;
  codigo: number;
  n_quarto: string;
  valor: number;
  situacao: boolean;
  descricao: string;
  data_entrada: Date;
  data_saida: Date;
  createdat: Date;
  updatedat: Date;
  owner: User;
}

interface Request {
  id: number;
  codigo: number;
  valor: number;
  paymentmethod: string;
  pago: boolean;
  createdat: Date;
  updatedat: Date;
  owner: User;
}

interface DataContextProps {
  Userdata: User[];
  Userloading: boolean;
  UserfetchData: () => void;
}

interface DataProviderProps {
  children: ReactNode;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const UserDataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [Userdata, setUserData] = useState<User[]>([]);
  const [Userloading, setUserloading] = useState(false);

  const UserfetchData = async () => {
    try {
      setUserloading(true);
      const response = await Api.get('/user'); // Altere a rota conforme necessário
      setUserData(response.data);
      setUserloading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setUserloading(false);
    }
  };

  return (
    <DataContext.Provider value={{ Userdata, Userloading, UserfetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('userData must be used within a DataProvider');
  }
  return context;
};
