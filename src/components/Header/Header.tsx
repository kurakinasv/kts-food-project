import { FC, useCallback, useEffect, useState } from 'react';

import logo from '@static/images/logo.png';

import DiceIcon from './DiceIcon';
import {
  HeaderWrapper,
  HeaderContent,
  Logo,
  Burger,
  Navbar,
  NavLink,
  BurgerContent,
} from './Header.styles';

const Header: FC = () => {
  const [small, setSmall] = useState(false);
  const [burgerActive, setBurgerActive] = useState(false);

  const scrollHandler = useCallback(() => {
    if (window.scrollY > 80) {
      setSmall(true);
    } else {
      setSmall(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);

  const handleBurger = useCallback(() => {
    setBurgerActive((v) => !v);
  }, []);

  return (
    <HeaderWrapper small={small}>
      <HeaderContent>
        <Logo src={logo} alt="app logo" small={small} />

        <Burger onClick={handleBurger}>
          <BurgerContent active={burgerActive} />
        </Burger>

        <Navbar open={burgerActive}>
          <NavLink to="">Collection</NavLink>
          <NavLink to="" title="Get random recipe">
            <DiceIcon />
            <span>Random recipe</span>
          </NavLink>
        </Navbar>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
