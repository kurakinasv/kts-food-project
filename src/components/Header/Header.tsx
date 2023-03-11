import { FC, useCallback, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { RouterPaths } from '@app/Router';
import logo from '@static/images/logo.png';
import { useRecipes } from '@stores/RootStore';

import DiceIcon from './DiceIcon';
import {
  HeaderWrapper,
  HeaderContent,
  Logo,
  Burger,
  Navbar,
  NavLink,
  BurgerContent,
  NavButton,
} from './Header.styles';

const Header: FC = () => {
  const navigate = useNavigate();
  const [small, setSmall] = useState(false);
  const [burgerActive, setBurgerActive] = useState(false);

  const { getRandom, meta } = useRecipes();

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

  const redirectToRandomDish = async () => {
    const res = await getRandom();
    const path = RouterPaths.recipe.split(':')[0];

    if (!!res) {
      navigate(`${path}${res}`);
    }
  };

  return (
    <HeaderWrapper small={small}>
      <HeaderContent>
        <Logo src={logo} alt="app logo" small={small} />

        <Burger onClick={handleBurger}>
          <BurgerContent active={burgerActive} />
        </Burger>

        <Navbar open={burgerActive}>
          <NavLink to="">Collection</NavLink>
          <NavButton title="Get random recipe" onClick={redirectToRandomDish}>
            <DiceIcon loading={meta.loading} />
            <span>Random recipe</span>
          </NavButton>
        </Navbar>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default observer(Header);
