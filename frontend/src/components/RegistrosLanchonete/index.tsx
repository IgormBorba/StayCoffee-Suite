import React, { useState } from 'react';
import { Card } from 'antd';
import FormClientRPH from '../FormClientRPH';
import FormClientRPL from '../FormClientRPL';

const tabList = [
  {
    key: 'tab1',
    tab: 'Cliente do Hotel',
  },
  {
    key: 'tab2',
    tab: 'Cliente Comum',
  },
];

const contentList: Record<string, React.ReactNode> = {
  tab1: <FormClientRPH />,
  tab2: <FormClientRPL />,
};

const App: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  return (
    <Card
      title="Registro de Pagamentos da Lanchonete"
      tabList={tabList}
      activeTabKey={activeTabKey1}
      onTabChange={onTab1Change}
      style={{ height: '280px' }}
    >
      {contentList[activeTabKey1]}
    </Card>
  );
};

export default App;