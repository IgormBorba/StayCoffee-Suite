import { Card, ConfigProvider, List, Skeleton } from 'antd';
import { format } from 'date-fns';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RoomsDataProvider, useRoomsData } from '../../context/getRooms'; // Importando o novo contexto

const App: React.FC = () => {
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

  return (
    <ConfigProvider
      theme={{
        inherit: false,
        token: {
          colorBgBase: '#E9E9E9',
        },
      }}
    >
      <Card title="Situação dos Quartos" bordered={false}>
        <div
          id="scrollableDiv"
          style={{
            height: 580,
            overflow: 'auto',
            padding: '0 10px',
          }}
        >
          <InfiniteScroll
            dataLength={Roomsdata.length}
            next={loadMoreData}
            hasMore={Roomsdata.length < 37}
            loader={<Skeleton paragraph={{ rows: 1 }} active />}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={Roomsdata}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    title={
                      <p>
                        Quarto: {item.n_quarto} • Diária R${item.valor}
                      </p>
                    }
                    description={
                      <p>
                        Ocupado até:{' '}
                        {item.situacao
                          ? item.data_saida
                            ? format(new Date(item.data_saida), 'dd/MM/yyyy')
                            : 'Data não disponível'
                          : 'Não ocupado'}
                      </p>
                    }
                  />
                  <span
                    style={{
                      color: '#ffffff',
                      backgroundColor: item.situacao ? '#ff0000' : '#008036',
                      padding: '7px 20px 5px 20px',
                      borderRadius: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 'auto',
                    }}
                  >
                    {item.situacao ? 'OCUPADO' : 'LIVRE'}
                  </span>
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
    <RoomsDataProvider>
      <App />
    </RoomsDataProvider>
  );
};

export default AppWithContext;
