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
  Roomsdata: Room[];
  RoomsLoading: boolean;
  RoomsFetchData: () => void;
}

interface DataProviderProps {
  children: ReactNode;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const RoomsDataProvider: React.FC<DataProviderProps> = ({
  children,
}) => {
  const [Roomsdata, setRoomsData] = useState<Room[]>([]);
  const [RoomsLoading, setLoading] = useState(false);

  const RoomsFetchData = async () => {
    try {
      setLoading(true);
      const response = await Api.get('/rooms'); // Altere a rota conforme necessário
      setRoomsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{ Roomsdata, RoomsLoading, RoomsFetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useRoomsData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
