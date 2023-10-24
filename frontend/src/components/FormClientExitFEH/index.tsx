import { ProDescriptions, ProFormSelect } from '@ant-design/pro-components';
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Table,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { RoomsDataProvider, useRoomsData } from '../../context/getRooms';
import { UserDataProvider, useUserData } from '../../context/getUser';
import updateMethod from '../../services/patch';

// Função para criar dados dos quartos a partir da matriz de roomsData
function createRoomsData(roomsData: any[]) {
  const availableRoomsData = roomsData.filter((room) => room.situacao === true);

  const sortedRoomsData = availableRoomsData.sort(
    (roomA, roomB) => +roomA.n_quarto - +roomB.n_quarto,
  );

  const groupedRooms = sortedRoomsData.reduce((groups: any, room: any) => {
    const groupIndex = Math.floor((+room.n_quarto - 1) / 10);
    if (!groups[groupIndex]) {
      groups[groupIndex] = [];
    }
    groups[groupIndex].push({
      value: room.n_quarto,
      label: `Quarto ${room.n_quarto}`,
    });
    return groups;
  }, []);

  return groupedRooms.map((group: any, index: number) => ({
    value: `escolha um quarto do grupo ${index + 1}`,
    title: (
      <b style={{ color: '#000000' }}>
        {index * 10 + 1}-{index * 10 + 10}
      </b>
    ),
    disabled: true,
    children: group,
  }));
}

// NOTE - Table
interface DataType {
  key: React.Key;
  data: Date;
  consumo: number;
  situacao: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'DATA',
    dataIndex: 'data',
    align: 'center',
    render: (date) => (
      <>
        <div>{date.toLocaleDateString()}</div>
        <div>{date.toLocaleTimeString()}</div>
      </>
    ),
  },
  {
    title: 'CONSUMO',
    dataIndex: 'consumo',
    align: 'center',
    render: (text) => <>R$ {text}</>,
  },
  {
    title: 'SITUAÇÃO',
    dataIndex: 'situacao',
    align: 'center',
  },
];

const createDataTypeArray = (userData: {
  clienteNome: string;
  clienteID: number;
  quartos: any[];
  pedidos: any[];
}): DataType[] => {
  const result: DataType[] = [];

  userData.pedidos.forEach((pedido: any, index: number) => {
    result.push({
      key: `${index}`,
      data: new Date(pedido.dataPedido),
      consumo: pedido.valor,
      situacao: pedido.pago ? 'PAGO' : 'PENDENTE',
    });
  });

  return result;
};

const updateQuartosAndPedidos = async (data: any) => {
  // Atualizar a situação de cada quarto para false
  for (const quarto of data.quartos) {
    const updatedQuarto = { ...quarto, situacao: false };
    const route = `/rooms/${quarto.codigo}`; // Rota para atualizar o quarto
    try {
      await updateMethod(route, updatedQuarto);
      console.log(`Quarto ${quarto.codigo} atualizado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao atualizar o quarto ${quarto.codigo}:`, error);
    }
  }

  // Atualizar o pagamento de cada pedido para true
  for (const pedido of data.pedidos) {
    const updatedPedido = { ...pedido, pago: true };
    const route = `/request/${pedido.codigo}`; // Rota para atualizar o pedido
    try {
      await updateMethod(route, updatedPedido);
      console.log(`Pedido ${pedido.codigo} atualizado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao atualizar o pedido ${pedido.codigo}:`, error);
    }
  }
};

