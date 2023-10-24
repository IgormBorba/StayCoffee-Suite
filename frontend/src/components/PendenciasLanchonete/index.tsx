import { Card, ConfigProvider, List, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserDataProvider, useUserData } from '../../context/getUser'; // Importando o novo contexto

const App: React.FC = () => {
  const { Userdata, Userloading, UserfetchData } = useUserData(); // Usando o hook do novo contexto

  const loadMoreData = () => {
    if (Userloading) {
      return;
    }
    UserfetchData(); // Usando o método fetchData do novo contexto
  };

  useEffect(() => {
    loadMoreData();
  }, []);


  const calculateTotalRequestValue = (requests: any[]) => {
    return requests.reduce((total, request) => total + request.valor, 0);
  };

  return (
    <ConfigProvider
      theme={{
        inherit: false,
        token: {
          colorBgBase: '#E9E9E9',
        },
      }}
    >
      <Card title="Pendências na lanchonete" bordered={false}>
        <div
          id="scrollableDiv"
          style={{
            height: '580px',
            overflow: 'auto',
            padding: '0 10px',
          }}
        >
          <InfiniteScroll
            dataLength={Userdata.length}
            next={loadMoreData}
            hasMore={Userdata.length < 37}
            loader={<Skeleton paragraph={{ rows: 1 }} active />}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={Userdata}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  {item.requests[0]?.id &&
                    item.rooms[0]?.id &&
                    item.requests[0]?.pago === false && (
                    <>
                      <List.Item.Meta
                        title={<p>Quarto: {item.rooms[0]?.n_quarto}</p>}
                        description={<p>{item.nome}</p>}
                      />
                      <span
                        style={{
                          color: '#ffffff',
                          backgroundColor: '#008036',
                          padding: '7px 20px 5px 20px',
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: 'auto',
                        }}
                      >
                        R$ {calculateTotalRequestValue(item.requests)}
                      </span>
                    </>
                  )}
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </Card>
    </ConfigProvider>
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
