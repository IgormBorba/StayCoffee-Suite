import { Container } from './styles';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const locationPreparation = location.pathname.split('/');

  const locationCaptalized = locationPreparation.map((item) => {
    return item.charAt(0).toLocaleUpperCase() + item.slice(1);
  });

  return (
    <Container>
      <span>{ locationCaptalized }</span>
    </Container>
  );
}