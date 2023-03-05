import { FC, useEffect, useState } from 'react';

import { HttpStatusCode } from 'axios';

import { AlertWrapper, Message, StatusCode } from './Alert.styles';

export type AlertStatus = 'error' | 'success';

type AlertProps = {
  open: boolean;
  message: string;
  status: AlertStatus;
  statusCode?: HttpStatusCode;
};

const Alert: FC<AlertProps> = ({ message, status, open, statusCode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  if (open) {
    setTimeout(() => setIsOpen(false), 3000);
  }

  return (
    <AlertWrapper status={status} active={isOpen}>
      <Message>{message}</Message>
      <StatusCode status={status}>{statusCode}</StatusCode>
    </AlertWrapper>
  );
};

export default Alert;
