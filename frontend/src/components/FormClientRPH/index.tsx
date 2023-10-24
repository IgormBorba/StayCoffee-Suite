import { ProDescriptions, ProFormSelect } from '@ant-design/pro-components';
import { Button, Form, Input, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { RoomsDataProvider, useRoomsData } from '../../context/getRooms';
import createMethod from '../../services/create';

interface ValuesToSend {
  valor: number;
  paymentmethod: string;
  pago: boolean;
}

// Função para manipular apenas números e entrada decimal
const onlyNumbersAndDecimal = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const { key } = event;
  const isNumberOrDecimal = /^[0-9,]$/i.test(key);
  if (!isNumberOrDecimal && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault();
  }
  const currentValue = event.currentTarget.value;
  if (currentValue.includes(',') && key === ',') {
    event.preventDefault();
  }
};

// Função para criar dados dos quartos a partir da matriz de roomsData
function createRoomsData(roomsData: any[]) {
  const availableRoomsData = roomsData.filter((room) => room.owner !== null);

  const sortedRoomsData = availableRoomsData.sort(
    (roomA, roomB) => (+roomA.n_quarto) - (+roomB.n_quarto),
  );

  const groupedRooms = sortedRoomsData.reduce((groups: any, room: any) => {
    const groupIndex = Math.floor(((+room.n_quarto) - 1) / 10);
    if (!groups[groupIndex]) {
      groups[groupIndex] = [];
    }
    groups[groupIndex].push({
      value: room.codigo,
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

const FormClient = () => {
  const [form] = Form.useForm();

  const { Roomsdata, RoomsLoading, RoomsFetchData } = useRoomsData();

  const loadMoreData = () => {
    if (RoomsLoading) {
      return;
    }
    RoomsFetchData();
  };

  useEffect(() => {
    loadMoreData();
  }, []);


  // Mapeando os dados recebidos para a estrutura desejada
  const roomsDataMapped = Roomsdata.map((room) => ({
    codigo: room.codigo,
    nome: room.owner ? room.owner.nome : 'Sem Proprietário',
    n_cadastro: room.owner ? room.owner.n_cadastro : 'Sem Cadastro',
  }));


  const treeData = createRoomsData(Roomsdata);

  const [clientData, setClientData] = useState<any | null>(null);

  const onSelectRoom = (value: string) => {
    const room = roomsDataMapped.find(
      (room) => room.codigo === (+value),
    );
    const ownerId = room?.n_cadastro;
    const ownerName = room ? room.nome : 'Sem Proprietário';

    setClientData({ nomeClienteHotel: ownerName, idClienteHotel: ownerId });
  };

  const onFinish = async (values: any) => {
    const valuesWithNomeCliente = {
      ...values,
      nomeClienteHotel: clientData?.nomeClienteHotel,
      idClienteHotel: clientData?.idClienteHotel, // Incluir o ID do proprietário
    };

    const formateValues: ValuesToSend = {
      valor: parseFloat(valuesWithNomeCliente.valorTotal),
      paymentmethod: 'pix',
      pago: false,
    };

    try {
      if (formateValues) {
        await createMethod(
          `/user/${valuesWithNomeCliente.idClienteHotel}/requests`,
          formateValues,
        );
        message.success('Registrado com sucesso');
        form.resetFields();
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }

    setClientData(null);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal">
      <Space direction="horizontal" style={{ paddingLeft: '30px' }}>
        <ProFormSelect
          name="nQuarto"
          label="N° do Quarto"
          rules={[{ required: true, message: 'Campo Obrigatório' }]}
          showSearch
          style={{ width: '200px' }}
          placeholder="Selecione o Quarto"
          allowClear
          options={treeData}
          fieldProps={{ onSelect: onSelectRoom }}
        />
        <ProDescriptions dataSource={clientData} layout="vertical">
          <ProDescriptions.Item
            dataIndex="nomeClienteHotel"
            label="Nome do Cliente"
            style={{ paddingLeft: '150px' }}
          />
        </ProDescriptions>
      </Space>
      <Space style={{ paddingLeft: '47px' }}>
        <Form.Item
          name="valorTotal"
          label="Valor Total"
          rules={[{ required: true, message: 'Campo Obrigatório' }]}
        >
          <Input
            placeholder="Insira o valor"
            maxLength={12}
            allowClear
            style={{ width: '182px' }}
            onKeyPress={onlyNumbersAndDecimal}
          />
        </Form.Item>
      </Space>
      <Form.Item
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '-35px',
        }}
      >
        <Button type="primary" htmlType="submit">
          Registrar
        </Button>
      </Form.Item>
    </Form>
  );
};

const AppWithContext: React.FC = () => {
  return (
    <RoomsDataProvider>
      <FormClient />
    </RoomsDataProvider>
  );
};

export default AppWithContext;
