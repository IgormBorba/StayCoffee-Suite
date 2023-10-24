import {
  ProDescriptions,
  ProFormSelect,
  StepsForm,
} from '@ant-design/pro-components';
import { DatePicker, Form, Input, Space, TreeSelect, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { RoomsDataProvider, useRoomsData } from '../../context/getRooms';
import { UserDataProvider, useUserData } from '../../context/getUser';
import createMethod from '../../services/create';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface ValuesToSend {
  roomId: number;
  descricao: string;
  valor: number;
  situacao: boolean;
}

interface Client {
  nome: string;
  nCadastro: string;
  cidade: string;
  nCelular: string;
}

// Função para criar dados dos quartos a partir da matriz de roomsData
function createRoomsData(roomsData: any[]) {
  const availableRoomsData = roomsData.filter(room => room.situacao === false);

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


  // Mapeando os dados recebidos para a estrutura desejada
  const clientsData = Userdata.map((client) => ({
    nome: client.nome,
    nCadastro: client.n_cadastro.toString(),
    cidade: client.cidade,
    nCelular: client.celular,
  }));

  // Deriva nomeClientes de clientsData
  const nomeClientes = clientsData.map((client) => ({
    value: client.nome,
    label: client.nome,
  }));

  // Cria um objeto clients para acesso mais fácil
  const clients = clientsData.reduce((obj, client) => {
    obj[client.nome] = client;
    return obj;
  }, {} as { [key: string]: Client });

  // ANCHOR - Calculo de estimativa de valor
  const [dailyRate, setDailyRate] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [/* ignore estimatedValue */, setEstimatedValue] = useState<number>(0);

  // Função para atualizar o valor da estimativa de acordo com os campos relevantes
  const updateEstimatedValue = () => {
    const estimatedValue = dailyRate * numberOfDays;
    setEstimatedValue(estimatedValue);
    // Atualizar o campo de estimativa de valor no formulário
    form.setFieldsValue({ estimativaDeValor: estimatedValue.toFixed(2) });
  };

  // Função para limpar a estimativa de valor
  const clearEstimatedValue = () => {
    setEstimatedValue(0);
    // Limpar o campo de estimativa de valor no formulário
    form.setFieldsValue({ estimativaDeValor: 0 });
  };

  // Função para calcular a estimativa
  const calculateEstimate = () => {
    const estimatedValue = dailyRate * numberOfDays;
    // Utilize o método toLocaleString para formatar o número com vírgula para separar os centavos
    return estimatedValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const onChangeValorDiaria = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    value = value.replace(',', '.');
    const numericValue = parseFloat(value);
    if (Number.isNaN(numericValue)) {
      clearEstimatedValue();
    } else {
      setDailyRate(numericValue);
      updateEstimatedValue();
    }
  };

  // Função para manipular a mudança no seletor de intervalo
  const onChangeRangePicker = (dates: any) => {
    if (dates && dates[0] && dates[1]) {
      const [start, end] = dates;
      const days = end.diff(start, 'days');
      setNumberOfDays(days);
      updateEstimatedValue();
    } else {
      setNumberOfDays(0);
      clearEstimatedValue();
    }
  };

  // NOTE - ProDescriptions
  const [clientData, setClientData] = useState<any | null>(null);

  const onSelectClient = (value: string) => {
    setClientData(clients[value]);
  };

  // NOTE - Select Quarto
  const [/* ignore ValueAutoComplete */, setValueAutoComplete] = useState('');
  const onChangeQuarto = (data: string) => {
    setValueAutoComplete(data);
  };

  const treeData = createRoomsData(Roomsdata);

  const onFinish = async (values: any) => {
    const valuesWithNCadastro = {
      ...values,
      nCadastro: clientData?.nCadastro,
    };

    const formateValues: ValuesToSend = {
      roomId: parseFloat(valuesWithNCadastro.nQuarto),
      descricao: valuesWithNCadastro.anotacao,
      valor: parseFloat(valuesWithNCadastro.valorDiaria),
      situacao: true,
    };

    try {
      if (formateValues) {
        await createMethod(`/user/${valuesWithNCadastro.nCadastro}/rooms`, formateValues);
        message.success('Registrado com sucesso');
        form.resetFields();
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }

    clearEstimatedValue();
    setClientData(null);
    return Promise.resolve(true);
  };

  return (
    <StepsForm onFinish={onFinish}>
      <StepsForm.StepForm
        name="step1"
        title="Dados do Cliente"
        stepProps={{
          description: '',
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '-20px',
        }}
      >
        <Space direction="vertical">
          <Space>
            <ProFormSelect
              name="nome"
              label="Nome"
              allowClear
              showSearch
              placeholder="Selecione o cliente"
              options={nomeClientes}
              rules={[{ required: true, message: 'Campo Obrigatório' }]}
              style={{ width: '300px' }}
              fieldProps={{
                onSelect: onSelectClient,
              }}
            />
          </Space>
          <Space style={{ width: '700px' }}>
            <ProDescriptions dataSource={clientData} layout="vertical">
              <ProDescriptions.Item
                dataIndex="nCadastro"
                label="N° de Cadastro"
              />
              <ProDescriptions.Item dataIndex="cidade" label="Cidade" />
              <ProDescriptions.Item
                dataIndex="nCelular"
                label="N° de Celular"
              />
            </ProDescriptions>
          </Space>
        </Space>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        name="step2"
        title="Período de Estadia"
        stepProps={{
          description: '',
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '-20px',
        }}
      >
        <Space direction="vertical">
          <Space>
            <Form.Item
              name="nQuarto"
              label="N° do Quarto"
              rules={[{ required: true, message: 'Campo Obrigatório' }]}
            >
              <TreeSelect
                showSearch
                style={{ width: '225px' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Selecione o Quarto"
                allowClear
                treeDefaultExpandAll={false}
                onChange={onChangeQuarto}
                treeData={treeData}
              />
            </Form.Item>
            <Form.Item
              name="valorDiaria"
              label="Valor da Diária"
              rules={[{ required: true, message: 'Campo Obrigatório' }]}
            >
              <Input
                prefix="R$"
                style={{ width: '225px', height: '32px' }}
                onChange={onChangeValorDiaria}
                onKeyPress={onlyNumbersAndDecimal}
              />
            </Form.Item>
          </Space>
          <Space>
            <Form.Item
              label="Dias Hospedado"
              name="range-picker"
              rules={[{ required: true, message: 'Campo Obrigatório' }]}
            >
              <RangePicker
                disabled={false} // STUB
                style={{ width: '225px' }}
                onChange={onChangeRangePicker}
                format="DD-MM-YYYY"
              />
            </Form.Item>
            <Form.Item label="Estimativa de Valor">
              <Input // FIXME - Está preservando o dado depois do Submit
                prefix="R$"
                style={{ width: '225px', height: '32px' }}
                value={calculateEstimate()}
                readOnly
              />
            </Form.Item>
          </Space>
        </Space>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        name="step3"
        title="Informações Adicionais"
        stepProps={{
          description: '',
        }}
      >
        <Form.Item name="anotacao" label="Anotação adicional">
          <TextArea
            placeholder="Escreva aqui uma observação caso necessário"
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </Form.Item>
      </StepsForm.StepForm>
    </StepsForm>
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
