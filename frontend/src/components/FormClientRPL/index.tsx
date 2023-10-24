import React, { useState } from 'react';
import { Select, Form, Input, Space, Button, message } from 'antd';
import createMethod from '../../services/create';

interface ValuesToSend {
  valor: number;
  paymentmethod: string;
  pago: boolean;
}

export default function FormClient() {
  const [form] = Form.useForm();
  const [valorTotal, setValorTotal] = useState(''); // Estado para armazenar o valor total
  const [valorRecebido, setValorRecebido] = useState(''); // Estado para armazenar o valor recebido

  const onSearchSelect = (value: string) => {
    console.log(`Search ${value}`);
  };

  const onlyNumbersAndDecimal = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    const isNumberOrDecimal = /^[0-9,]$/i.test(key); // Incluímos a vírgula (,) como caractere válido

    // Permite apenas a entrada de números (0-9), vírgula decimal e teclas de controle (backspace, delete, etc.)
    if (!isNumberOrDecimal && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
    }

    // Permite somente uma vírgula decimal no campo
    const currentValue = event.currentTarget.value;
    if (currentValue.includes(',') && key === ',') {
      event.preventDefault();
    }
  };

  // Função para calcular o troco
  const calcularTroco = (valorTotal: string, valorRecebido: string) => {
    const valorTotalNum = parseFloat(
      valorTotal.replace('R$', '').replace(',', '.'),
    );
    const valorRecebidoNum = parseFloat(
      valorRecebido.replace('R$', '').replace(',', '.'),
    );
    const troco = valorRecebidoNum - valorTotalNum;
    return troco >= 0 ? troco.toFixed(2) : '0.00';
  };

  // NOTE - Função para limpar os campos após o registro
  const limparCampos = () => {
    setValorTotal('');
    setValorRecebido('');
  };

  // REVIEW - Dados captados do Form
  const onFinish = async (values: any) => {
    const valuesToSend = {
      ...values,
    };

    const formateValues: ValuesToSend = {
      valor: parseFloat(valuesToSend.valorTotal),
      paymentmethod: valuesToSend.formaPagamento,
      pago: false,
    };

    try {
      if (formateValues) {
        await createMethod('/request', formateValues);
        message.success('Registrado com sucesso');
        form.resetFields();
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }

    limparCampos();
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal">
      <Space
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0px',
        }}
      >
        <Space>
          <Form.Item
            name="valorTotal"
            label="Valor Total"
            rules={[{ required: true, message: 'Campo Obrigatório' }]}
          >
            <Input
              placeholder="Insira o valor"
              maxLength={12}
              prefix="R$"
              allowClear
              style={{
                width: '200px',
              }}
              onKeyPress={onlyNumbersAndDecimal}
              onChange={(event) => setValorTotal(event.target.value)}
              value={valorTotal}
            />
          </Form.Item>
          <Form.Item label="Valor Recebido">
            <Input
              placeholder="Insira o valor"
              maxLength={12}
              prefix="R$"
              allowClear
              style={{
                width: '200px',
              }}
              onKeyPress={onlyNumbersAndDecimal}
              onChange={(event) => setValorRecebido(event.target.value)}
              value={valorRecebido}
            />
          </Form.Item>
        </Space>
        <div style={{ display: 'flex', marginTop: '-10px' }}>
          <Form.Item
            label="Troco"
            style={{ width: '160px', marginRight: '60px' }}
          >
            <Input
              prefix="R$"
              style={{ width: '160px' }}
              readOnly
              value={calcularTroco(valorTotal, valorRecebido)}
            />
          </Form.Item>
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
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())}
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
          <Form.Item
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '0px',
              marginLeft: '30px',
            }}
          >
            <Button type="primary" htmlType="submit">
              Registrar
            </Button>
          </Form.Item>
        </div>
      </Space>
    </Form>
  );
}
