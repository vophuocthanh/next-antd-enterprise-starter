'use client';

import { type ReactNode } from 'react';

import { Modal } from 'antd';
import type { ModalProps } from 'antd';

import { MODAL_WIDTH } from '@/constants/common';

import styles from './custom-modal.module.scss';
import { ModalCancelButton, ModalSubmitButton } from './modal-actions';
import ModalBody from './modal-body';
import ModalFooter from './modal-footer';
import ModalHeader from './modal-header';

interface ModalFrameProps extends Omit<ModalProps, 'title' | 'footer'> {
  width?: number;
  children: ReactNode;
  onClose?: () => void;
}

const ModalFrame = ({ width = MODAL_WIDTH, children, onClose, ...modalProps }: ModalFrameProps) => {
  return (
    <Modal
      {...modalProps}
      className={styles.modal}
      title={null}
      footer={null}
      closeIcon={null}
      centered
      width={width}
      onCancel={onClose}
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
      <div className={`flex flex-col h-full ${styles.modalContent}`}>{children}</div>
    </Modal>
  );
};

const CommonModal = {
  Frame: ModalFrame,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  CancelButton: ModalCancelButton,
  SubmitButton: ModalSubmitButton,
};

export default CommonModal;

// Named exports for flexibility
export { ModalFrame, ModalHeader, ModalBody, ModalFooter, ModalCancelButton, ModalSubmitButton };
