import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Content } from './styles';
import LateralMenu from '../components/LateralMenu';
import Header from '../components/Header';

export default function Layout() {
  return (
    <Container>
      <LateralMenu />
      <Content>
        <Header />
        <Suspense>
          <Outlet />
        </Suspense>
      </Content>
    </Container>
  );
}
