import { useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import Alert, { useAlert } from '@components/Alert';
import { RootStoreProvider, useMetaStore, useUIStore } from '@stores/RootStore';
import GlobalStyle, { BackgroundImage } from '@styles/globalStyle';
import { dark, light } from '@styles/theme';

import Router from './Router';

const App = () => {
  const { error, isError } = useMetaStore();
  const { scrollDisabled, theme, initTheme } = useUIStore();
  const { isOpen, openAlert } = useAlert();

  useEffect(() => {
    initTheme();
  }, []);

  useEffect(() => {
    if (isError) {
      openAlert();
    }
  }, [isError]);

  return (
    <RootStoreProvider>
      <ThemeProvider theme={theme === 'light' ? light : dark}>
        <Alert
          open={isOpen}
          message={error?.message || ''}
          statusCode={error?.code}
          status="error"
        />
        <GlobalStyle disableScroll={scrollDisabled} />
        <BackgroundImage />
        <Router />
      </ThemeProvider>
    </RootStoreProvider>
  );
};

export default observer(App);
