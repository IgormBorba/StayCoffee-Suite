import { useState } from 'react';
import { ArrowIcon, Container, Icon, SubMenu, SubMenuItem } from './styles';

interface TypeMenuItem {
  label: string;
  hasSubmenu?: boolean;
  submenuItems?: { icon: string; label: string; onClick: () => void }[];
  onClick?: () => void;
  icon: string;
  isFixed: boolean;
  selected: string;
}

export default function MenuItem({
  label,
  icon,
  isFixed,
  hasSubmenu = false,
  submenuItems = [],
  onClick, selected }: TypeMenuItem) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleSubMenu() {
    setIsExpanded(!isExpanded);
  }

  return (
    <>
      <Container
        onClick={hasSubmenu ? toggleSubMenu : onClick}
        hasSubmenu={hasSubmenu}
        active={selected === label}
      >
        <Icon src={icon} />
        { label }
        { hasSubmenu && <ArrowIcon isExpanded={isExpanded} /> }
      </Container>
      {hasSubmenu && (
        <SubMenu
          isExpanded={isExpanded}
          isFixed={isFixed}
        >
          {submenuItems.map((item, index) => (
            <SubMenuItem
              isFixed={isFixed}
              key={index}
              onClick={item.onClick}
              active={selected === item.label}
            >
              { isFixed ? <Icon src={item.icon} /> : ''}
              {/* { isFixed ?  <Icon src={item.icon}/> : ''} */}

              {item.label}
            </SubMenuItem>
          ))}
        </SubMenu>
      )}
    </>
  );
}
