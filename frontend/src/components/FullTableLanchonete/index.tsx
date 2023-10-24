import { Divider, Space, Table } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { RequestDataProvider, useRequestData } from '../../context/getRequest';
import { UserDataProvider, useUserData } from '../../context/getUser';
import SearchCategoryLanchonete from '../SearchCategoryLanchonete';

enum TablePaginationPosition {
  TopLeft = 'topLeft',
  TopCenter = 'topCenter',
  TopRight = 'topRight',
  BottomLeft = 'bottomLeft',
  BottomCenter = 'bottomCenter',
  BottomRight = 'bottomRight',
}

interface DataType {
  key: React.Key;
  cadastral: string;
  name: string;
  city: string;
  phone: string;
  data: Date | null; // Allow null here
  roomNumber: string;
  totalValue: number;
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'CÓDIGO',
    dataIndex: 'codigo',
    render: (text, record) => (
      <>
        <div>{text}</div>
        <div>{record.name}</div>
      </>
    ),
    align: 'center',
  },
  {
    title: 'DATA',
    dataIndex: 'data',
    render: (date) => (
      <>
        <div>{date instanceof Date ? date.toLocaleDateString() : 'Vazio'}</div>
      </>
    ),
    align: 'center',
  },
  {
    title: 'N° DO QUARTO',
    dataIndex: 'roomNumber',
    align: 'center',
  },
  {
    title: 'VALOR',
    dataIndex: 'totalValue',
    render: (text) => (
      <>
        <p>R$ {text}</p>
      </>
    ),
    align: 'center',
  },
  {
    title: 'PAGAMENTO',
    dataIndex: 'pagamento',
    render: (text) => (
      <>
        <p>{text}</p>
      </>
    ),
    align: 'center',
  },
];

const App: React.FC = () => {
  const { Userdata, Userloading, UserfetchData } = useUserData();
  const { Requestdata, Requestloading, RequestFetchData } = useRequestData();

  const loadMoreData = () => {
    if (Userloading || Requestloading) {
      return;
    }
    RequestFetchData();
    UserfetchData();
  };

  useEffect(() => {
    loadMoreData();
  }, []);


  // Mapear Userdata
  const userDataMapped: DataType[] = Userdata.filter(
    (user) => user.requests[0]?.paymentmethod,
  ).map((user, index) => ({
    key: index.toString(),
    cadastral: user.n_cadastro?.toString() ?? 'Vazio',
    name: user.nome ?? 'Vazio',
    city: user.cidade ?? 'Vazio',
    phone: user.celular ?? 'Vazio',
    data: user.requests[0]?.createdat
      ? new Date(user.requests[0]?.createdat)
      : null,
    roomNumber: user.rooms[0]?.n_quarto ?? 'Nenhum',
    totalValue: user.requests.reduce(
      (total, request) => total + request.valor,
      0,
    ),
    pagamento: user.requests[0]?.paymentmethod ?? 'Não especificado',
    status:
      user.requests.reduce((total, request) => total + request.valor, 0) === 0
        ? 'PAGO'
        : 'PENDENTE',
  }));

  // Mapear os pedidos que não têm um proprietário associado e têm um método de pagamento definido
  const requestWithoutOwner: DataType[] = Requestdata.filter(
    (request) => !request.owner && request.paymentmethod,
  ).map((request, index) => ({
    key: (index + userDataMapped.length).toString(),
    cadastral: request.codigo?.toString() ?? 'Vazio',
    name: 'Vazio',
    city: 'Vazio',
    phone: 'Vazio',
    data: request.createdat ? new Date(request.createdat) : null,
    roomNumber: 'Nenhum',
    totalValue: request.valor,
    pagamento: request.paymentmethod ?? 'Não especificado',
    status: request.valor === 0 ? 'PAGO' : 'PENDENTE',
  }));

  // Mesclar as listas de dados do usuário e pedidos sem proprietário
  const combinedData = [...userDataMapped, ...requestWithoutOwner];

  // Ordenar por data
  const sortedData = combinedData.sort((firstRequest, secondRequest) => {
    const dateA = firstRequest.data ? new Date(firstRequest.data) : new Date(0); // Fallback to epoch time if null
    const dateB = secondRequest.data ? new Date(secondRequest.data) : new Date(0);
    return dateB.getTime() - dateA.getTime(); // Mais recente no topo
  });

  const [size] = useState<SizeType>('small');
  const [showHeader] = useState(true);
  const [hasData] = useState(true);
  const [bottom] = useState<TablePaginationPosition>(
    TablePaginationPosition.BottomRight,
  );
  const [ellipsis] = useState(false);
  const [xScroll] = useState<string>();

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }

  const tableProps: TableProps<DataType> = {
    size,
    showHeader,
  };

  const statusStylePaid = {
    backgroundColor: '#008036',
    color: '#ffffff',
    padding: '7px 25px 5px 25px',
    borderRadius: '5px',
  };

  const statusStylePending = {
    backgroundColor: '#D2C77D',
    color: '#000000',
    padding: '7px 25px 5px 25px',
    borderRadius: '5px',
  };

  return (
    <>
      <SearchCategoryLanchonete />
      <Divider />
      <Table
        {...tableProps}
        pagination={{ position: [bottom] }}
        columns={[
          ...tableColumns,
          {
            title: 'SITUAÇÃO',
            dataIndex: 'status',
            render: (text) => (
              <Space
                style={text === 'PAGO' ? statusStylePaid : statusStylePending}
              >
                <p>{text}</p>
              </Space>
            ),
            align: 'center',
          },
        ]}
        dataSource={hasData ? sortedData : []}
      />
    </>
  );
};

const AppWithContext: React.FC = () => {
  return (
    <RequestDataProvider>
      <UserDataProvider>
        <App />
      </UserDataProvider>
    </RequestDataProvider>
  );
};

export default AppWithContext;
