import { useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import Alert, { useAlert } from '@components/Alert';
import { RootStoreProvider, useMetaStore, useUIStore } from '@stores/RootStore';
import GlobalStyle, { BackgroundImage } from '@styles/globalStyle';

import Router from './Router';

const App = () => {
  const { error, isError } = useMetaStore();
  const { scrollDisabled } = useUIStore();
  const { isOpen, openAlert } = useAlert();

  useEffect(() => {
    if (isError) {
      openAlert();
    }
  }, [isError]);

  return (
    <RootStoreProvider>
      <Alert open={isOpen} message={error?.message || ''} statusCode={error?.code} status="error" />
      <GlobalStyle disableScroll={scrollDisabled} />
      <BackgroundImage />
      <Router />
    </RootStoreProvider>
  );
};

export default observer(App);
