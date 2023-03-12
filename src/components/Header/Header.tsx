import { FC, useCallback, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';

import { RouterPaths, routes } from '@config/routes';
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
  const location = useLocation();

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

  const redirectToRandomDish = useCallback(async () => {
    const res = await getRandom();

    if (!!res) {
      navigate(routes.recipe.id(res));
    }
  }, [getRandom]);

  const redirectToMain = useCallback(() => {
    if (location.pathname !== RouterPaths.recipes) {
      navigate(RouterPaths.recipes);
    }
  }, [location.pathname]);

  return (
    <HeaderWrapper small={small}>
      <HeaderContent>
        <Logo src={logo} alt="app logo" small={small} onClick={redirectToMain} />

        <Burger onClick={handleBurger}>
          <BurgerContent active={burgerActive} />
        </Burger>

        <Navbar open={burgerActive}>
          <NavLink
            to={RouterPaths.collection}
            active={location.pathname === RouterPaths.collection}
          >
            Collection
          </NavLink>
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
