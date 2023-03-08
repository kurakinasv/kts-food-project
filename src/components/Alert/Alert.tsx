import { FC, memo } from 'react';

import { config, useTransition } from '@react-spring/web';
import { HttpStatusCode } from 'axios';

import { alertShowTime } from '@config/ui';

import { AlertWrapper, Message, StatusCode } from './Alert.styles';

export type AlertStatus = 'error' | 'success';

type AlertProps = {
  open: boolean;
  message: string;
  status: AlertStatus;
  statusCode?: HttpStatusCode;
};

const Alert: FC<AlertProps> = ({ message, status, open, statusCode }) => {
  const transitions = useTransition(open, {
    from: { opacity: 0, x: '-50%', y: '0%', life: '100%' },

    enter: (_) => async (next) => {
      await next({ opacity: 1, y: '10%' });
      await next({ life: '0%' });
    },

    leave: { opacity: 0, y: '0%' },

    config: (_, __, phase) => (key) =>
      phase === 'enter' && key === 'life' ? { duration: alertShowTime } : config.gentle,
  });

  return (
    <>
      {transitions(
        (styles, open) =>
          open && (
            <AlertWrapper style={styles} status={status}>
              <Message>{message}</Message>
              <StatusCode status={status}>{statusCode}</StatusCode>
            </AlertWrapper>
          )
      )}
    </>
  );
};

export default memo(Alert);
