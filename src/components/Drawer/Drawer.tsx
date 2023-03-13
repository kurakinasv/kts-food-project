import React, { FC, memo, MutableRefObject, PropsWithChildren, ReactNode } from 'react';

import { config, useTransition } from '@react-spring/web';

import Button from '@components/Button';
import useComponentVisible from '@hooks/useComponentVisible';
import { XMarkIcon } from '@static/icons';
import { colors } from '@styles/variables';

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
  const { ref } = useComponentVisible({
    visible: open,
    setNotVisible: onClose,
    ignoredRef: openButtonRef,
  });

  const transitions = useTransition(open, {
    from: { x: -510, opacity: 0 },
    enter: { x: 0, opacity: 0.5 },
    leave: { x: -510, opacity: 0 },
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
                    <Button
                      icon={<XMarkIcon fillColor={colors.secondaryRed} />}
                      onClick={onClose}
                      shape="circle"
                      padding="0"
                      minWidth="0"
                      width="30px"
                      bgColor="none"
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
