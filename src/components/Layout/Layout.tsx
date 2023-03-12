import { FC, PropsWithChildren } from 'react';

import Header from '@components/Header';
import OnTopButton from '@components/OnTopButton';

import { PageWrapper } from './Layout.styles';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <PageWrapper>{children}</PageWrapper>
      <OnTopButton />
    </>
  );
};

export default Layout;
