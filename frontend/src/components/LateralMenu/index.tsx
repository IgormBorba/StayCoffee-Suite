import { useState } from 'react';
import { Container } from './styles';
import MenuItem from '../MenuItem';

import iconRegister from '../../assets/icons/iconRegister.svg';
import logoTitulo from '../../assets/icons/LogoTitulo.svg';

import hotel from '../../assets/icons/TelaPrincipal/Hotel.svg';
import painelPrincipal from '../../assets/icons/TelaPrincipal/painelPrincipalDark.svg';

import iconCafeteriaPainel from '../../assets/icons/TelaPrincipal/iconCafeteriaPainel.svg';
import iconCafeteriaHistorico from '../../assets/icons/TelaPrincipal/iconCafeteriaHistorico.svg';

import { useNavigate } from 'react-router-dom';

export default function LateralMenu() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, id-length
  const [isFixed, _] = useState(true);
  const [selected, setSelected] = useState('Painel Principal');

  const navigate = useNavigate();

  function handleNavigate(route: string, item: string) {
    navigate(route);
    setSelected(item);
  }

  return (
    <Container isFixed={isFixed}>
      <div className="container-items-menu">
        <img className="logoTitulo" src={logoTitulo} alt="" />
      </div>

      <div className="divided" />

      {isFixed && (
        <>
          <MenuItem
            label="Painel Principal"
            icon={painelPrincipal}
            onClick={() => handleNavigate('/principal', 'Painel Principal')}
            isFixed={isFixed}
            selected={selected}
          />

          <MenuItem
            label="Hotel"
            icon={hotel}
            onClick={() => handleNavigate('/principal', 'Principal')}
            isFixed={isFixed}
            selected={selected}
            hasSubmenu
            submenuItems={[
              {
                label: 'Painel',
                icon: iconCafeteriaPainel,
                onClick: () => handleNavigate('/painelHotel', 'Painel'),
              },
              {
                label: 'Hotel Histórico',
                icon: iconCafeteriaHistorico,

                onClick: () =>
                  handleNavigate('painelHistorico', 'Hotel Histórico'),
              },
            ]}
          />
          <MenuItem
            label="Lanchonete"
            icon={hotel}
            onClick={() => handleNavigate('/principal', 'Principal')}
            isFixed={isFixed}
            selected={selected}
            hasSubmenu
            submenuItems={[
              {
                label: 'Lanchonete Historico',
                icon: iconCafeteriaHistorico,

                onClick: () =>
                  handleNavigate('lanchoneteHistorico', 'Lanchonete Historico'),
              },
            ]}
          />
        </>
      )}

      {!isFixed && (
        <MenuItem
          label=""
          icon={iconRegister}
          onClick={() => handleNavigate('/principal', 'Principal')}
          isFixed={isFixed}
          selected={selected}
        />
      )}
    </Container>
  );
}
