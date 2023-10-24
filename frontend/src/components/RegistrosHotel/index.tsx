<<<<<<< HEAD
import React, { useState } from 'react';
import { Card } from 'antd';
import FormClientRC from '../FormClientRC';
import FormClientFEH from '../FormClientFEH';

const tabList = [
  {
    key: 'tab1',
    tab: 'Registro de Cliente',
  },
  {
    key: 'tab2',
    tab: 'Ficha de Entrada no Hotel',
  },
];

const contentList: Record<string, React.ReactNode> = {
  tab1: <FormClientRC />,
  tab2: <FormClientFEH />,
};

const App: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  return (
    <Card
      title="Hotel"
      tabList={tabList}
      activeTabKey={activeTabKey1}
      onTabChange={onTab1Change}
      style={{ height: '390px' }}
    >
      {contentList[activeTabKey1]}
    </Card>
  );
};

=======
import React, { useState } from 'react';
import { Card } from 'antd';
import FormClientRC from '../FormClientRC';
import FormClientFEH from '../FormClientFEH';

const tabList = [
  {
    key: 'tab1',
    tab: 'Registro de Cliente',
  },
  {
    key: 'tab2',
    tab: 'Ficha de Entrada no Hotel',
  },
];

const contentList: Record<string, React.ReactNode> = {
  tab1: <FormClientRC />,
  tab2: <FormClientFEH />,
};

const App: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  return (
    <Card
      title="Hotel"
      tabList={tabList}
      activeTabKey={activeTabKey1}
      onTabChange={onTab1Change}
      style={{ height: '380px' }}
    >
      {contentList[activeTabKey1]}
    </Card>
  );
};

>>>>>>> c3bb770328effe90edd9a77e419635d02c52f443
export default App;