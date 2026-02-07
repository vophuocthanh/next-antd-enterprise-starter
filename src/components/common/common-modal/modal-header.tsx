'use client';

import { type ReactNode } from 'react';

import IconClose from '@/static/icon/icon-close';

import styles from './custom-modal.module.scss';

interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
  children?: ReactNode;
}

const ModalHeader = ({ title, onClose, children }: ModalHeaderProps) => {
  return (
    <div className={`flex items-center justify-between p-4 ${styles.headerGradient}`}>
      <h2 className='m-0 text-xl font-medium text-white'>{title}</h2>
      {children}
      <button
        type='button'
        onClick={onClose}
        className='flex justify-center items-center w-6 h-6 text-white rounded transition-colors hover:bg-white/20'
        aria-label='Close modal'
      >
        <IconClose />
      </button>
    </div>
  );
};

export default ModalHeader;