const FormClient = () => {
  const [form] = Form.useForm();

  const { Userdata, Userloading, UserfetchData } = useUserData();
  const { Roomsdata, RoomsLoading, RoomsFetchData } = useRoomsData();

  const loadMoreData = () => {
    if (Userloading || RoomsLoading) {
      return;
    }
    RoomsFetchData();
    UserfetchData();
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    const initialData: DataType[] = [];
    for (let index = 0; index < 0; index++) {
      initialData.push({
        key: index,
        data: new Date(),
        consumo: 0,
        situacao: 'PENDENTE',
      });
    }

    setDataState(initialData);
  }, []);

  // Filtrar por somente usuários que tem reserva
  const userDataMapped = Userdata.filter(
    (user) => user.rooms && user.rooms.length > 0,
  ).map((user, index) => ({
    key: index.toString(),
    clienteNome: user.nome,
    clienteID: user.id,
    quartos: user.rooms.map((room) => ({
      codigo: room.codigo,
      nQuarto: room.n_quarto,
      situacao: room.situacao,
      valorDiaria: room.valor,
      diaEntrada: room.data_entrada,
      diaSaida: room.data_saida,
    })),
    pedidos: user.requests.map((request) => ({
      codigo: request.codigo,
      valor: request.valor,
      pagamentoMetodo: request.paymentmethod,
      pago: request.pago,
      dataPedido: request.createdat,
    })),
  }));

  // NOTE - Select
  const onSearchSelect = (value: string) => {
    console.log(`Search ${value}`);
  };

  const [dataState, setDataState] = useState<DataType[]>([]);
  const [dateFind, setdateFind] = useState<UserType | null>(null);

  useEffect(() => {
    if (dateFind) {
      console.log(dateFind);
    }
  }, [dateFind]);

  const initialClientData = {
    nCadastro: '',
    valorDiaria: 0,
    dataHospedagem: '',
  };

  const [clientData, setClientData] = useState<any | null>(initialClientData);

  const treeData = createRoomsData(Roomsdata);

  type UserType = {
    key: string;
    clienteNome: string;
    clienteID: number;
    quartos: {
      codigo: number;
      nQuarto: string;
      situacao: boolean;
      valorDiaria: number;
      diaEntrada: Date;
      diaSaida: Date;
    }[];
    pedidos: {
      codigo: number;
      valor: number;
      pagamentoMetodo: string;
      pago: boolean;
      dataPedido: Date;
    }[];
  };

  const onSelectRoom = (value: string) => {
    const userFind: UserType | undefined = userDataMapped.find((user) =>
      user.quartos.some((quarto) => quarto.nQuarto === value),
    );

    const matchingQuarto = userFind?.quartos.find(
      (quarto) => quarto.nQuarto === value,
    );

    if (userFind && matchingQuarto) {
      setClientData({
        nCadastro: `${userFind.clienteID} - ${userFind.clienteNome}`,
        valorDiaria: matchingQuarto.valorDiaria,
        dataHospedagem: [
          new Date(matchingQuarto.diaEntrada),
          new Date(matchingQuarto.diaSaida),
        ],
      });
    }
    if (userFind) {
      const newData = createDataTypeArray(userFind);
      setdateFind(userFind);
      setDataState(newData);
    }
  };

  // REVIEW - Dados captados do Form
  const onFinish = async (values: any) => {
    const registroClienteHotelLanchonete = {
      ...values,
    };

    try {
      updateQuartosAndPedidos(dateFind);
    } catch (error) {
      console.log('Erro ao utilizar nova função erro: ', dateFind);
    }

    console.log(registroClienteHotelLanchonete);
    message.success('Registrado com sucesso');
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Divider>
        <h1>Ficha de saída do Hotel</h1>
      </Divider>
      <Space style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        <div style={{ display: 'flex', marginTop: '-15px', gap: '10px' }}>
          <ProFormSelect
            name="nQuarto"
            label="N° do Quarto"
            rules={[{ required: true, message: 'Campo Obrigatório' }]}
            showSearch
            style={{ width: '225px' }}
            placeholder="Selecione o Quarto"
            allowClear
            options={treeData}
            fieldProps={{ onSelect: onSelectRoom }}
          />
          <Form.Item
            name="valorTotal"
            label="Valor Total"
            rules={[{ required: true, message: 'Campo Obrigatório' }]}
          >
            <Input prefix="R$" />
          </Form.Item>
        </div>
        <div>
          <ProDescriptions
            dataSource={clientData}
            layout="vertical"
            style={{ paddingLeft: '100px' }}
          >
            <ProDescriptions.Item dataIndex="nCadastro" label="Cliente" />
            <ProDescriptions.Item
              dataIndex="valorDiaria"
              label="Valor da Diária"
              render={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`}
            />
            <ProDescriptions.Item
              dataIndex="dataHospedagem"
              label="Dias Hospedado"
              fieldProps={{
                format: 'DD/MM/YYYY',
              }}
              valueType="dateRange"
            />
          </ProDescriptions>
        </div>
        <div style={{ marginTop: '-35px', padding: '0px' }}>
          <Divider>Histórico de consumo na Lanchonete</Divider>
          <Table
            columns={columns}
            dataSource={dataState}
            pagination={{ pageSize: 5, position: ['bottomCenter'] }}
            // eslint-disable-next-line id-length
            scroll={{ y: 240 }}
            style={{ width: '400px', padding: '0px 20px 5px 20px' }}
            size="small"
          />
        </div>
      </Space>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '5px',
          paddingRight: '15px',
        }}
      >
        <Form.Item
          name="formaPagamento"
          rules={[{ required: true, message: 'Campo Obrigatório' }]}
        >
          <Select
            className="custom-input"
            showSearch
            style={{ width: '200px' }}
            placeholder="Forma de pagamento"
            optionFilterProp="children"
            onSearch={onSearchSelect}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={[
              {
                value: 'CreditCard',
                label: 'Cartão de Crédito',
              },
              {
                value: 'Money',
                label: 'Dinheiro',
              },
              {
                value: 'Debit',
                label: 'Débito',
              },
              {
                value: 'pix',
                label: 'Pix',
              },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Registrar
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

const AppWithContext: React.FC = () => {
  return (
    <RoomsDataProvider>
      <UserDataProvider>
        <FormClient />
      </UserDataProvider>
    </RoomsDataProvider>
  );
};

export default AppWithContext;
