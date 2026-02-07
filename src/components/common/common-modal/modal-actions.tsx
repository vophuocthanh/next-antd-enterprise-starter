'use client';

import { type ReactNode } from 'react';

import { Button, type ButtonProps } from 'antd';

interface ModalCancelButtonProps extends ButtonProps {
  children?: ReactNode;
}

interface ModalSubmitButtonProps extends ButtonProps {
  children?: ReactNode;
}

export const ModalCancelButton = ({
  children = 'キャンセル',
  className = '',
  ...props
}: ModalCancelButtonProps) => {
  return (
    <Button className={`!h-[52px] w-1/2 border-gray-300 px-6 !text-lg ${className}`} {...props}>
      {children}
    </Button>
  );
};

export const ModalSubmitButton = ({
  children = '作成',
  className = '',
  loading,
  ...props
}: ModalSubmitButtonProps) => {
  return (
    <Button
      type='primary'
      loading={loading}
      className={`!h-[52px] w-1/2 bg-primary px-6 hover:bg-primary/90 !text-lg ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};
