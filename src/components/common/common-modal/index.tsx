'use client';

import { ReactNode } from 'react';

import { Modal, Button } from 'antd';
import type { ModalProps, ButtonProps } from 'antd';

import { MODAL_WIDTH } from '@/constants/common';
import IconClose from '@/static/icon/icon-close';

import styles from './custom-modal.module.scss';

interface CommonModalProps extends Omit<ModalProps, 'title' | 'footer'> {
  title: string;
  width?: number;
  children: ReactNode;
  onCancel?: () => void;
  onOk?: () => void;
  okText?: string | ReactNode;
  cancelText?: string | ReactNode;
  showCancel?: boolean;
  showOk?: boolean;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

const CommonModal = ({
  title,
  width = MODAL_WIDTH,
  children,
  onCancel,
  onOk,
  okText = '作成',
  cancelText = 'キャンセル',
  showCancel = true,
  showOk = true,
  okButtonProps,
  cancelButtonProps,
  loading,
  ...modalProps
}: CommonModalProps) => {
  const header = (
    <div className={`flex items-center justify-between p-4 ${styles.headerGradient}`}>
      <h2 className='m-0 text-xl font-medium text-white'>{title}</h2>
      <button
        onClick={onCancel}
        className='flex justify-center items-center w-6 h-6 text-white rounded transition-colors hover:bg-white/20'
        aria-label='Close'
      >
        <IconClose />
      </button>
    </div>
  );

  const footer = (
    <div className='flex gap-6 justify-end p-4 pb-6 w-full'>
      {showCancel && (
        <Button
          onClick={onCancel}
          className='!h-[52px] w-1/2 border-gray-300 px-6 !text-lg'
          {...cancelButtonProps}
        >
          {cancelText}
        </Button>
      )}
      {showOk && (
        <Button
          type='primary'
          onClick={onOk}
          loading={loading}
          className='!h-[52px] w-1/2 bg-[#003E92] px-6 hover:bg-[#003E92]/90 !text-lg'
          {...okButtonProps}
        >
          {okText}
        </Button>
      )}
    </div>
  );

  return (
    <Modal
      {...modalProps}
      className={styles.modal}
      title={null}
      footer={null}
      closeIcon={null}
      centered
      width={width}
      onCancel={onCancel}
      maskClosable={true}
      keyboard={true}
      styles={{
        body: {
          padding: 0,
          maxHeight: 'calc(100vh - 200px)',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <div className={`flex flex-col h-full ${styles.modalContent}`}>
        <div className={`flex-shrink-0 ${styles.modalHeader}`}>{header}</div>
        <div className={`flex-1 overflow-y-auto ${styles.modalScrollable}`}>
          <div className='p-4'>{children}</div>
          <div className={`flex-shrink-0 ${styles.modalFooter}`}>{footer}</div>
        </div>
      </div>
    </Modal>
  );
};

export default CommonModal;
