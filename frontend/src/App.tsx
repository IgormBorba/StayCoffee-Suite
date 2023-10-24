<<<<<<< HEAD
import { GlobalStyles } from './styles/Global';
import { ThemeProvider } from 'styled-components';
import _default from './styles/theme/default';
import { BrowserRouter } from 'react-router-dom';
import NavigationRoutes from './navigation';
import { ConfigProvider } from 'antd';
import ptBr from 'antd/locale/pt_BR';
import { AuthProvider } from './context/auth';

function App() {
  return (
    <ConfigProvider
      locale={ptBr}
      theme={{
        token: {
          colorPrimary: '#008036',
          controlItemBgActive: '#03b44c',
        },
        components: {
          Card: {
            colorBgContainer: '#e9e9e9',
            colorBorderSecondary: 'transparent',
          },
          Input: {
            colorBgContainer: '#ffffff',
          },
          Select: {
            colorBgContainer: '#ffffff',
            colorBgElevated: '#ffffff',
          },
          TreeSelect: {
            colorBgElevated: '#ffffff',
          },
          Tabs: {
            colorBorderSecondary: '#c2c1c1',
          },
          Table: {
            colorBgContainer: '#e9e9e9',
            colorBorderSecondary: '#dadada',
            colorFillAlter: '#dbdbdb',
            colorLinkHover: '#008036',
          },
        },
      }}
    >
      <ThemeProvider theme={_default}>
        <GlobalStyles />

        <BrowserRouter>
          <AuthProvider>
            <NavigationRoutes />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
=======
import { GlobalStyles } from './styles/Global';
import { BrowserRouter } from 'react-router-dom';
import NavigationRoutes from './navigation';
import { ConfigProvider } from 'antd';
import ptBr from 'antd/locale/pt_BR';
import { AuthProvider } from './context/auth';

function App() {
  return (
    <ConfigProvider
      locale={ptBr}
      theme={{
        token: {
          colorPrimary: '#008036',
          controlItemBgActive: '#03b44c',
        },
        components: {
          Card: {
            colorBgContainer: '#e9e9e9',
            colorBorderSecondary: 'transparent',
          },
          Input: {
            colorBgContainer: '#ffffff',
          },
          Select: {
            colorBgContainer: '#ffffff',
            colorBgElevated: '#ffffff',
          },
          TreeSelect: {
            colorBgElevated: '#ffffff',
          },
          Tabs: {
            colorBorderSecondary: '#c2c1c1',
          },
          Table: {
            colorBgContainer: '#e9e9e9',
            colorBorderSecondary: '#dadada',
            colorFillAlter: '#dbdbdb',
            colorLinkHover: '#008036',
          },
        },
      }}
    >

      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <NavigationRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
>>>>>>> c3bb770328effe90edd9a77e419635d02c52f443
