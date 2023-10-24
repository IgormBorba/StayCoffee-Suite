import { Divider, Space, Table } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { ExpandableConfig } from 'antd/es/table/interface';
import React, { useEffect, useState } from 'react';
import { UserDataProvider, useUserData } from '../../context/getUser';
import SearchCategory from '../SearchCategory';

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
  checkInDate: Date;
  checkOutDate: Date;
  roomNumber: string;
  consumptionValue: number;
  totalValue: number;
  status: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'N° DO CADASTRO',
    dataIndex: 'cadastre',
    render: (text, record) => (
      <>
        <div>{text}</div>
        <div>{record.name}</div>
      </>
    ),
    align: 'center',
  },
  {
    title: 'DADOS',
    dataIndex: 'city',
    render: (text, record) => (
      <>
        <div>Cidade: {text}</div>
        <div>Celular: {record.phone}</div>
      </>
    ),
    align: 'center',
  },
  {
    title: 'DATA',
    dataIndex: 'checkInDate',
    render: (date, record) => (
      <>
        <div>{date.toLocaleDateString()}</div>
        <div>{record.checkOutDate.toLocaleDateString()}</div>
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
    title: 'CONSUMO',
    dataIndex: 'consumptionValue',
    render: (text) => (
      <>
        <p>R$ {text}</p>
      </>
    ),
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
    title: 'SITUAÇÃO',
    dataIndex: 'status',
    render: (text) => (
      <Space
        style={{
          backgroundColor: '#008036',
          color: '#ffffff',
          padding: '7px 25px 5px 25px',
          borderRadius: '5px',
        }}
      >
        <p>{text}</p>
      </Space>
    ),
    align: 'center',
  },
];

const defaultExpandable = {
  expandedRowRender: (record: DataType) => <p>{record.description}</p>,
};

const App: React.FC = () => {
  const { Userdata, Userloading, UserfetchData } = useUserData();

  const loadMoreData = () => {
    if (Userloading) {
      return;
    }
    UserfetchData(); // Usando o método fetchData do novo contexto
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const datas: DataType[] = Userdata
    .filter((user) => user.rooms[0]?.data_entrada)
    .map((user, index) => ({
      key: index.toString(),
      cadastral: user.n_cadastro.toString(),
      name: user.nome,
      city: user.cidade,
      phone: user.celular,
      checkInDate: user.rooms[0]?.data_entrada,
      checkOutDate: user.rooms[0]?.data_saida,
      roomNumber: user.rooms[0]?.n_quarto ?? 'N/A',
      consumptionValue: user.requests.reduce((total, request) => total + request.valor, 0),
      totalValue: user.rooms.reduce((total, room) => total + room.valor, 0),
      status: user.rooms[0]?.situacao ? 'OCUPADO' : 'LIVRE',
      description: user.rooms[0]?.descricao,
    }));

  const formattedDatas: DataType[] = datas.map((dataItem) => ({
    ...dataItem,
    checkInDate: new Date(dataItem.checkInDate),
    checkOutDate: new Date(dataItem.checkOutDate),
  }));

  const [size] = useState<SizeType>('small');
  const [expandable] = useState<ExpandableConfig<DataType> | undefined>(
    defaultExpandable,
  );
  const [showHeader] = useState(true);
  const [hasData] = useState(true);

  const [bottom] = useState<TablePaginationPosition>(TablePaginationPosition.BottomRight);
  const [ellipsis] = useState(false);
  const [xScroll] = useState<string>();

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }

  const tableProps: TableProps<DataType> = {
    size,
    expandable,
    showHeader,
  };

  return (
    <>
      <SearchCategory />
      <Divider />
      <Table
        {...tableProps}
        pagination={{ position: [bottom] }}
        columns={tableColumns}
        dataSource={hasData ? formattedDatas : []}
      />
    </>
  );
};

const AppWithContext: React.FC = () => {
  return (
    <UserDataProvider>
      <App />
    </UserDataProvider>
  );
};

export default AppWithContext;
