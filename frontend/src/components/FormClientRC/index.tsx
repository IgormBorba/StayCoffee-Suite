import { Button, Form, Input, Space, message } from 'antd';
import { UserOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';
import React from 'react';
import createMethod from '../../services/create';

interface ValuesToSend {
  nome: string;
  celular: string;
  cidade: string;
}

const App: React.FC = () => {
  const [form] = Form.useForm();

  const formatPhoneNumber = (phoneNumber: string | undefined) => {
    if (!phoneNumber) {
      return phoneNumber;
    }

    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  const onPhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = event.target.value;
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    form.setFieldsValue({ nCelular: formattedPhoneNumber });
  };

  const onlyNumbers = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    const isNumber = /^[0-9]$/i.test(key);

    // Permite apenas a entrada de números (0-9) e teclas de controle (backspace, delete, etc.)
    if (!isNumber && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
    }
  };

  // REVIEW - Dados captados do Form e enviados para o back-end
  const onFinish = async (values: any) => {
    const valuesToSend = {
      ...values,
      nCelular: values.nCelular.replace(/\D/g, ''),
    };
    const formateValues: ValuesToSend = {
      nome: valuesToSend.nome,
      cidade: valuesToSend.cidade,
      celular: valuesToSend.nCelular,
    };

    try {
      if (formateValues) {
        await createMethod('/user', formateValues);
        message.success('Registrado com sucesso');
        form.resetFields();
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      layout="horizontal"
    >
      <Space style={{ display: 'flex', justifyContent: 'center' }}>
        <Space
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
          }}
        >
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true, message: 'Campo Obrigatório' }]}
          >
            <Input
              placeholder="Nome Completo"
              prefix={<UserOutlined className="site-form-item-icon" />}
              style={{ width: '250px' }}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="cidade"
            label="Cidade"
            rules={[{ required: true, message: 'Campo Obrigatório' }]}
          >
            <Input
              placeholder="Cidade"
              prefix={<HomeOutlined />}
              style={{ width: '250px' }}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="nCelular"
            label="N° do Celular"
            rules={[{ required: true, message: 'Campo Obrigatório' }]}
          >
            <Input
              placeholder="DD + N°"
              maxLength={11}
              prefix={<PhoneOutlined />}
              onChange={onPhoneNumberChange}
              style={{ width: '250px' }}
              allowClear
              onKeyPress={onlyNumbers}
            />
          </Form.Item>
        </Space>
      </Space>
      <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" htmlType="submit">
          Registrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
