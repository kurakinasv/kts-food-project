import React, { FC, memo, MutableRefObject, PropsWithChildren, ReactNode } from 'react';

import { config, useTransition } from '@react-spring/web';
import { useTheme } from 'styled-components';

import useComponentVisible from '@hooks/useComponentVisible';
import { XMarkIcon } from '@static/icons';

import {
  DrawerOverlay,
  ButtonWrapper,
  Content,
  DrawerBody,
  DrawerWrapper,
  Footer,
  Header,
  Title,
  Empty,
  StyledButton,
} from './Drawer.styles';

type DrawerProps = {
  open: boolean;
  onClose: VoidFunction;
  title: string;
  openButtonRef: MutableRefObject<HTMLButtonElement | null>;
  footer: ReactNode;
  empty?: ReactNode;
};

const Drawer: FC<PropsWithChildren<DrawerProps>> = ({
  open,
  onClose,
  title,
  children,
  openButtonRef,
  empty,
  footer,
}) => {
  const theme = useTheme();

  const { ref } = useComponentVisible({
    visible: open,
    setNotVisible: onClose,
    ignoredRef: openButtonRef,
  });

  const transitions = useTransition(open, {
    from: { x: '-100%', opacity: 0 },
    enter: { x: '0%', opacity: 0.5 },
    leave: { x: '-100%', opacity: 0 },
    config: config.default,
  });

  return (
    <>
      {transitions(
        ({ x, opacity }, open) =>
          open && (
            <DrawerWrapper>
              <DrawerBody style={{ x }} ref={ref}>
                <Header>
                  <ButtonWrapper>
                    <StyledButton
                      icon={<XMarkIcon fillColor={theme.colors.secondaryRed} />}
                      onClick={onClose}
                    />
                  </ButtonWrapper>
                  <Title>{title}</Title>
                </Header>

                <Content>{!!children ? children : <Empty>{empty}</Empty>}</Content>

                <Footer>{footer}</Footer>
              </DrawerBody>
              <DrawerOverlay style={{ opacity }} />
            </DrawerWrapper>
          )
      )}
    </>
  );
};

export default memo(Drawer);
