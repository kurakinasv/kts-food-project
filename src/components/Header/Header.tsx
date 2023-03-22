import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDrawer } from '@components/Drawer';
import { RouterPaths, routes } from '@config/routes';
import { MoonIcon, SunIcon } from '@static/icons';
import logoDark from '@static/images/logo-dark.png';
import logo from '@static/images/logo.png';
import { useMetaStore, useRecipes, useUIStore } from '@stores/RootStore';
import { ThemesEnum } from '@styles/types';

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
  DiceButton,
} from './Header.styles';
import IngredientsListDrawer from './IngredientsListDrawer';

const Header: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [small, setSmall] = useState(false);
  const [burgerActive, setBurgerActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { getRandom } = useRecipes();
  const { loading, currentRequest } = useMetaStore();
  const { theme, toggleTheme } = useUIStore();

  const { open, openDrawer, closeDrawer } = useDrawer();

  const scrollHandler = useCallback(() => {
    const isLongScroll = window.scrollY > 80;

    if (isLongScroll && !small) {
      setSmall(isLongScroll);
      return;
    }
    if (!isLongScroll && small) {
      setSmall(isLongScroll);
      return;
    }
  }, [small]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);

  const handleBurger = useCallback(() => {
    setBurgerActive((v) => !v);
  }, []);

  const redirectToRandomRecipe = useCallback(async () => {
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
    <>
      <IngredientsListDrawer isOpen={open} closeDrawer={closeDrawer} openButtonRef={buttonRef} />

      <HeaderWrapper small={small}>
        <HeaderContent>
          <Logo
            src={theme === ThemesEnum.light ? logo : logoDark}
            alt="app logo"
            small={small}
            onClick={redirectToMain}
          />

          <Burger onClick={handleBurger}>
            <BurgerContent active={burgerActive} />
          </Burger>

          <Navbar open={burgerActive}>
            <NavLink
              to={{ pathname: RouterPaths.collection }}
              state={{ prevPath: location.pathname }}
              active={location.pathname === RouterPaths.collection}
            >
              Collection
            </NavLink>

            <NavButton ref={buttonRef} onClick={openDrawer}>
              Shopping list
            </NavButton>

            <DiceButton
              title="Get random recipe"
              onClick={redirectToRandomRecipe}
              disabled={loading && currentRequest === 'random'}
            >
              <DiceIcon loading={loading && currentRequest === 'random'} />
              <span>Random recipe</span>
            </DiceButton>

            <NavButton onClick={toggleTheme}>
              {theme === ThemesEnum.light ? <SunIcon /> : <MoonIcon />}
            </NavButton>
          </Navbar>
        </HeaderContent>
      </HeaderWrapper>
    </>
  );
};

export default observer(Header);
