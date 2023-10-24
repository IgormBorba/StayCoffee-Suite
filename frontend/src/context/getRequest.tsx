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
  createdat: Date;
  updatedat: Date;
  owner: User;
}

interface DataContextProps {
  Requestdata: Request[];
  Requestloading: boolean;
  RequestFetchData: () => void;
}

interface DataProviderProps {
  children: ReactNode;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const RequestDataProvider: React.FC<DataProviderProps> = ({
  children,
}) => {
  const [Requestdata, setRequestdata] = useState<Request[]>([]);
  const [Requestloading, setRequestLoading] = useState(false);

  const RequestFetchData = async () => {
    try {
      setRequestLoading(true);
      const response = await Api.get('/request'); // Altere a rota conforme necessário
      setRequestdata(response.data);
      setRequestLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setRequestLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{ Requestdata, Requestloading, RequestFetchData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useRequestData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
